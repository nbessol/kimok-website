import { useState, useEffect, useRef } from 'react'

import styles from './ReviewsTrack.module.scss'
import Trash from '../../assets/trash.png'
import Review from '../Review/Review'

const reviews = [
  {
    userName: "Nicolas",
    score: 5,
    text: "Super application, très pratique et intuitive. Je recommande !",
    platform: "android",
  },
  {
    userName: "Benjamin",
    score: 4.3,
    text: "Super application, très pratique et intuitive. Je recommande !",
    platform: "ios",
  },
  {
    userName: "Alice",
    score: 4,
    text: "Super application, très pratique et intuitive. Je recommande !",
    platform: "ios",
  },
  {
    userName: "Tiphaine",
    score: 2,
    text: "Super application, très pratique et intuitive. Je recommande !",
    platform: "ios",
  },
  {
    userName: "Claire",
    score: 3.6,
    text: "Super application, très pratique et intuitive. Je recommande !",
    platform: "ios",
  }
]

// slots slide physically from right to left; slot 0 = leftmost, SLOT_COUNT-1 = rightmost.
// 2 extra slots on top of the 5 "focus" ones so a card always bleeds off both edges, no empty gap.
const SLOT_COUNT = 7
const CARD_WIDTH = 345 // card never renders wider than this (box-sizing: border-box in Review.module.scss)
const CARD_HEIGHT = 380
const GAP = 20 // true minimum visual distance between two cards' rotated outlines
const STEP_INTERVAL_MS = 3000
const TRANSITION_MS = 800

const rotateForSlot = (slot) => (slot - (SLOT_COUNT - 1) / 2) * 10
// must mirror the `y` formula in Review.jsx: geometry here needs each card's actual vertical
// position too, since two tilted rectangles' nearest corners depend on both angle AND offset
const yForSlot = (slot) => Math.pow(Math.abs(rotateForSlot(slot)) / 20, 2) * 150

const footprintForSlot = (slot) => {
  const rad = (Math.abs(rotateForSlot(slot)) * Math.PI) / 180
  return {
    width: CARD_WIDTH * Math.cos(rad) + CARD_HEIGHT * Math.sin(rad),
    height: CARD_WIDTH * Math.sin(rad) + CARD_HEIGHT * Math.cos(rad),
  }
}

// corners of a CARD_WIDTH x CARD_HEIGHT rectangle centered at (cx, cy), rotated by `deg`
const rectCorners = (cx, cy, deg) => {
  const rad = (deg * Math.PI) / 180
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)
  const w = CARD_WIDTH / 2
  const h = CARD_HEIGHT / 2
  return [[w, h], [w, -h], [-w, -h], [-w, h]].map(([px, py]) => [
    cx + px * cos - py * sin,
    cy + px * sin + py * cos,
  ])
}

const pointSegDistSq = (px, py, ax, ay, bx, by) => {
  const dx = bx - ax
  const dy = by - ay
  const lenSq = dx * dx + dy * dy
  let t = lenSq === 0 ? 0 : ((px - ax) * dx + (py - ay) * dy) / lenSq
  t = Math.max(0, Math.min(1, t))
  const ex = px - (ax + t * dx)
  const ey = py - (ay + t * dy)
  return ex * ex + ey * ey
}

const ccw = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
const segmentsIntersect = (p1, p2, p3, p4) => {
  const d1 = ccw(p3, p4, p1)
  const d2 = ccw(p3, p4, p2)
  const d3 = ccw(p1, p2, p3)
  const d4 = ccw(p1, p2, p4)
  return ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))
}

const segSegDist = (a1, a2, b1, b2) => {
  if (segmentsIntersect(a1, a2, b1, b2)) return 0
  return Math.sqrt(Math.min(
    pointSegDistSq(a1[0], a1[1], b1[0], b1[1], b2[0], b2[1]),
    pointSegDistSq(a2[0], a2[1], b1[0], b1[1], b2[0], b2[1]),
    pointSegDistSq(b1[0], b1[1], a1[0], a1[1], a2[0], a2[1]),
    pointSegDistSq(b2[0], b2[1], a1[0], a1[1], a2[0], a2[1]),
  ))
}

// true minimum distance between two convex quads: smallest distance among all edge-to-edge pairs
const polyMinDist = (polyA, polyB) => {
  let min = Infinity
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      min = Math.min(min, segSegDist(polyA[i], polyA[(i + 1) % 4], polyB[j], polyB[(j + 1) % 4]))
    }
  }
  return min
}

// binary search the horizontal offset between two adjacent cards' centers that makes
// the true (rotation-aware) gap between their outlines equal exactly GAP
const solveOffsetForGap = (rotA, yA, rotB, yB) => {
  const polyA = rectCorners(0, yA, rotA)
  let lo = 0
  let hi = CARD_WIDTH * 2 + CARD_HEIGHT
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    const dist = polyMinDist(polyA, rectCorners(mid, yB, rotB))
    if (dist < GAP) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

// precompute each slot's center X so consecutive cards' rotated outlines are exactly GAP apart,
// covering slot -1 (exiting) through SLOT_COUNT (entering) since those transiently render too
const slotCenterX = { [-1]: 0 }
for (let s = 0; s <= SLOT_COUNT; s++) {
  slotCenterX[s] = slotCenterX[s - 1] + solveOffsetForGap(
    rotateForSlot(s - 1), yForSlot(s - 1),
    rotateForSlot(s), yForSlot(s),
  )
}
const originOffset = slotCenterX[0] - footprintForSlot(0).width / 2
const xForSlot = (slot) => slotCenterX[slot] - originOffset - CARD_WIDTH / 2

const trackWidth = slotCenterX[SLOT_COUNT - 1] + footprintForSlot(SLOT_COUNT - 1).width / 2 - originOffset
const trackHeight = Math.max(...Array.from({ length: SLOT_COUNT }, (_, s) => footprintForSlot(s).height))

const ReviewsTrack = () => {

  const nextIdRef = useRef(SLOT_COUNT)
  const nextReviewIndexRef = useRef(SLOT_COUNT % reviews.length)
  const [cards, setCards] = useState(() =>
    Array.from({ length: SLOT_COUNT }, (_, i) => ({ id: i, reviewIndex: i, slot: i }))
  )

  useEffect(() => {
    const id = setInterval(() => {
      const newId = nextIdRef.current++
      const newReviewIndex = nextReviewIndexRef.current++ % reviews.length

      // mount the new card one slot further right (off-screen), then slide it into
      // place on the next frame so it glides in like every other card, instead of popping in
      setCards(prev => [
        ...prev.map(card => ({ ...card, slot: card.slot - 1 })),
        { id: newId, reviewIndex: newReviewIndex, slot: SLOT_COUNT },
      ])
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setCards(prev => prev.map(card => (card.id === newId ? { ...card, slot: SLOT_COUNT - 1 } : card)))
        })
      })
      setTimeout(() => {
        setCards(prev => prev.filter(card => card.slot >= 0))
      }, TRANSITION_MS)
    }, STEP_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.containerTrash}>
        <img src={Trash} alt="trash" />
      </div>
      <div
        className={styles.containerTrack}
        style={{ '--track-width': `${trackWidth}px`, '--track-height': `${trackHeight}px` }}
      >
        {cards.map((card) => {
          const review = reviews[card.reviewIndex % reviews.length]
          const rotate = rotateForSlot(card.slot)
          const x = xForSlot(card.slot)
          return (
            <Review
              key={card.id}
              userName={review.userName}
              score={review.score}
              text={review.text}
              platform={review.platform}
              rotate={rotate}
              x={x}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ReviewsTrack
