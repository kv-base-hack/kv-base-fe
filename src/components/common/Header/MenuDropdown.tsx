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
}: {
  title: string
  data: any
  isActive: boolean
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
          'flex cursor-pointer items-center gap-2 justify-center self-stretch px-3 py-1 whitespace-nowrap',
          isActive ? 'rounded-[20px] backdrop-blur-[50px] bg-white/20' : '',
        )}
      >
        <div>{title}</div>
        {open ? <MenuArrowDownIcon /> : <ArrowRightIcon />}
      </div>
      <div className="absolute z-50 top-[60px] left-0">
        {open ? (
          <div
            ref={ref}
            className="border shadow-box p-2 bg-neutral-07 rounded-[20px] border-solid border-white/20 text-left"
          >
            {data?.map((item: any, idx: number) => (
              <Link onClick={() => setOpen(false)} href={item?.href} key={idx}>
                <div
                  key={item?.title}
                  className="cursor-pointer rounded-2xl hover:bg-neutral-06 px-4 py-2"
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
