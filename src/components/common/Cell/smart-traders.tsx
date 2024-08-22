import Link from 'next/link'
import { ImageBadge, ImageRanking } from '../Image/image-ranking'
import { TooltipWallet } from '../Tooltip/tooltip-wallet'
import { IconFilterFunnel } from '@/components/shared/icons/activity/icon-filter-funnel'

interface SmartTradersProps {
  data: {
    sender?: string
    badges?: string[]
    ranking?: string
    user_address?: string
  }
}

export const SmartTradersCell = ({ data }: SmartTradersProps) => {
  const { sender, badges, ranking, user_address } = data

  const user = sender || user_address

  return (
    <TooltipWallet data={data}>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <ImageRanking ranking={ranking} size={16} />

          <Link
            className="max-w-32 truncate text-neutral-300 underline"
            href={`/smartmoney-onchain/wallet-explorer/${user}`}
          >
            {user}
          </Link>

          <IconFilterFunnel className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-1">
          {badges?.map((badge) => (
            <ImageBadge badge={badge} size={16} key={badge} />
          ))}
        </div>
      </div>
    </TooltipWallet>
  )
}
