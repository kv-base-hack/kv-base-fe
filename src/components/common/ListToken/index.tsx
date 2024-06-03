'use client'

import TopTrendingIcon from '@/components/shared/icons/kaichat/TopTrendingIcon'
import { SelectFindGems } from '../Select/SelectFindGems'
import { useState } from 'react'
import { useAtomValue } from 'jotai'
import { chainAtom } from '@/atom/chain'
import { ImageToken } from '../Image/ImageToken'
import { cn } from '@/lib/utils'
import { useFindGemsDepositQuery } from '@/query/find-gems/getFindGemsDeposit'
import { useFindGemsWithdrawQuery } from '@/query/find-gems/getFindGemsWithdraws'
import { useFindGemsUnusualCexQuery } from '@/query/find-gems/getFindGemsUnusualCex'
import { useFindGemsSmartMoneyHoldingQuery } from '@/query/find-gems/getFindGemsSmartMoneyHolding'
import { useGetTopTokenBuy } from '@/query/top-tokens/getTopTokenBuy'
import { useGetTopTokenSell } from '@/query/top-tokens/getTopTokenSell'
import { PaginationCustom } from '../Pagination'
import { useQuery } from '@tanstack/react-query'

const renderPercentPrice = (percent: number) => {
  if (!percent) return null
  return (
    <div
      className={cn(
        'my-auto text-right',
        percent > 0 ? 'text-success-500' : 'text-error-500',
      )}
    >
      {percent > 0 ? '+' : ''}
      {percent?.toFixed(2)}%
    </div>
  )
}

const RenderDataGem = ({
  dataTable,
  page,
  setPage,
  total,
}: {
  page: number
  setPage: (page: number) => void
  dataTable: any
  total: number
}) => {
  return (
    <>
      {dataTable?.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className="flex gap-2 justify-between mt-4 w-full text-sm tracking-normal leading-4 whitespace-nowrap"
          >
            <div className="flex gap-3 items-center text-gray-300">
              <div className="self-stretch my-auto">
                {index + 1 + (page - 1) * 10}
              </div>
              <ImageToken imgUrl={item?.image_url} symbol={item?.symbol} />
              <div className="self-stretch my-auto text-right">
                {item?.symbol}
              </div>
            </div>
            {renderPercentPrice(
              item?.price_percent_change_24h ||
                item?.price_percent_change_24h ||
                item?.priceChangeH24,
            )}
          </div>
        )
      })}
      <PaginationCustom
        className="mt-8"
        currentPage={page}
        updatePage={(page: number) => setPage(page)}
        pageSize={10}
        total={total}
        setPage={setPage}
      />
    </>
  )
}

export const ListToken = () => {
  const [gem, setGem] = useState('sm_holding')
  const [page, setPage] = useState(1)
  const CHAIN = useAtomValue(chainAtom)

  // deposit
  const findGemsDepositQuery = useQuery({
    ...useFindGemsDepositQuery({
      limit: 10,
      start: page,
      chain: CHAIN,
      duration: '24h',
    }),
    enabled: gem === 'top_cex_deposit',
  })
  const dataFindGemsDeposit = findGemsDepositQuery.data?.top_cex_deposit || []
  const totalFindGemDeposit = findGemsDepositQuery.data?.total || 1

  // withdraw
  const findGemsWithdrawQuery = useFindGemsWithdrawQuery({
    limit: 10,
    start: page,
    chain: CHAIN,
    enabled: gem === 'top_cex_withdraw',
  })
  const dataFindGemsWithdraw =
    findGemsWithdrawQuery.data?.data.top_cex_withdraw || []
  const totalFindGemWithdraw = findGemsWithdrawQuery.data?.data.total || 1

  // unusual cex
  const findGemsUnusualCexQuery = useQuery({
    ...useFindGemsUnusualCexQuery({
      limit: 10,
      start: page,
      chain: CHAIN,
    }),
    enabled: gem === 'unusual_cex',
  })
  const dataFindGemsUnusualCex =
    findGemsUnusualCexQuery.data?.top_unusual_cex || []
  const totalFindGemUnusualCex = findGemsUnusualCexQuery.data?.total || 1

  // trending
  const trendingTokenQuery = useQuery(
    useFindGemsSmartMoneyHoldingQuery({
      chain: CHAIN,
      limit: 10,
      start: 1,
      duration: '24h',
    }),
  )
  const dataFindGemsTrending =
    trendingTokenQuery.data?.smart_money_holding || []

  // top buy
  const topTokenBuyQuery = useGetTopTokenBuy({
    limit: 10,
    start: page,
    chain: CHAIN,
    duration: '24h',
    action: 'buying',
    enabled: gem === 'sm_top_buys',
  })
  const dataFindGemsBuy =
    topTokenBuyQuery.data?.data.top_buy_by_smart_money || []
  const totalFindGemsBuy = topTokenBuyQuery.data?.data.total_buy || 1

  // top sell
  const topTokenSellQuery = useGetTopTokenSell({
    limit: 10,
    start: page,
    chain: CHAIN,
    duration: '24h',
    action: 'selling',
    enabled: gem === 'sm_top_sells',
  })
  const dataFindGemsSell =
    topTokenSellQuery.data?.data.top_sell_by_smart_money || []
  const totalFindGemsSell = topTokenSellQuery.data?.data.total_sell || 1

  const renderSelectValue = () => {
    switch (gem) {
      case 'top_cex_withdraw':
        return (
          <RenderDataGem
            page={page}
            setPage={setPage}
            dataTable={dataFindGemsWithdraw}
            total={totalFindGemWithdraw}
          />
        )
      case 'top_cex_deposit':
        return (
          <RenderDataGem
            page={page}
            setPage={setPage}
            dataTable={dataFindGemsDeposit}
            total={totalFindGemDeposit}
          />
        )
      case 'unusual_cex':
        return (
          <RenderDataGem
            page={page}
            setPage={setPage}
            dataTable={dataFindGemsUnusualCex}
            total={totalFindGemUnusualCex}
          />
        )
      case 'sm_holding':
        return (
          <RenderDataGem
            page={page}
            setPage={setPage}
            dataTable={dataFindGemsTrending}
            total={dataFindGemsTrending?.length || 0}
          />
        )
      case 'sm_top_buys':
        return (
          <RenderDataGem
            page={page}
            setPage={setPage}
            dataTable={dataFindGemsBuy}
            total={totalFindGemsBuy}
          />
        )
      case 'sm_top_sells':
        return (
          <RenderDataGem
            page={page}
            setPage={setPage}
            dataTable={dataFindGemsSell}
            total={totalFindGemsSell}
          />
        )
      default:
        return null
    }
  }
  return (
    <div className="hidden xl:flex flex-col justify-center max-w-[264px]">
      <div className="flex flex-col p-4 w-full rounded-lg border border-solid shadow-lg backdrop-blur-lg bg-neutral-07/50 border-white/10">
        <div className="flex items-center gap-2 text-base font-bold tracking-normal leading-6 text-zinc-100">
          <div className="w-6 h-6">
            <TopTrendingIcon className="w-6 h-6" />
          </div>
          <SelectFindGems gem={gem} setGem={setGem} setPage={setPage} />
        </div>
        {renderSelectValue()}
      </div>
      <div className="mt-4 w-full text-sm italic tracking-normal leading-5 underline text-neutral-02">
        <span className="underline">Tips:</span> You can{' '}
        <span className="font-bold">click on tokens </span>to get AI Analyst
        quickly.
      </div>
    </div>
  )
}
