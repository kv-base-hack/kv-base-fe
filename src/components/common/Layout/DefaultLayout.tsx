'use client'

import { ReactNode, useState } from 'react'
import { Header } from '../Header'
import MenuOverlay from '../MenuOverlay'
import Headroom from '../Headroom'

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  const [navbarOpen, setNavbarOpen] = useState(false)

  return (
    <div className="bg-background w-full min-h-screen">
      <div className="flex items-start">
        <div className="w-full">
          <Headroom
            style={{
              zIndex: 999,
            }}
          >
            <Header navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
          </Headroom>
          <MenuOverlay navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
          <main className="px-8 pb-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
