/* eslint-disable @next/next/no-img-element */
'use client'

import { DataTable } from '@/components/common/DataTable'
import { ColumnsLeaderboard } from '@/components/common/DataTable/columnLeaderboard'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useLeaderboardQuery } from '@/query/leaderboard/getLeaderboard'
import { useEffect, useRef, useState } from 'react'
import { TokenList } from '@/types/tokenList'
import { ImageToken } from '@/components/common/Image/ImageToken'
import Close from '@/components/shared/icons/Close'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import { useTopTokenProfitQuery } from '@/query/onchain-signal/getTopTokenProfit'
import { SelectDuration } from '@/components/common/Select/SelectDuration'
import { useQuery } from '@tanstack/react-query'
import { parseAsInteger, useQueryState } from 'nuqs'
import IconSpotLight from '@/components/shared/icons/smart-traders/icon-spot-light'
import { TokenSpotLight } from './token-spotlight'
import { ButtonChooseToken } from '@/components/common/Button/button-choose-token'
import { ImageWithGlow } from './glow'

export const SmartTraders = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  const CHAIN = useAtomValue(chainAtom)
  const currentPageLeaderboard = parseInt(
    searchParams?.start_leaderboard?.toString() || '1',
  )
  const currentPerPageLeaderboard = parseInt(
    searchParams?.limit_leaderboard?.toString() || '10',
  )
  const currentDurationLeaderboard =
    searchParams?.duration_leaderboard?.toString() || '24h'
  const currentSortByLeaderboard =
    searchParams?.sort_leaderboard?.toString() || ''
  const currentDurationTp = searchParams?.ttp_duration?.toString() || '24h'

  const [listToken, setListToken] = useState<TokenList[]>([])
  const barChartSmartTraderRef = useRef<HTMLDivElement>(null)
  const [widthChartSmartTrader, setWidthChartSmartTrader] = useState(0)

  const [, setPageLeaderboard] = useQueryState(
    'start_leaderboard',
    parseAsInteger.withDefault(currentPageLeaderboard).withOptions({
      history: 'push',
      shallow: false,
    }),
  )

  const [, setDurationLeaderboard] = useQueryState('duration_leaderboard', {
    defaultValue: currentDurationLeaderboard,
    history: 'push',
    shallow: false,
  })

  const [, setSortByLeaderboard] = useQueryState('sort_leaderboard', {
    defaultValue: currentSortByLeaderboard,
    history: 'push',
    shallow: false,
  })
  //
  const [, setTpDuration] = useQueryState('ttp_duration', {
    defaultValue: currentDurationLeaderboard,
    history: 'push',
    shallow: false,
  })

  useEffect(() => {
    setWidthChartSmartTrader(
      (barChartSmartTraderRef?.current?.clientWidth as number) - 40,
    )
  }, [])
  //
  const topTokenProfitQuery = useQuery(
    useTopTokenProfitQuery({
      limit: 8,
      start: 1,
      chain: CHAIN,
      duration: currentDurationTp,
      sort_by: '',
    }),
  )
  const dataTopTokenProfit = topTokenProfitQuery.isFetching
    ? [...(Array(8).keys() as any)]
    : topTokenProfitQuery?.data?.top_smart_money_token_profit?.map(
        (item, index) => {
          return {
            ...item,
            index: index + 1,
          }
        },
      ) || []
  //
  const leaderboardQuery = useQuery(
    useLeaderboardQuery({
      start: currentPageLeaderboard,
      limit: currentPerPageLeaderboard,
      chain: CHAIN,
      sortBy: currentSortByLeaderboard,
      token_addresses:
        listToken?.map((item) => item.tokenAddress)?.toString() || '',
    }),
  )
  const dataLeaderboard = leaderboardQuery.isFetching
    ? [...(Array(10).keys() as any)]
    : leaderboardQuery?.data?.leaderboard?.slice(0, 10) || []
  const totalLeaderboard = leaderboardQuery?.data?.total || 1
  //

  const handleRemoveToken = (item: TokenList) => (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const newListToken = listToken.filter(
      (token) => token.tokenAddress !== item.tokenAddress,
    )
    setListToken([...newListToken])
  }

  return (
    <div className="h-full w-full">
      {/* header */}
      <div className="mx-4 mt-4 flex flex-col gap-2 xl:flex-row">
        <div className="flex w-1/2 items-center justify-between rounded-[20px] border border-white/10 bg-black/50 py-4 pl-4">
          <div className="w-1/2 px-4">
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium text-[#f8f8f8]/95">
                The 1000 Smart Traders Data
              </p>
              <p className="text-sm font-normal text-[#f8f8f8]/70">
                This dataset features the{' '}
                <span className="font-bold">top-performing wallets</span> over
                the last <span className="font-bold">30 days</span>, selected
                for their exceptional trading metrics. Kaivest uses{' '}
                <span className="font-bold">
                  cutting-edge algorithms and AI
                </span>{' '}
                to analyze this data, identifying the most promising tokens they
                buy and tracking all their actions in real-time.
              </p>
            </div>
            <button className="mt-6 flex items-center justify-center rounded-[32px] border border-white/10 bg-[#282828B2]/70 px-8 py-2 text-base font-medium text-[#f8f8f8]/70 bg-blend-luminosity shadow-card backdrop-blur-[50px]">
              Learn more
            </button>
          </div>
          <ImageWithGlow />
        </div>
        <div className="w-1/2">
          <WrapTable
            title="Top 1000 Smart Traders Spotlight"
            icon={<IconSpotLight />}
            childHeader={
              <SelectDuration
                duration={currentDurationTp}
                setDuration={setTpDuration}
              />
            }
            className="flex w-full items-center gap-4 p-6 font-normal"
          >
            <TokenSpotLight durationSpotlight={currentDurationTp} />
          </WrapTable>
        </div>
      </div>
      {/* table */}
      <div className="m-10 mx-4 mt-2 pb-4">
        <WrapTable
          icon={<IconSpotLight />}
          title="Smart Traders Leaderboard"
          childHeader={
            <div className="flex items-center gap-2">
              <ButtonChooseToken
                listToken={listToken}
                setListToken={setListToken}
              />
              {listToken?.length > 0 ? (
                <div className="flex items-center gap-2">
                  {listToken.map((item) => (
                    <div
                      className="h-9 rounded-3xl bg-gradient-to-r from-[#9945FF] to-[#14F195] p-px shadow-lg backdrop-blur-[2px]"
                      key={item.tokenAddress}
                    >
                      <div className="flex h-full cursor-pointer items-center justify-center gap-1 rounded-3xl bg-neutral-07 px-4 text-sm leading-5 tracking-normal text-white">
                        <ImageToken
                          imgUrl={item?.imageUrl}
                          symbol={item?.symbol}
                        />
                        <div>{item.symbol}</div>
                        <Close onclick={handleRemoveToken(item)} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
              <SelectDuration
                duration={currentDurationTp}
                setDuration={setTpDuration}
              />
            </div>
          }
        >
          <div className="mt-4">
            <DataTable
              columns={ColumnsLeaderboard(
                currentPageLeaderboard,
                currentPerPageLeaderboard,
                setSortByLeaderboard,
              )}
              data={dataLeaderboard}
              isFetching={leaderboardQuery.isFetching}
              noneBorder
              noneBgHeader
              emptyData="No results."
            />
          </div>
          <PaginationTable
            className="mt-4"
            currentPage={currentPageLeaderboard}
            pageSize={currentPerPageLeaderboard}
            total={totalLeaderboard}
            setPage={setPageLeaderboard}
          />
        </WrapTable>
      </div>
    </div>
  )
}
