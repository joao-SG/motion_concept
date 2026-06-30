'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { gsap, useGSAP } from '@/app/lib/gsap'

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false })

const LINES = ['MOTION', 'IS THE', 'MEDIUM']

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.h-char', {
      yPercent: 120,
      stagger: 0.022,
      duration: 1,
      ease: 'power4.out',
      delay: 0.15,
    })

    gsap.from('.h-sub', {
      opacity: 0,
      y: 16,
      duration: 1,
      ease: 'power3.out',
      delay: 1.1,
    })

    gsap.from('.h-scroll', {
      opacity: 0,
      y: 10,
      duration: 0.8,
      ease: 'power2.out',
      delay: 1.6,
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col justify-center px-8 lg:px-16 overflow-hidden"
    >
      {/* 3D scene — right half */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-70">
        <HeroScene />
      </div>

      {/* Headline */}
      <div className="relative z-10 max-w-[70vw]">
        <h1 className="font-display font-extrabold uppercase leading-[0.9] text-[clamp(3.5rem,10vw,10rem)] tracking-[-0.02em]">
          {LINES.map((line, li) => (
            <div key={li} className="overflow-hidden">
              {line.split('').map((char, ci) => (
                <span
                  key={ci}
                  className={`h-char inline-block ${char === ' ' ? 'w-[0.3em]' : ''}`}
                >
                  {char !== ' ' ? char : ''}
                </span>
              ))}
            </div>
          ))}
        </h1>

        <p className="h-sub mt-6 text-(--muted) text-lg max-w-sm leading-relaxed">
          Scroll, hover, navigate — every pixel in motion.
        </p>
      </div>

      {/* Scroll hint */}
      <div className="h-scroll absolute bottom-10 left-8 lg:left-16 flex items-center gap-3 text-(--muted) text-xs uppercase tracking-widest">
        <span className="inline-block w-6 h-px bg-(--muted)" />
        Scroll to explore
      </div>
    </section>
  )
}
