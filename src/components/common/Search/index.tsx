'use client'

import SearchIcon from '@/components/shared/icons/SearchIcon'
import React from 'react'
import { ChangeEvent, useRef, useState } from 'react'

export const SearchComp = () => {
  const [search, setSearch] = useState('')

  return (
    // <DialogSearchToken>
    <div className="wrap-box wrap-box relative flex w-full rounded-[20px] lg:max-w-[600px]">
      <div className="my-auto flex flex-1 items-center justify-start rounded-[20px]">
        <div className="my-auto flex flex-1 items-center justify-start gap-2 rounded-[20px] border border-white/20 bg-neutral-07 p-2 text-base font-medium leading-6 text-neutral-02 xl:px-3">
          <SearchIcon />
          <input
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            placeholder="Search wallets, tokens or ask Kai AI..."
            className="flex w-full bg-transparent outline-none xl:flex"
          />
        </div>
      </div>
    </div>
    // </DialogSearchToken>
  )
}
