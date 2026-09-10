// Fetches App Store reviews at build time and writes src/data/reviews.json.
// The .p8 key must never reach the browser, so this runs in Node (locally / in CI), not in the app.
//
// Env vars (all required, otherwise the script skips and keeps the existing JSON):
//   ASC_KEY_ID       key ID (App Store Connect > Users and Access > Integrations)
//   ASC_ISSUER_ID    issuer ID (same page)
//   ASC_PRIVATE_KEY  contents of the AuthKey_XXXX.p8 file (or ASC_PRIVATE_KEY_PATH to a file)
//   ASC_APP_ID       numeric Apple ID of the app (App Store Connect > App Information)
import { createPrivateKey, sign } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'

const OUTPUT = new URL('../src/data/reviews.json', import.meta.url)
const REVIEWS_LIMIT = 50

const { ASC_KEY_ID, ASC_ISSUER_ID, ASC_APP_ID, ASC_PRIVATE_KEY_PATH } = process.env
const privateKeyPem = process.env.ASC_PRIVATE_KEY
  ? process.env.ASC_PRIVATE_KEY.replace(/\\n/g, '\n')
  : ASC_PRIVATE_KEY_PATH && readFileSync(ASC_PRIVATE_KEY_PATH, 'utf8')

if (!ASC_KEY_ID || !ASC_ISSUER_ID || !ASC_APP_ID || !privateKeyPem) {
  console.warn('[reviews] App Store Connect credentials missing, keeping existing src/data/reviews.json')
  process.exit(0)
}

const base64url = (input) => Buffer.from(input).toString('base64url')

// App Store Connect wants an ES256 JWT, valid 20 minutes max
const createToken = () => {
  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: 'ES256', kid: ASC_KEY_ID, typ: 'JWT' }))
  const payload = base64url(JSON.stringify({
    iss: ASC_ISSUER_ID,
    iat: now,
    exp: now + 15 * 60,
    aud: 'appstoreconnect-v1',
  }))
  const signature = sign('sha256', Buffer.from(`${header}.${payload}`), {
    key: createPrivateKey(privateKeyPem),
    dsaEncoding: 'ieee-p1363', // raw r||s as JWT expects, not DER
  })
  return `${header}.${payload}.${base64url(signature)}`
}

const url = new URL(`https://api.appstoreconnect.apple.com/v1/apps/${ASC_APP_ID}/customerReviews`)
url.searchParams.set('sort', '-createdDate')
url.searchParams.set('limit', String(REVIEWS_LIMIT))

try {
  const response = await fetch(url, { headers: { Authorization: `Bearer ${createToken()}` } })
  if (!response.ok) throw new Error(`${response.status} ${await response.text()}`)

  const { data, meta } = await response.json()
  console.log(`[reviews] API returned ${data.length} reviews (total: ${meta?.paging?.total ?? 'unknown'}) for app ${ASC_APP_ID}`)
  const reviews = data
    .map(({ attributes }) => ({
      userName: attributes.reviewerNickname,
      score: attributes.rating,
      text: attributes.body,
      platform: 'ios',
    }))
    .filter((review) => review.userName && review.text)
  console.log(`[reviews] ${reviews.length} kept after filtering (nickname and text required)`)

  if (reviews.length === 0) throw new Error('no reviews returned')

  writeFileSync(OUTPUT, JSON.stringify(reviews, null, 2) + '\n')
  console.log(`[reviews] wrote ${reviews.length} reviews`)
} catch (error) {
  // a failed fetch must not break the deploy: the committed JSON stays as fallback
  console.warn('[reviews] fetch failed, keeping existing src/data/reviews.json:', error.message)
}
