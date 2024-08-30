import Link from 'next/link'
import { ImageBadge, ImageRanking } from '../Image/image-ranking'
import { TooltipWallet } from '../Tooltip/tooltip-wallet'
import { IconFiltedFunnel, IconFilterFunnel } from '@/components/shared/icons/activity/icon-filter-funnel'

export const SmartTradersCell = ({
  data,
  setUserAddress,
  userAddress,
}: {
  data: any
  setUserAddress?: (v: string) => void
  userAddress?: string
}) => {
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

          {userAddress ? (
            <button onClick={() => setUserAddress && setUserAddress('')}>
              <IconFiltedFunnel />
            </button>
          ) : (
            <button onClick={() => setUserAddress && setUserAddress(sender)}>
              <IconFilterFunnel />
            </button>
          )}
        </div>
        <div className="flex items-center gap-1">
          {badges?.map((badge: string) => (
            <ImageBadge badge={badge} size={16} key={badge} />
          ))}
        </div>
      </div>
    </TooltipWallet>
  )
}
