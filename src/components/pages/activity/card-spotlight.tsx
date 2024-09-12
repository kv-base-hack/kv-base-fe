'use client'

import LastDateIcon from '@/components/shared/icons/wallet-explorer/LastDateIcon'
import { cn } from '@/lib/utils'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import { SpotlightType } from '@/types/activity/spotlight'
import { ContentSpotlight } from './content-spotlight'
import { ACTION_SPOTLIGHT } from '@/constant/spotlight-by-ai'


interface CardSpotlightProps {
  item: SpotlightType
}

export const CardSpotlight = ({ item }: CardSpotlightProps) => {
  const listActionSell = [
    'selling',
    'new_listing_sell',
    'deposit',
    'major_sell_off',
    'sell_all_position',
    'token_dump',
    'panic_sell',
    'withdraw',
  ]

  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl border border-white/10 bg-transparent p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full border',
              listActionSell.includes(item.action)
                ? 'border-[#F04D1A] text-[#F04D1A]'
                : 'border-core text-core',
            )}
          >
            {ACTION_SPOTLIGHT[item.action as keyof typeof ACTION_SPOTLIGHT]
              ?.icon || ''}
          </div>
          <div>
            <p
              className={cn(
                'text-sm',
                listActionSell.includes(item.action)
                  ? 'text-[#F04D1A]'
                  : 'text-core',
              )}
            >
              {ACTION_SPOTLIGHT[item.action as keyof typeof ACTION_SPOTLIGHT]
                ?.name || ''}
            </p>
            <div className="flex items-center text-xs text-neutral-400">
              <LastDateIcon />
              <p>{moment(item.block_timestamp).fromNow()}</p>
            </div>
          </div>
        </div>
        <Link href={item.scan_link} passHref legacyBehavior>
          <a target="_blank">
            <Image
              src={'/images/logo-scan.svg'}
              alt="time"
              width={20}
              height={20}
            />
          </a>
        </Link>
      </div>
      <ContentSpotlight item={item} />
    </div>
  )
}
