'use client'

import { ReactNode, useState } from 'react'
import { Header } from '../Header'
import MenuOverlay from '../MenuOverlay'

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  const [navbarOpen, setNavbarOpen] = useState(false)

  return (
    <div className="bg-background w-full min-h-screen bg-[url('/assets/images/background.webp')] bg-cover">
      <div className="flex items-start">
        <div className="w-full">
          <Header navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
          <MenuOverlay navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
          <main className="mt-[114px] px-8 pb-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
