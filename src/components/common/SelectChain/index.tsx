import { useAtom } from 'jotai'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { chainAtom } from '@/atom/chain'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import React from 'react'

const renderChain = (chain: string) => {
  switch (chain) {
    case 'solana':
      return {
        value: 'Solana',
        icon: '/assets/icons/chain/solana.svg',
      }
    case 'ethereum': {
      return {
        value: 'Ethereum',
        icon: '/assets/icons/chain/ethereum.svg',
      }
    }
    case 'sui': {
      return {
        value: 'Sui',
        icon: '/assets/icons/chain/sui.svg',
      }
    }
    case 'base': {
      return {
        value: 'Base',
        icon: '/assets/icons/chain/base.svg',
      }
    }
    default: {
      return {
        value: 'Solana',
        icon: '/assets/images/logo.svg',
      }
    }
  }
}

export const SelectChain = ({
  showName = true,
  size = 'md',
}: {
  showName?: boolean
  size?: 'md' | 'lg'
}) => {
  const [chain, setChain] = useAtom(chainAtom)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.get('chain')

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const handleSelectChain = (val: string) => {
    setChain(val)
    router.push(pathname + '?' + createQueryString('chain', val))
  }
  return (
    <Select value={search ?? chain} onValueChange={handleSelectChain}>
      <SelectTrigger
        className={cn(
          'flex w-full cursor-pointer gap-2 px-4 py-3 my-auto text-base font-semibold tracking-normal leading-6 text-gray-300 whitespace-nowrap',
          size === 'lg'
            ? 'bg-transparent border-none outline-none focus:ring-0 focus:ring-offset-0 p-0'
            : 'border border-solid backdrop-blur-[50px] bg-neutral-07/50 border-white/10 rounded-[360px]',
        )}
      >
        <div className="flex gap-2 justify-between">
          <Image
            loading="lazy"
            src={renderChain(search ?? chain).icon}
            alt={search ?? chain}
            width={size === 'lg' ? 32 : 24}
            height={size === 'lg' ? 32 : 24}
            className={cn(
              'object-center aspect-square rounded-full flex-1 w-full',
              size === 'lg' ? 'w-8' : 'w-6',
            )}
          />
          {showName ? (
            <div className="grow">{renderChain(search ?? chain).value}</div>
          ) : null}
        </div>
      </SelectTrigger>
      <SelectContent className="border-none bg-neutral-07 z-[9999]">
        <SelectItem value="ethereum">Ethereum</SelectItem>
        <SelectItem value="base">Base</SelectItem>
      </SelectContent>
    </Select>
  )
}
