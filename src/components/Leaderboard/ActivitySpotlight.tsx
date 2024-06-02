import Image from 'next/image'
import { CardCommon } from '../common/Card/CardCommon'
import { TitleCard } from '../common/Card/TitleCard'
import { LinkCustom } from '../common/Link'
import Skeleton from '../common/Skeleton'
import { IconFire } from '../shared/icons/leaderboard/IconFire'
import { IconInfoCircle } from '../shared/icons/IconInfoCircle'
import moment from 'moment'
import { cn } from '@/lib/utils'

const DATA = [
  {
    url: '/images/leaderboard/1.png',
    channel: 'Channel 1',
    signal_time: '2024-09-10T13:00:00',
    content:
      'Smart money DCAKaxn5PKKNj229 has bought $100000 of SUI at $0.9. His avg price is $0.6 and  $50000 PnL with ROI +50%.',
  },
  {
    url: '/images/leaderboard/2.png',
    channel: 'Channel 2',
    signal_time: '2024-09-10T13:00:00',
    content:
      'Smart money DCAKaxn5PKKNj229 has bought $100000 of SUI at $0.9. His avg price is $0.6 and  $50000 PnL with ROI +50%.',
  },
]

export const ActivitySpotlight = () => {
  return (
    <CardCommon>
      <TitleCard title="Activity Spotlight by AI" iconFirst={<IconFire />}>
        <LinkCustom url="/" title="See all" />
      </TitleCard>
      <div className="flex items-center gap-4">
        {DATA.map((item, i) => (
          <Card item={item} key={i} />
        ))}
      </div>
    </CardCommon>
  )
}

const Card = ({
  loading,
  item,
  className,
}: {
  loading?: boolean
  item: any
  className?: string
}) => {
  return (
    <div className={cn('flex flex-col gap-2 rounded-[20px] p-4', className)}>
      <div className="flex items-center gap-2">
        {loading ? (
          <Skeleton className="w-10 h-10 rounded-xl" />
        ) : (
          <Image src={item.url} alt="" width={40} height={40} />
        )}
        <div className={loading ? 'flex flex-col gap-2' : ''}>
          <div className="flex items-center gap-2">
            {loading ? (
              <Skeleton className="w-[140px] h-[14px] rounded-lg" />
            ) : (
              <div className="text-neutral-07 text-base font-semibold flex items-center gap-1">
                {item.channel}
                <IconInfoCircle />
              </div>
            )}
          </div>
          <div>
            {loading ? (
              <Skeleton className="w-[140px] h-[14px] rounded-lg" />
            ) : (
              <p className="text-base text-neutral-04 text-medium">
                {moment(item.signal_time).fromNow()}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="text-neutral-07 text-xsm">{item.content}</div>
    </div>
  )
}
