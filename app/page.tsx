import { ViewTransition } from 'react'
import Hero from './components/Hero'
import Statement from './components/Statement'
import Capabilities from './components/Capabilities'
import Features from './components/Features'
import CTA from './components/CTA'

export default function HomePage() {
  return (
    <ViewTransition
      enter={{ 'nav-back': 'page-enter-back', default: 'none' }}
      exit={{ 'nav-forward': 'page-exit', default: 'none' }}
      default="none"
    >
      <main>
        <Hero />
        <Statement />
        <Capabilities />
        <Features />
        <CTA />
      </main>
    </ViewTransition>
  )
}
