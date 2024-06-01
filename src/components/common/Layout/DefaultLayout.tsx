'use client'

import { ReactNode } from 'react'
import { LayoutSidebar } from '../LayoutSidebar'
import { Header } from '../Header'

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-background w-full min-h-screen bg-[url('/assets/images/background.png')] bg-cover">
      <div className="flex items-start">
        <LayoutSidebar />
        <div className="ml-[300px] 2xl:ml-[330px] w-full">
          <Header />
          <main className="mt-[100px]">{children}</main>
        </div>
      </div>
    </div>
  )
}
