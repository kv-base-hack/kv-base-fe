'use client'

import { DataTable } from '@/components/common/DataTable'
import { columnsLeaderboard } from '@/components/common/DataTable/columnLeaderboard'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { GroupHeader } from '@/components/common/GroupHeader'
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
    <div className="w-full h-full">
      {/* header */}
      <div className="w-full flex flex-col justify-center items-center mt-8">
        <div className="w-2/3 flex flex-col justify-center items-center">
          <div className="text-center text-[40px] not-italic font-bold leading-[60px] bg-gradient-to-r from-[#9945FF] to-[#14F195] inline-block text-transparent bg-clip-text">
            Wallet Analytics
          </div>
          <div className="text-center text-2xl not-italic font-normal leading-9 text-neutral-200">
            In-depth analysis of wallets, highlighting key insights. You can
            enter a Smart Money wallet in the search bar or find it in the Smart
            Money rankings below
          </div>
          <div className="text-neutral-400 text-center text-lg not-italic font-medium leading-6 tracking-[-0.36px]">
            (Currently supporting{' '}
            <Link className="underline" href={'/gem-analytics'}>
              Smart Money
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
          title="Smart Money Leaderboard"
          childHeader={
            <div className="flex items-center gap-2">
              <span>Filter by</span>
              <DialogSelectToken
                listToken={listToken}
                setListToken={setListToken}
              >
                <div className="rounded-xl h-10 p-px bg-gradient-to-r from-[#9945FF] to-[#14F195] shadow-lg backdrop-blur-[2px]">
                  <div className="bg-neutral-07 cursor-pointer rounded-xl flex items-center justify-center px-7 h-full text-sm tracking-normal leading-5 text-white">
                    Specific Token
                  </div>
                </div>
              </DialogSelectToken>
              {listToken?.length > 0 ? (
                <div className="flex items-center gap-2">
                  {listToken.map((item) => (
                    <div
                      className="rounded-3xl h-9 p-px bg-gradient-to-r from-[#9945FF] to-[#14F195] shadow-lg backdrop-blur-[2px]"
                      key={item.tokenAddress}
                    >
                      <div className="bg-neutral-07 cursor-pointer rounded-3xl flex items-center justify-center px-4 gap-1 h-full text-sm tracking-normal leading-5 text-white">
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
              className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
              columns={columnsLeaderboard(
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
            updatePage={(page: number) => setPageLeaderboard(page)}
            pageSize={perPageLeaderboard}
            total={totalLeaderboard}
            setPage={setPageLeaderboard}
          />
        </WrapTable>
      </div>
    </div>
  )
}
