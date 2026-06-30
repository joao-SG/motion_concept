'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/app/lib/gsap'

const FEATURES = [
  {
    n: '01',
    title: 'Narrative, not decoration',
    body: 'Every video earns its place by telling a specific story. Not a brand reel — a use-case sequence that shows the product doing exactly one job, clearly.',
    label: 'Feature overview',
    accent: '#c8f03c',
    reverse: false,
  },
  {
    n: '02',
    title: 'Human at the centre',
    body: 'Real people in real contexts, tied directly to the service. Not stock imagery placed for warmth — imagery chosen for truth. The difference reads immediately.',
    label: 'Customer story',
    accent: '#edebe6',
    reverse: true,
  },
  {
    n: '03',
    title: 'Consistent at every depth',
    body: 'Motion is the visual language of the product, not a homepage feature. The same energy and interaction quality holds across all 16 templates and every level of the IA.',
    label: 'Product walkthrough',
    accent: '#c8f03c',
    reverse: false,
  },
]

function MediaMockup({ label, accent }: { label: string; accent: string }) {
  return (
    <div className="relative w-full aspect-video overflow-hidden bg-[#0f0f0f] border border-(--border)">
      {/* Drifting gradient layer */}
      <div
        className="media-drift absolute inset-[-10%] w-[120%] h-[120%]"
        style={{
          background: `radial-gradient(ellipse 60% 60% at 40% 50%, ${accent}18 0%, transparent 70%),
                       radial-gradient(ellipse 40% 40% at 75% 30%, ${accent}0a 0%, transparent 60%)`,
        }}
      />

      {/* Scan line */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--border) to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center justify-center size-14 rounded-full border border-[rgba(237,235,230,0.15)] backdrop-blur-sm">
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
            <path d="M1 1.5L15 9L1 16.5V1.5Z" fill="rgba(237,235,230,0.5)" />
          </svg>
        </div>
      </div>

      {/* Label */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-(--muted)">
          {label}
        </span>
        <span className="font-mono text-[10px] text-(--muted)">00:32</span>
      </div>
    </div>
  )
}

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const rows = sectionRef.current!.querySelectorAll<HTMLElement>('.f-row')

    rows.forEach((row) => {
      const isReverse = row.dataset.reverse === 'true'
      const media = row.querySelector('.f-media')
      const copy  = row.querySelector('.f-copy')

      gsap.from(media, {
        x: isReverse ? 50 : -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: row, start: 'top 72%' },
      })

      gsap.from(copy, {
        x: isReverse ? -50 : 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.12,
        scrollTrigger: { trigger: row, start: 'top 72%' },
      })
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="px-8 lg:px-16 py-24 flex flex-col gap-24 lg:gap-32">
      {FEATURES.map((f) => (
        <div
          key={f.n}
          className={`f-row grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${f.reverse ? 'lg:[&>.f-media]:order-last' : ''}`}
          data-reverse={String(f.reverse)}
        >
          <div className="f-media">
            <MediaMockup label={f.label} accent={f.accent} />
          </div>

          <div className="f-copy flex flex-col gap-5">
            <span className="font-mono text-[10px] text-(--muted) uppercase tracking-[0.2em]">
              {f.n}
            </span>
            <h3 className="font-display font-extrabold uppercase leading-none text-[clamp(1.8rem,3.5vw,3.2rem)] tracking-[-0.02em]" style={{ textWrap: 'balance' }}>
              {f.title}
            </h3>
            <p className="text-(--muted) text-[15px] leading-relaxed max-w-[42ch]">
              {f.body}
            </p>
          </div>
        </div>
      ))}
    </section>
  )
}
