/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import MenuOverlay from '../MenuOverlay'
import dynamic from 'next/dynamic'
import { useAtom } from 'jotai'
import { heightHeaderAtom } from '@/atom/header'
import { TrendingHeader } from '../Header/TrendingHeader'

const Header = dynamic(() => import('../Header').then((mod) => mod.Header), {
  ssr: false,
})

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const refHeader = useRef<HTMLDivElement>(null)
  const [, setHeightHeader] = useAtom(heightHeaderAtom)

  useEffect(() => {
    const updateSize = () => {
      if (refHeader.current) {
        setHeightHeader(refHeader.current.clientHeight)
      }
    }

    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [refHeader?.current?.clientHeight])

  return (
    <div className="relative w-full">
      <div className="flex min-h-screen flex-col bg-[#111218]">
        <div className="z-[200]" ref={refHeader}>
          <Header navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
        </div>
        <MenuOverlay navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
        <TrendingHeader />
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  )
}
