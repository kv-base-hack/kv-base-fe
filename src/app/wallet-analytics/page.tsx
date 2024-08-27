'use client'

import { DataTable } from '@/components/common/DataTable'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useLeaderboardQuery } from '@/query/leaderboard/getLeaderboard'
import { useState } from 'react'
import SmartMoneyRankingIcon from '@/components/shared/icons/leaderboard/SmartMoneyRankingIcon'
import { DialogSelectToken } from '@/components/common/Dialog/DialogSelectToken'
import { TokenList } from '@/types/tokenList'
import { ImageToken } from '@/components/common/Image/ImageToken'
import Close from '@/components/shared/icons/Close'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { ColumnsLeaderboard } from '@/components/common/DataTable/columnLeaderboard'

export default function WalletAnalytics() {
  const CHAIN = useAtomValue(chainAtom)
  const [pageLeaderboard, setPageLeaderboard] = useState(1)
  const [perPageLeaderboard] = useState(10)
  const [sortBy, setSortBy] = useState('')
  const [listToken, setListToken] = useState<TokenList[]>([])
  // const [duration, setDuration] = useState('24h')
  //
  const dataLeaderboardQuery = useQuery(
    useLeaderboardQuery({
      chain: CHAIN,
      limit: 10,
      start: 1,
      sortBy,
      token_addresses: '',
    }),
  )

  const dataLeaderboard = dataLeaderboardQuery.isFetching
    ? [...(Array(10).keys() as any)]
    : dataLeaderboardQuery.data?.leaderboard?.slice(0, 10) || []
  const totalLeaderboard = dataLeaderboardQuery.data?.total || 1
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
      <div className="mt-8 flex w-full flex-col items-center justify-center">
        <div className="flex w-2/3 flex-col items-center justify-center">
          <div className="inline-block bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-center text-[40px] font-bold not-italic leading-[60px] text-transparent">
            Wallet Analytics
          </div>
          <div className="text-center text-2xl font-normal not-italic leading-9 text-neutral-200">
            In-depth analysis of wallets, highlighting key insights. You can
            enter a Smart Traders wallet in the search bar or find it in the
            Smart Money rankings below
          </div>
          <div className="text-center text-lg font-medium not-italic leading-6 tracking-[-0.36px] text-neutral-400">
            (Currently supporting{' '}
            <Link className="underline" href={'/gem-analytics'}>
              Smart Traders
            </Link>{' '}
            and{' '}
            <Link className="underline" href={'/gem-analytics'}>
              Unusual Buy
            </Link>{' '}
            wallets, with future updates to include all user wallets.)
          </div>
        </div>
      </div>
      {/* table */}
      <div className="m-10 mb-0 pb-10">
        <WrapTable
          icon={<SmartMoneyRankingIcon />}
          title="Smart Traders Leaderboard"
          childHeader={
            <div className="flex items-center gap-2">
              <span>Filter by</span>
              <DialogSelectToken
                listToken={listToken}
                setListToken={setListToken}
              >
                <div className="h-10 rounded-xl bg-gradient-to-r from-[#9945FF] to-[#14F195] p-px shadow-lg backdrop-blur-[2px]">
                  <div className="flex h-full cursor-pointer items-center justify-center rounded-xl bg-neutral-07 px-7 text-sm leading-5 tracking-normal text-white">
                    Specific Token
                  </div>
                </div>
              </DialogSelectToken>
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
            </div>
          }
        >
          <div className="mt-8">
            <DataTable
              className="bg-neutral-06 bg-neutral-07/50 text-xs font-bold leading-4 tracking-normal text-gray-300"
              columns={ColumnsLeaderboard(
                pageLeaderboard,
                perPageLeaderboard,
                setSortBy,
              )}
              data={dataLeaderboard}
              isFetching={dataLeaderboardQuery.isFetching}
              noneBorder
              noneBgHeader
              emptyData="No results."
            />
          </div>
          <PaginationTable
            className="mt-8"
            currentPage={pageLeaderboard}
            pageSize={perPageLeaderboard}
            total={totalLeaderboard}
            setPage={setPageLeaderboard}
          />
        </WrapTable>
      </div>
    </div>
  )
}
