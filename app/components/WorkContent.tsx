'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/app/lib/gsap'

const FEATURED = {
  tag: 'Scroll Animation',
  title: 'Scroll-driven product story',
  year: '2025',
  desc: 'A full-page narrative experience where every section reveals as the user scrolls — layering context, building intent, closing with conversion.',
}

const CASES = [
  { tag: '3D & WebGL',          title: 'Immersive brand experience',      year: '2025' },
  { tag: 'Page Transitions',    title: 'Multi-section campaign site',     year: '2025' },
  { tag: 'Cursor Interactions', title: 'Interactive data visualisation',  year: '2024' },
  { tag: 'Smooth Scroll',       title: 'Editorial long-form narrative',   year: '2024' },
  { tag: 'Spline + Motion',     title: 'Product launch 3D experience',    year: '2024' },
]

export default function WorkContent() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Featured block reveal
    gsap.from('.featured-media', {
      opacity: 0,
      y: 32,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.featured-block', start: 'top 75%' },
    })
    gsap.from('.featured-copy', {
      opacity: 0,
      y: 20,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.15,
      scrollTrigger: { trigger: '.featured-block', start: 'top 75%' },
    })

    // List rows stagger
    gsap.from('.case-row', {
      opacity: 0,
      y: 20,
      stagger: 0.07,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.case-list', start: 'top 80%' },
    })
  }, { scope: ref })

  return (
    <div ref={ref}>
      {/* Featured case */}
      <div className="featured-block px-8 lg:px-16 py-16 border-b border-(--border) grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-end">
        <div className="featured-media relative aspect-video overflow-hidden bg-[#0f0f0f] border border-(--border)">
          <div
            className="media-drift absolute inset-[-10%] w-[120%] h-[120%]"
            style={{
              background: 'radial-gradient(ellipse 60% 60% at 40% 50%, #c8f03c18 0%, transparent 70%)',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center justify-center size-14 rounded-full border border-[rgba(237,235,230,0.15)]">
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                <path d="M1 1.5L15 9L1 16.5V1.5Z" fill="rgba(237,235,230,0.5)" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-(--muted)">Case study</span>
            <span className="font-mono text-[10px] text-(--muted)">01</span>
          </div>
        </div>

        <div className="featured-copy flex flex-col gap-4 pb-2">
          <span className="font-mono text-[10px] text-(--accent) uppercase tracking-[0.18em]">{FEATURED.tag}</span>
          <h2 className="font-display font-extrabold uppercase leading-none text-[clamp(1.8rem,3.5vw,3.5rem)] tracking-[-0.02em]" style={{ textWrap: 'balance' }}>
            {FEATURED.title}
          </h2>
          <p className="text-(--muted) text-[14px] leading-relaxed max-w-[42ch]">{FEATURED.desc}</p>
          <span className="font-mono text-[10px] text-(--muted)">{FEATURED.year}</span>
        </div>
      </div>

      {/* Case list */}
      <div className="case-list px-8 lg:px-16 pt-12 pb-24">
        <p className="font-mono text-[10px] text-(--muted) uppercase tracking-[0.2em] mb-6">More work</p>
        <div className="flex flex-col">
          {CASES.map((c, i) => (
            <div
              key={i}
              className="case-row group flex items-center justify-between py-6 border-b border-(--border) gap-6 hover:pl-2 transition-all duration-300"
              data-cursor
            >
              <span className="font-mono text-[10px] text-(--muted) w-6 shrink-0 tabular-nums">
                {String(i + 2).padStart(2, '0')}
              </span>

              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-(--accent) w-40 shrink-0 hidden sm:block">
                {c.tag}
              </span>

              <p className="font-display font-semibold text-[clamp(1rem,2vw,1.4rem)] flex-1 group-hover:text-(--accent) transition-colors duration-300">
                {c.title}
              </p>

              <span className="font-mono text-[10px] text-(--muted) shrink-0">{c.year}</span>

              <svg
                className="shrink-0 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                width="16" height="16" viewBox="0 0 16 16" fill="none"
              >
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
