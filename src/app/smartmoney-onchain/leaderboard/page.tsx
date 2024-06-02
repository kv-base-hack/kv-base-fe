'use client'

import { DataTable } from '@/components/common/DataTable'
import { columnsLeaderboard } from '@/components/common/DataTable/columnLeaderboard'
import { columnsPerformanceToken } from '@/components/common/DataTable/columnsPerformanceToken'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { GroupHeader } from '@/components/common/GroupHeader'
import { PaginationCustom } from '@/components/common/Pagination'
import { SelectChain } from '@/components/common/SelectChain'
import ArrowDownIcon from '@/components/shared/icons/ArrowDownIcon'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useLeaderboardQuery } from '@/query/leaderboard/getLeaderboard'
import { useTopTokenProfitQuery } from '@/query/onchain-signal/getTopTokenProfit'
import SmartMoneyRankingIcon from '@/components/shared/icons/leaderboard/SmartMoneyRankingIcon'
import SmartMoneyTopPerformingIcon from '@/components/shared/icons/dashboard/SmartMoneyTopPerformingIcon'
import { DateGroup } from '@/components/common/DateGroup'
import { cn } from '@/lib/utils'
import { ReactNode, useState } from 'react'
import { CardCommon } from '@/components/common/Card/CardCommon'
import { TitleCard } from '@/components/common/Card/TitleCard'
import { IconRanking } from '@/components/shared/icons/leaderboard/IconRanking'
import Info from '@/components/shared/icons/Info'
import { SelectDuration } from '@/components/common/SelectDuration'
import { IconActivity } from '@/components/shared/icons/leaderboard/IconActivity'
import { IconInfo } from '@/components/shared/icons/leaderboard/IconInfo'
import { IconBag } from '@/components/shared/icons/leaderboard/IconBag'
import { LastestAiSignal } from '@/components/Leaderboard/LastestAiSignal'
import { ActivitySpotlight } from '@/components/Leaderboard/ActivitySpotlight'
import { TableInsiderBuy } from '@/components/Leaderboard/Table/TableInsiderBuy'
import { TableNewListingBuy } from '@/components/Leaderboard/Table/TableNewListingBuy'
import { TableTopBuy } from '@/components/Leaderboard/Table/TableTopBuy'
import { TablePerformanceToken } from '@/components/Leaderboard/Table/TableTopPerformingTokens'

const RightGroup = () => {
  return (
    <div className="flex gap-4 justify-between px-3 text-gray-500 rounded-lg">
      <div className="flex items-center gap-2 justify-between px-4 py-2 rounded-xl border-2 border-solid border-white/10">
        <div className="grow">Filter by Token</div>
        <ArrowDownIcon />
      </div>
      <div className="flex items-center gap-2 justify-between px-4 py-2 rounded-xl border-2 border-solid border-white/10">
        <div className="grow">Filter by Badge</div>
        <ArrowDownIcon />
      </div>
    </div>
  )
}

const DATA_DATE = [
  {
    value: '1h',
    label: '1h',
  },
  {
    value: '4h',
    label: '4h',
  },
  {
    value: '24h',
    label: '1D',
  },
  {
    value: '168h',
    label: '3D',
  },
]

export default function Leaderboard() {
  const CHAIN = useAtomValue(chainAtom)
  const [tab, setTabs] = useState('smart_money')
  const [pageTopProfit, setPageTopProfit] = useState(1)
  const [pageLeaderboard, setPageLeaderboard] = useState(1)
  const [filterDate, setFilterDate] = useState('24h')
  //
  const leaderboardQuery = useLeaderboardQuery({
    start: pageLeaderboard,
    limit: 10,
    chain: CHAIN,
  })
  const dataLeaderboard =
    leaderboardQuery.data?.data.leaderboard?.slice(0, 10) || []
  const totalLeaderboard = leaderboardQuery.data?.data.total || 1
  //
  const topTokenProfitQuery = useTopTokenProfitQuery({
    limit: 10,
    start: pageTopProfit,
    chain: CHAIN,
    duration: filterDate,
  })

  //

  const handleChangeTab = (tab: string) => () => {
    setTabs(tab)
  }

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <CardCommon>
        <TitleCard
          iconFirst={<IconRanking />}
          title="Smart Money Overview"
          iconSecond={<Info />}
        >
          <div className="text-neutral-04 flex items-center gap-4 text-sm">
            <p>Filter by</p>
            <p className="whitespace-nowrap border border-solid border-neutral-03 rounded-xl bg-transparent  px-4 py-2 my-auto">
              Specific Token
            </p>
            <SelectDuration duration={filterDate} setDuration={setFilterDate} />
          </div>
        </TitleCard>
        <div className="flex items-center gap-3">
          <CardContent
            title="Total Earning"
            img={<IconActivity />}
            icon={<IconInfo />}
            className="bg-[#B5E4CA]/30"
          >
            <p className="text-[48px] leading-[48px] text-semantic-success-1 font-semibold">
              +$7.28M
            </p>
          </CardContent>
          <CardContent
            title="Top Token Holding by Value"
            img={<IconBag />}
            icon={<IconInfo />}
            className="bg-[#b1e5fc40]"
          >
            <p className="text-[48px] leading-[48px] text-semantic-success-1 font-semibold">
              +$7.28M
            </p>
          </CardContent>
          <CardContent
            title="Top New Token Holding"
            img={<IconBag />}
            icon={<IconInfo />}
            className="bg-[#F0ECFD]"
          >
            <p className="text-[48px] leading-[48px] text-semantic-success-1 font-semibold">
              +$7.28M
            </p>
          </CardContent>
        </div>
      </CardCommon>
      <div className="flex items-ceter gap-2">
        <LastestAiSignal />
        <ActivitySpotlight />
      </div>

      <div className="flex gap-2">
        <TableInsiderBuy />
        <TableNewListingBuy />
        <TableTopBuy />
      </div>

      <TablePerformanceToken />
    </div>
  )
}

const CardContent = ({
  icon,
  title,
  img,
  children,
  className,
}: {
  icon: ReactNode
  title: string
  img: ReactNode
  children: ReactNode
  className?: string
}) => {
  return (
    <div className={cn('p-4 rounded-xl w-full', className)}>
      <div className="flex flex-col gap-4 p-4">
        <div className="bg-neutral-07 rounded-full w-12 h-12 flex items-center justify-center p-3">
          {img}
        </div>
        <div className="flex items-center gap-1">
          <p className="text-neutral-05 text-sm font-semibold">{title}</p>
          {icon}
        </div>
        {children}
      </div>
    </div>
  )
}
