'use client'

import { MessageTokenInfoResponse } from '@/types'
import { ImageToken } from '../Image/ImageToken'
import { ArrowRightDown } from '@/components/shared/icons/ArrowRightDown'
import { cn } from '@/lib/utils'
import { IconDollar } from '@/components/shared/icons/IconDollar'
import { ReactNode } from 'react'
import { nFormatter } from '@/lib/utils/nFormatter'
import { renderPrice } from '@/lib/utils/renderPrice'
import { AreaChartTokenInfo } from '../Chart/ChartDetail/AreaChartTokenInfo'

const MarketInfo = ({
  icon,
  title,
  total,
}: {
  icon: ReactNode
  title: string
  total: number
}) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex items-center gap-1 text-sm font-normal text-neutral-300">
        {icon}
        <span>{title}</span>
      </div>
      <div className="text-neutrl-dark-01 text-base font-medium">
        ${total ? nFormatter(total) : '-'}
      </div>
    </div>
  )
}

const renderPercentChange = (percent: number) => {
  return (
    <div
      className={cn(
        'flex items-center gap-1 pt-1.5 text-sm font-medium',
        percent > 0 ? 'text-success-500' : 'text-error-500',
      )}
    >
      <span>{percent.toFixed(2)}%</span>
      <ArrowRightDown
        className={percent > 0 ? '-rotate-90' : ''}
        color={percent > 0 ? '#34D399' : '#FF3B30'}
      />
    </div>
  )
}

export const MessageTokenInfo = (data: MessageTokenInfoResponse) => {
  return (
    <div className="mb-10 flex w-full flex-col gap-4 rounded-2xl border border-white/10 bg-[#1A1D1F]/50 p-4 shadow-chat-ai backdrop-blur-[32px]">
      <div className="flex items-center gap-20">
        <div className="flex items-center gap-3">
          <ImageToken symbol={data.symbol} className="h-[45px] w-[45px]" />
          <div className="flex flex-col justify-between">
            <p className="text-base font-medium text-black-300">
              {data.symbol}
            </p>
            <p className="text-sm font-normal text-black-300">{data.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <MarketInfo
            icon={<IconDollar />}
            title="Marketcap"
            total={data?.market_cap}
          />
          <div className="h-10 w-px flex-1 bg-white/30"></div>
          <MarketInfo
            icon={<IconDollar />}
            title="Volume 24h"
            total={data?.volume_24h}
          />
          <div className="h-10 w-px bg-white/30"></div>
          <MarketInfo
            icon={<IconDollar />}
            title="Liquidity"
            total={data?.liquidity}
          />
          <div className="h-10 w-px bg-white/30"></div>
          <MarketInfo
            icon={<IconDollar />}
            title="FDV"
            total={data?.fully_diluted_valuation}
          />
        </div>
      </div>

      <div className="flex flex-col items-stretch gap-4 rounded-2xl bg-[#111315]/50 p-4 backdrop-blur-[50px]">
        <div className="flex gap-4 pl-4">
          <p className="text-[32px] font-bold leading-[48px] text-[#FEFEFE]">
            {renderPrice(data.usd_price)}
          </p>
          <p className="text-2xl font-normal">
            {renderPercentChange(data.percent_change_24h)}
          </p>
        </div>
        <div className="h-[280px]">
          <AreaChartTokenInfo
            dataTokenInfo={null}
            sparkLineIn7D={data?.chart}
            loading={false}
            setValueIndex={() => null}
            showDate={true}
          />
        </div>
      </div>
    </div>
  )
}
