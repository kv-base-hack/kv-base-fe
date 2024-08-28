/* eslint-disable @next/next/no-img-element */
'use client'

import { DataTable } from '@/components/common/DataTable'
import { ColumnsLeaderboard } from '@/components/common/DataTable/columnLeaderboard'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useLeaderboardQuery } from '@/query/leaderboard/getLeaderboard'
import { Suspense, useEffect, useRef, useState } from 'react'
import { TokenList } from '@/types/tokenList'
import { ImageToken } from '@/components/common/Image/ImageToken'
import Close from '@/components/shared/icons/Close'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { parseAsInteger, useQueryState } from 'nuqs'
import { Glow } from './glow/glow'
import IconSpotLight from '@/components/shared/icons/smart-traders/icon-spot-light'
import { SelectDurationLeaderboard } from '@/components/common/Select/SelectDuration/select-duration-leaderboard'
import { TokenSpotLight } from './token-spotlight'
import { IconBarChart01 } from '@/components/shared/icons/icon-bar-chart-01'
import { ButtonChooseToken } from '@/components/common/Button/button-choose-token'

export const WalletAnalysis = ({
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
    searchParams?.duration_leaderboard?.toString() || '30d'
  const currentSortByLeaderboard =
    searchParams?.sort_leaderboard?.toString() || ''
  const currentTokenAddresesLeaderboard =
    searchParams?.ta_leaderboard?.toString() || ''
  const currentDurationTp = searchParams?.ttp_duration?.toString() || '30d'

  const [listToken, setListToken] = useState<TokenList[]>([])
  const barChartSmartTraderRef = useRef<HTMLDivElement>(null)
  const [, setWidthChartSmartTrader] = useState(0)

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

  const [sortByLeaderboard, setSortByLeaderboard] = useQueryState(
    'sort_leaderboard',
    {
      defaultValue: currentSortByLeaderboard,
      history: 'push',
      shallow: false,
    },
  )
  const [, setTokenAddressesLeaderboard] = useQueryState('ta_leaderboard', {
    defaultValue: currentTokenAddresesLeaderboard,
    history: 'push',
    shallow: false,
  })
  //
  const [, setTpDuration] = useQueryState('ttp_duration', {
    defaultValue: currentDurationTp,
    history: 'push',
    shallow: false,
  })

  useEffect(() => {
    setWidthChartSmartTrader(
      (barChartSmartTraderRef?.current?.clientWidth as number) - 40,
    )
  }, [])

  //
  const leaderboardQuery = useSuspenseQuery(
    useLeaderboardQuery({
      start: currentPageLeaderboard,
      limit: currentPerPageLeaderboard,
      chain: CHAIN,
      token_addresses: currentTokenAddresesLeaderboard,
      sortBy: sortByLeaderboard,
      duration: currentDurationLeaderboard,
    }),
  )
  const dataLeaderboard =
    leaderboardQuery?.data?.leaderboard?.slice(0, 10) || []
  const totalLeaderboard = leaderboardQuery?.data?.total || 1
  //

  const handleRemoveToken = (item: TokenList) => (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const newListToken = listToken.filter(
      (token) => token.tokenAddress !== item.tokenAddress,
    )
    setListToken([...newListToken])
    setTokenAddressesLeaderboard(
      listToken?.map((item) => item.tokenAddress)?.toString() || '',
    )
  }

  const handleChooseTokens = (items: TokenList[]) => {
    setListToken(items)
    setTokenAddressesLeaderboard(
      items?.map((item) => item.tokenAddress)?.toString() || '',
    )
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
                for their exceptional trading metrics. Boltrade uses{' '}
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
          <div className="relative">
            <img src="/images/ai-consolidation.png" alt="" />
            <Glow
              text="Balance"
              size={110}
              className="absolute -top-2 left-[38%] h-[110px] w-[110px]"
            />
            <Glow
              text="% Win"
              size={110}
              className="absolute left-[55%] top-7 h-[110px] w-[110px]"
              classNameText="left-10 top-10"
            />

            <Glow
              text="PnL"
              size={80}
              className="absolute left-[40%] top-[84px] h-[80px] w-[80px]"
              classNameText="top-[26px] left-[30px]"
            />

            <Glow
              text="Risk"
              size={60}
              className="absolute left-[54%] top-[110px] h-[60px] w-[60px]"
              classNameText="top-[18px] left-[23px] text-[10px] leading-4"
            />

            <Glow
              text="ROI"
              size={100}
              className="absolute left-[47%] top-[150px] h-[100px] w-[100px]"
              classNameText="left-[42px] top-9"
            />
          </div>
        </div>
        <div className="z-10 w-1/2">
          <WrapTable
            title="Trading Spotlight"
            icon={
              <div className="rounded-full border border-core bg-[#182317] p-2">
                <IconSpotLight />
              </div>
            }
            childHeader={
              <SelectDurationLeaderboard
                duration={currentDurationTp}
                setDuration={setTpDuration}
                type="option2"
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
          icon={
            <div className="rounded-full border border-core bg-[#182317] p-2">
              <IconBarChart01 />
            </div>
          }
          title="Smart Traders Leaderboard"
          childHeader={
            <div className="flex items-center gap-2">
              <ButtonChooseToken
                listToken={listToken}
                setListToken={handleChooseTokens}
              />
              {listToken?.length > 0 ? (
                <div className="flex items-center gap-2">
                  {listToken.map((item) => (
                    <div
                      className="h-7 rounded-3xl bg-gradient-to-r from-[#9945FF] to-[#14F195] p-px shadow-lg backdrop-blur-[2px]"
                      key={item.tokenAddress}
                    >
                      <div className="flex h-full cursor-pointer items-center justify-center gap-1 rounded-3xl bg-neutral-07 px-4 text-xs leading-5 tracking-normal text-white">
                        <ImageToken
                          imgUrl={item?.imageUrl}
                          symbol={item?.symbol}
                        />
                        <div>{item.symbol}</div>
                        <Close
                          className="h-4 w-4"
                          onclick={handleRemoveToken(item)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
              <SelectDurationLeaderboard
                duration={currentDurationLeaderboard}
                setDuration={setDurationLeaderboard}
                setPage={setPageLeaderboard}
                type="option3"
              />
            </div>
          }
        >
          <div className="mt-4">
            <DataTable
              className="bg-neutral-06 bg-neutral-07/50 text-xs font-bold leading-4 tracking-normal text-gray-300"
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
