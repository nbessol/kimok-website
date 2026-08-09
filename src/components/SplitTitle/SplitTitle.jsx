import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

import styles from './SplitTitle.module.scss'

const SplitTitle = ({ as: Tag = 'h1', text, className = '' }) => {
  const titleRef = useRef(null)

  useLayoutEffect(() => {
    const chars = titleRef.current.querySelectorAll('[data-char]')
    const wraps = titleRef.current.querySelectorAll('[data-char-wrap]')

    gsap.set(wraps, { perspective: 2000 })

    gsap.fromTo(
      chars,
      {
        opacity: 0,
        rotationX: -90,
        yPercent: 50,
      },
      {
        opacity: 1,
        rotationX: 0,
        yPercent: 0,
        duration: 0.4,
        ease: 'power1.inOut',
        stagger: { each: 0.03, from: 0 },
      }
    )
  }, [])

  const words = text.split(' ')

  return (
    <Tag ref={titleRef} className={`${styles.splitTitle} ${className}`}>
      {words.map((word, wordIndex) => (
        <span className={styles.word} key={wordIndex}>
          {Array.from(word).map((char, charIndex) => (
            <span className={styles.charWrap} data-char-wrap key={charIndex}>
              <span className={styles.char} data-char>{char}</span>
            </span>
          ))}
          {wordIndex < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}

export default SplitTitle
