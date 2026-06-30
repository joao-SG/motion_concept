import { ViewTransition } from 'react'
import Link from 'next/link'
import WorkContent from '@/app/components/WorkContent'

export default function WorkPage() {
  return (
    <ViewTransition
      enter={{ 'nav-forward': 'page-enter-forward', default: 'none' }}
      exit={{ 'nav-back': 'page-exit', default: 'none' }}
      default="none"
    >
      <main>
        {/* Page header — same energy, smaller scale */}
        <section className="px-8 lg:px-16 pt-16 pb-12 border-b border-(--border)">
          <Link
            href="/"
            transitionTypes={['nav-back']}
            className="inline-flex items-center gap-3 text-(--muted) text-xs font-mono uppercase tracking-[0.18em] mb-10 hover:text-(--fg) transition-colors duration-200"
            data-cursor
          >
            <span className="inline-block w-5 h-px bg-current" />
            Back
          </Link>

          <p className="font-mono text-[10px] text-(--muted) uppercase tracking-[0.2em] mb-4">
            Depth level 02
          </p>
          <h1 className="font-display font-extrabold uppercase leading-none text-[clamp(3rem,8vw,8rem)] tracking-[-0.03em]">
            The Work
          </h1>
          <p className="mt-5 text-(--muted) text-[15px] max-w-[48ch] leading-relaxed">
            Motion holds here too. Same visual language, same interaction quality — just at a different scale of detail.
          </p>
        </section>

        <WorkContent />
      </main>
    </ViewTransition>
  )
}
