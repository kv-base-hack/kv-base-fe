import Image from 'next/image'
import { CardCommon } from '../common/Card/CardCommon'
import { TitleCard } from '../common/Card/TitleCard'
import { LinkCustom } from '../common/Link'
import Skeleton from '../common/Skeleton'
import { IconFire } from '../shared/icons/leaderboard/IconFire'
import { IconInfoCircle } from '../shared/icons/IconInfoCircle'
import moment from 'moment'
import { cn } from '@/lib/utils'
import { PaginationCustom } from '../common/Pagination'

const DATA = [
  {
    url: '/assets/icons/chain/ethereum.svg',
    channel: 'Channel 1',
    signal_time: '2024-09-10T13:00:00',
    content:
      'Smart money DCAKaxn5PKKNj229 has bought $100000 of SUI at $0.9. His avg price is $0.6 and  $50000 PnL with ROI +50%.',
  },
  {
    url: '/assets/icons/chain/ethereum.svg',
    channel: 'Channel 2',
    signal_time: '2024-09-10T13:00:00',
    content:
      'Smart money DCAKaxn5PKKNj229 has bought $100000 of SUI at $0.9. His avg price is $0.6 and  $50000 PnL with ROI +50%.',
  },
  {
    url: '/assets/icons/chain/ethereum.svg',
    channel: 'Channel 3',
    signal_time: '2024-09-10T13:00:00',
    content:
      'Smart money DCAKaxn5PKKNj229 has bought $100000 of SUI at $0.9. His avg price is $0.6 and  $50000 PnL with ROI +50%.',
  },
  {
    url: '/assets/icons/chain/ethereum.svg',
    channel: 'Channel 4',
    signal_time: '2024-09-10T13:00:00',
    content:
      'Smart money DCAKaxn5PKKNj229 has bought $100000 of SUI at $0.9. His avg price is $0.6 and  $50000 PnL with ROI +50%.',
  },
]

export const ActivitySpotlight = ({ limit }: { limit: number }) => {
  return (
    <CardCommon>
      <TitleCard title="Activity Spotlight by AI" iconFirst={<IconFire />}>
        <LinkCustom url="/tracking" title="See all" />
      </TitleCard>
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center gap-4">
          {DATA.slice(0, limit).map((item, i) => (
            <Card
              item={item}
              key={i}
              className={
                i === 0
                  ? 'bg-[#E1F1FF]'
                  : i === 1
                    ? 'bg-[#FFF1E1]'
                    : i === 2
                      ? 'bg-[#F4E7FC]'
                      : 'bg-[#E1FFEF]'
              }
            />
          ))}
        </div>
        <PaginationCustom
          currentPage={1}
          className="mt-4"
          updatePage={undefined}
          pageSize={2}
          total={20}
          setPage={undefined}
        />
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

      <div className="text-neutral-07 text-xsm line-clamp-4">
        {item.content}
      </div>
    </div>
  )
}
