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
    <div className="flex gap-2 justify-between">
      <Image
        loading="lazy"
        src="/assets/icons/chain/base.svg"
        alt="base"
        width={size === 'lg' ? 32 : 24}
        height={size === 'lg' ? 32 : 24}
        className={cn(
          'object-center aspect-square rounded-full flex-1 w-full',
          size === 'lg' ? 'w-8' : 'w-6',
        )}
      />
      {showName ? <div className="grow">Base</div> : null}
    </div>
  )
}
