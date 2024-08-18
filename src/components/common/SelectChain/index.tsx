import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

export const SelectChain = ({
  showName = true,
  size = 'md',
}: {
  showName?: boolean
  size?: 'md' | 'lg'
}) => {
  return (
    <div className="flex justify-between gap-2">
      <Image
        loading="lazy"
        src="/assets/icons/chain/base.svg"
        alt="base"
        width={size === 'lg' ? 32 : 24}
        height={size === 'lg' ? 32 : 24}
        className={cn(
          'aspect-square w-full flex-1 rounded-full object-center',
          size === 'lg' ? 'w-8' : 'w-6',
        )}
      />
      {showName ? <div className="grow">Base</div> : null}
    </div>
  )
}
