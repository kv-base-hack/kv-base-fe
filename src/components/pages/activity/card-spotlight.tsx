import LastDateIcon from '@/components/shared/icons/wallet-explorer/LastDateIcon'
import { cn } from '@/lib/utils'
import upperFirst from 'lodash.upperfirst'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'
import {
  IconCart,
  IconFirstTimeBuy,
  IconSell,
  IconTarget,
  IconUnusualBuy,
} from '@/components/shared/icons/spotlight'
import { ContentSpotlight } from './content-spotlight'

const renderIcon = (action: string) => {
  switch (action) {
    case 'buy_more':
      return <IconCart />
    case 'new_listing_buy':
      return <IconTarget />
    case 'first_time_buy':
      return <IconFirstTimeBuy />
    case 'selling':
      return <IconSell />
    case 'new_listing_sell':
      return <IconSell />
    case 'unusual_buy':
      return <IconUnusualBuy />
    default:
      return <IconCart />
  }
}

const renderAction = (action: string) => {
  switch (action) {
    case 'unusual_buy':
      return 'Unusual Buy'
    case 'new_listing_buy':
      return 'New Listing Buy'
    case 'first_time_buy':
      return 'First Time Buy'
    case 'buy_more':
      return 'Buy More'
    case 'selling':
      return 'Sell'
    case 'new_listing_sell':
      return 'New Listing Sell'
    default:
      return upperFirst(action)
  }
}

export const CardSpotlight = ({ ...item }) => {
  const data = item?.item || {}
  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl border border-white/10 bg-transparent p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full border',
              data.action === 'selling' || data.action === 'new_listing_sell'
                ? 'border-[#F04D1A] text-[#F04D1A]'
                : 'border-core text-core',
            )}
          >
            {renderIcon(data.action)}
          </div>
          <div>
            <p
              className={cn(
                'text-sm',
                data.action === 'selling' || data.action === 'new_listing_sell'
                  ? 'text-[#F04D1A]'
                  : 'text-core',
              )}
            >
              {renderAction(data.action)}
            </p>
            <div className="flex items-center text-xs text-neutral-400">
              <LastDateIcon />
              <p>{moment(data.block_timestamp).fromNow()}</p>
            </div>
          </div>
        </div>
        <Link href={data.scan_link} passHref legacyBehavior>
          <a target="_blank">
            <Image
              src={'/images/logoTime.png'}
              alt="time"
              width={23}
              height={23}
            />
          </a>
        </Link>
      </div>
      <ContentSpotlight item={data} />
    </div>
  )
}
