'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/app/lib/gsap'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current!
    const ring = ringRef.current!

    const moveDot = {
      x: gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' }),
      y: gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' }),
    }
    const moveRing = {
      x: gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' }),
      y: gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' }),
    }

    function onMove(e: MouseEvent) {
      moveDot.x(e.clientX)
      moveDot.y(e.clientY)
      moveRing.x(e.clientX)
      moveRing.y(e.clientY)
    }

    function onEnter() {
      gsap.to(ring, { scale: 2.5, duration: 0.35, ease: 'power2.out', borderColor: 'var(--accent)' })
      gsap.to(dot, { scale: 0, duration: 0.2 })
    }

    function onLeave() {
      gsap.to(ring, { scale: 1, duration: 0.35, ease: 'power2.out', borderColor: 'rgba(237, 235, 230, 0.4)' })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    window.addEventListener('mousemove', onMove)

    const interactives = document.querySelectorAll('a, button, [data-cursor]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 size-2 rounded-full bg-(--accent) pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 size-8 rounded-full border border-[rgba(237, 235, 230, 0.4)] pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
