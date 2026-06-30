'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/app/lib/gsap'

const CAPS = [
  { n: '01', title: 'Scroll Animation',     tech: 'GSAP ScrollTrigger',     desc: 'Sequences that unfold as your user explores.' },
  { n: '02', title: '3D & WebGL',           tech: 'React Three Fiber',       desc: 'Dimensional scenes that react to every input.' },
  { n: '03', title: 'Page Transitions',     tech: 'React View Transitions',  desc: 'Navigation that feels continuous, not jarring.' },
  { n: '04', title: 'Cursor Interactions',  tech: 'GSAP quickTo',            desc: 'A cursor that communicates before a click.' },
  { n: '05', title: 'Smooth Scroll',        tech: 'Lenis',                   desc: 'Physics-based momentum for a native-app feel.' },
]

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const track = trackRef.current!
    const getDistance = () => track.scrollWidth - window.innerWidth

    gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => '+=' + getDistance(),
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="h-screen overflow-hidden">
      <div
        ref={trackRef}
        className="flex items-center h-full"
        style={{ width: 'max-content' }}
      >
        {/* Intro label */}
        <div className="flex-shrink-0 w-[38vw] pl-[10vw] flex flex-col justify-center">
          <span className="text-xs text-(--muted) uppercase tracking-[0.2em] mb-4">
            Capabilities
          </span>
          <p className="text-(--muted) text-lg leading-relaxed max-w-[22ch]">
            The craft behind every pixel we ship.
          </p>
        </div>

        {/* Capability cards */}
        {CAPS.map((cap) => (
          <div
            key={cap.n}
            className="flex-shrink-0 w-[38vw] flex flex-col justify-center border-l border-(--border) pl-12"
          >
            <span className="font-mono text-xs text-(--muted) mb-6">{cap.n}</span>
            <h3 className="font-display font-extrabold uppercase leading-none text-[clamp(2.2rem,4vw,5rem)]">
              {cap.title}
            </h3>
            <span className="mt-4 text-xs text-(--accent) uppercase tracking-[0.15em] font-mono">
              {cap.tech}
            </span>
            <p className="mt-4 text-(--muted) text-sm leading-relaxed max-w-[30ch]">
              {cap.desc}
            </p>
          </div>
        ))}

        {/* End spacer */}
        <div className="flex-shrink-0 w-[10vw]" />
      </div>
    </section>
  )
}
