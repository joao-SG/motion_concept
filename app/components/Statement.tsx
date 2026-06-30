'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/app/lib/gsap'

const WORDS = 'We believe motion is not decoration. It is the language of intent. Every scroll, every hover, every transition tells a story worth experiencing.'.split(' ')

export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const wordEls = sectionRef.current!.querySelectorAll('.s-word')

    gsap.fromTo(
      wordEls,
      { opacity: 0.1 },
      {
        opacity: 1,
        stagger: { each: 0.06, from: 'start' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          end: 'bottom 35%',
          scrub: 1,
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center px-8 lg:px-24 py-32"
    >
      <p className="font-display font-semibold text-[clamp(1.8rem,3.5vw,4rem)] leading-[1.35]">
        {WORDS.map((word, i) => (
          <span key={i} className="s-word inline-block mr-[0.3em]">
            {word}
          </span>
        ))}
      </p>
    </section>
  )
}
