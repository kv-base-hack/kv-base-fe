'use client'

import { DataTable } from '@/components/common/DataTable'
import { GroupHeader } from '@/components/common/GroupHeader'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import SmartmoneyActivityIcon from '@/components/shared/icons/activity/SmartmoneyActivityIcon'
import { columnsActivity } from '@/components/common/DataTable/columnsActivity'
import { useTopActivityQuery } from '@/query/onchain-signal/getTopActivity'
import { SelectMovement } from '@/components/common/Select/SelectMovements'
import { SelectTradeValue } from '@/components/common/Select/SelectTradeValue'
import { DialogSelectToken } from '@/components/common/Dialog/DialogSelectToken'
import { TokenList } from '@/types/tokenList'
import { ImageToken } from '@/components/common/Image/ImageToken'
import Close from '@/components/shared/icons/Close'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'

export default function Tracking() {
  const CHAIN = useAtomValue(chainAtom)
  const [pageActivity, setPageActivity] = useState(1)
  const [listToken, setListToken] = useState<TokenList[]>([])
  const [filterActivity, setFilterActivity] = useState('all')
  const [tradeValue, setTradeValue] = useState<unknown>([])
  const [sortBy, setSortBy] = useState('')

  const activityQuery = useTopActivityQuery({
    action: filterActivity,
    limit: 10,
    start: pageActivity,
    chain: CHAIN,
    amount_filter: tradeValue?.toString() || '',
    token_addresses:
      listToken?.map((item) => item.tokenAddress)?.toString() || '',
    sort_by: sortBy,
  })
  const dataActivity = activityQuery.isFetching
    ? [...(Array(10).keys() as any)]
    : activityQuery.data?.data.activities || []
  const totalActivity = activityQuery.data?.data.total || 1
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
      <GroupHeader
        className="mt-10 mx-10 max-md:mt-5 max-md:mx-5"
        icon={<SmartmoneyActivityIcon />}
        title="Smart Money Tracking"
      ></GroupHeader>
      <div className="flex mx-10 mt-4 gap-4 justify-start max-md:flex-wrap">
        <div className="my-auto text-base tracking-normal leading-6 text-zinc-50">
          Filter by
        </div>
        <div className="flex items-center gap-2">
          <DialogSelectToken listToken={listToken} setListToken={setListToken}>
            <div className="rounded-3xl h-10 p-px bg-gradient-to-r from-[#9945FF] to-[#14F195] shadow-lg backdrop-blur-[2px]">
              <div className="bg-neutral-07 cursor-pointer rounded-3xl flex items-center justify-center px-7 h-full text-sm tracking-normal leading-5 text-white">
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
                    <ImageToken imgUrl={item?.imageUrl} symbol={item?.symbol} />
                    <div>{item.symbol}</div>
                    <Close onclick={handleRemoveToken(item)} />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <SelectTradeValue
          valueSelected={tradeValue}
          setValueSelected={setTradeValue}
        />
        <SelectMovement
          movement={filterActivity}
          setMovement={setFilterActivity}
        />
      </div>
      <div className="m-10 mb-0 pb-10">
        <div className="'flex flex-col justify-center self-stretch p-6 font-semibold rounded-lg border border-solid shadow-2xl backdrop-blur-lg bg-neutral-07/50 bg-opacity-50 border-white/10 leading-[160%] max-md:px-5'">
          <DataTable
            className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
            columns={columnsActivity(setSortBy)}
            data={dataActivity}
            isFetching={activityQuery.isFetching}
            noneBorder
            noneBgHeader
            emptyData="No results."
          />
          <PaginationTable
            className="mt-8"
            currentPage={pageActivity}
            updatePage={(page: number) => setPageActivity(page)}
            pageSize={10}
            total={totalActivity}
            setPage={setPageActivity}
          />
        </div>
      </div>
    </div>
  )
}
