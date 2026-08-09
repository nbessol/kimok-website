import { useMemo } from 'react'
import styles from './BubbleField.module.scss'

const BUBBLES_COUNT = 25

const BubbleField = ({ className, width, height }) => {
  const bubbles = useMemo(
    () =>
      Array.from({ length: BUBBLES_COUNT }, (_, i) => ({
        id: i,
        size: Math.random() * 20 + 6,
        left: Math.random() * 180 - 90,
        duration: Math.random() * 6 + 8,
        delay: Math.random() * -14,
      })),
    []
  )

  return (
    <div className={`${styles.bubbles} ${className}`} style={{ width, height }}>
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className={styles.bubble}
          style={{
            '--size': `${bubble.size}px`,
            '--left': `${bubble.left}px`,
            '--duration': `${bubble.duration}s`,
            '--delay': `${bubble.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default BubbleField
