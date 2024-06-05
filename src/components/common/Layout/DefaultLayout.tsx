'use client'

import { ReactNode } from 'react'
import { Header } from '../Header'

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-background w-full min-h-screen bg-[url('/assets/images/background.webp')] bg-cover">
      <div className="flex items-start">
        <div className="w-full">
          <Header />
          <main className="mt-[114px] px-8 pb-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
