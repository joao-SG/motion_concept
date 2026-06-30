'use client'

import Link from 'next/link'

export default function CTA() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-8 gap-6">
      <span className="text-xs text-(--muted) uppercase tracking-[0.2em]">Next</span>
      <Link
        href="/work"
        transitionTypes={['nav-forward']}
        className="font-display font-extrabold uppercase leading-none text-[clamp(3rem,8vw,9rem)] hover:text-(--accent) transition-colors duration-300"
        data-cursor
      >
        View Work
      </Link>
    </section>
  )
}
