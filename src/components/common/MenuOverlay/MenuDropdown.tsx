'use client'

import ArrowRightIcon from '@/components/shared/icons/ArrowRight'
import MenuArrowDownIcon from '@/components/shared/icons/MenuArrowDown'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useClickAway } from 'react-use'

export const MenuDropdown = ({
  title,
  data,
  isActive,
  setNavbarOpen,
}: {
  title: string
  data: any
  isActive: boolean
  setNavbarOpen: (open: boolean) => void
}) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useClickAway(ref, () => {
    setOpen(false)
  })

  return (
    <div className="relative z-50">
      <div
        onClick={() => setOpen(!open)}
        className={cn(
          'flex cursor-pointer items-center justify-center gap-2 self-stretch whitespace-nowrap px-3 py-2',
          isActive ? 'rounded-3xl bg-white/20 backdrop-blur-[50px]' : '',
        )}
      >
        <div>{title}</div>
        {open ? <MenuArrowDownIcon /> : <ArrowRightIcon />}
      </div>
      <div className="mt-1.5">
        {open ? (
          <div
            ref={ref}
            className="rounded-2xl border border-solid border-white/20 bg-neutral-07 p-2 text-left shadow-box"
          >
            {data?.map((item: any, idx: number) => (
              <Link
                key={idx}
                onClick={() => {
                  setNavbarOpen(false)
                  setOpen(false)
                }}
                href={item?.href}
              >
                <div
                  key={item?.title}
                  className="cursor-pointer rounded-2xl px-4 py-2 hover:bg-neutral-06"
                >
                  {item?.title}
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
