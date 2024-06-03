'use client'

import { ReactNode, useState } from 'react'
import { CardCommon } from '../common/Card/CardCommon'
import { TitleCard } from '../common/Card/TitleCard'
import { IconRanking } from '../shared/icons/leaderboard/IconRanking'
import Info from '../shared/icons/Info'
import { SelectDuration } from '../common/SelectDuration'
import { IconActivity } from '../shared/icons/leaderboard/IconActivity'
import { IconInfo } from '../shared/icons/leaderboard/IconInfo'
import { IconBag } from '../shared/icons/leaderboard/IconBag'
import { cn } from '@/lib/utils'
import { DialogSelectToken } from '../common/SelectTokens/DialogSelectTokens'
import Image from 'next/image'

const TOPTOKEN = [
  'https://assets.coingecko.com/coins/images/34930/small/GMEstop_%281%29_%281%29.png?1706689237',
  'https://assets.coingecko.com/coins/images/37853/small/KITTY.jpg?1715778802',
  'https://assets.coingecko.com/coins/images/37822/small/AMC.png?1715661262',
  'https://assets.coingecko.com/coins/images/21629/small/solana.jpg?1696520989',
  'https://assets.coingecko.com/coins/images/33760/small/image.jpg?1702964227',
]

export const SMMoneyOverview = ({ className }: { className?: string }) => {
  const [filterDate, setFilterDate] = useState<string>('24h')
  return (
    <CardCommon className={className}>
      <TitleCard
        iconFirst={<IconRanking />}
        title="Smart Money Overview"
        iconSecond={<Info />}
      >
        <div className="text-neutral-04 flex items-center gap-4 text-sm">
          <p>Filter by</p>
          <DialogSelectToken>
            <button className="whitespace-nowrap border border-solid border-neutral-03 rounded-xl bg-transparent  px-4 py-2 my-auto">
              Specific Token
            </button>
          </DialogSelectToken>
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
          <div className="flex items-center gap-2">
            {TOPTOKEN.map((i) => {
              return (
                <Image
                  src={i}
                  alt=""
                  width={44}
                  height={44}
                  key={i}
                  className="rounded-full"
                />
              )
            })}
          </div>
        </CardContent>
        <CardContent
          title="Top New Token Holding"
          img={<IconBag />}
          icon={<IconInfo />}
          className="bg-[#F0ECFD]"
        >
          <div className="flex items-center gap-2">
            {TOPTOKEN.map((i) => {
              return (
                <Image
                  src={i}
                  alt=""
                  width={44}
                  height={44}
                  key={i}
                  className="rounded-full"
                />
              )
            })}
          </div>
        </CardContent>
      </div>
    </CardCommon>
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
