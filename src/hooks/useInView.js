import { useEffect, useRef, useState } from 'react'

const useInView = ({ threshold = 0.2, rootMargin = '0px', once = true } = {}) => {
    const ref = useRef(null)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const node = ref.current
        if (!node) return

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true)
                if (once) observer.unobserve(node)
            } else if (!once) {
                setIsInView(false)
            }
        }, { threshold, rootMargin })

        observer.observe(node)

        return () => observer.disconnect()
    }, [threshold, rootMargin, once])

    return [ref, isInView]
}

export default useInView
