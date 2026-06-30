'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { gsap, useGSAP } from '@/app/lib/gsap'
import type { Application } from '@splinetool/runtime'

// Spline's own Canvas component needs browser APIs — no SSR
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false })

// Replace with your published Spline scene URL
// Publish in Spline: Share → Public link → copy the .splinecode URL
const SCENE_URL = 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode'

export default function SplineSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const splineRef = useRef<Application | null>(null)

  useGSAP(() => {
    gsap.from('.sp-label', {
      opacity: 0,
      y: 24,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 65%',
      },
    })
  }, { scope: sectionRef })

  function onLoad(app: Application) {
    splineRef.current = app
  }

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* Spline canvas — fills the section */}
      <div className="absolute inset-0">
        <Spline
          scene={SCENE_URL}
          onLoad={onLoad}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Subtle gradient so the label reads cleanly */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-(--bg) to-transparent" />

      {/* Label */}
      <div className="sp-label absolute bottom-12 left-8 lg:left-16 z-10">
        <span className="text-xs text-(--muted) uppercase tracking-[0.2em] block mb-2 font-mono">
          Powered by
        </span>
        <p className="font-display font-extrabold uppercase text-[clamp(2rem,5vw,5rem)] leading-none">
          Spline
        </p>
        <p className="text-(--muted) text-sm mt-3 max-w-[30ch] leading-relaxed">
          Designer-authored 3D scenes. Drop in a URL and the scene lives in your page — zero Three.js code.
        </p>
      </div>
    </section>
  )
}
