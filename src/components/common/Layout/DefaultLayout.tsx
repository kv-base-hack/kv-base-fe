'use client'

import { ReactNode } from 'react'
import { LayoutSidebar } from '../LayoutSidebar'
import { Header } from '../Header'

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-background w-full min-h-screen bg-[url('/assets/images/background.png')] bg-cover">
      <div className="flex items-start">
        <div className="w-full">
          <Header />
          <main className="mt-[100px] px-8 pb-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
