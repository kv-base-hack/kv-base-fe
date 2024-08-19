import { DataTable } from '@/components/common/DataTable'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { TokenInfo } from '@/types/tokenInfo'
import { useActivitySmartMoneyOfTokenQuery } from '@/query/token-explorer/getActivitySmartMoneyOfToken'
import { useParams } from 'next/navigation'
import { PaginationTable } from '../../Pagination/PaginationTable'
import { columnsActivitySmartMoneyOfToken } from './columns-activity-smart-money-of-token'

export const ActivityOfTopSmartMoney = ({
  dataTokenInfo,
}: {
  dataTokenInfo?: TokenInfo
}) => {
  const [pageActivity, setPageActivity] = useState(1)
  const params = useParams<{ token: string }>()
  const CHAIN = useAtomValue(chainAtom)
  const [tradeValue, setTradeValue] = useState<unknown>([])
  const [filterActivity, setFilterActivity] = useState('all')

  const activityQuery = useActivitySmartMoneyOfTokenQuery({
    limit: 10,
    start: pageActivity,
    chain: CHAIN,
    address: params?.token,
    action: filterActivity,
    amount_filter: tradeValue?.toString() || '',
  })
  const dataActivity = activityQuery.isFetching
    ? [...(Array(10).keys() as any)]
    : activityQuery.data?.data.activities || []
  const totalActivity = activityQuery.data?.data?.total || 1
  //
  return (
    <div className="w-full">
      {/* <div className="flex items-center justify-between mb-4 font-medium w-full">
        <div className="flex items-center gap-2">
          <div className="text-[#F4F4F4] text-xl not-italic font-medium leading-8 tracking-[-0.4px]">
            Activity of Top Smart Money trading
          </div>
          <div className="flex items-center gap-2">
            <ImageToken
              className="w-8 h-8"
              imgUrl={dataTokenInfo?.image_url}
              symbol={dataTokenInfo?.symbol}
            />
            <div className="text-purple-300">{dataTokenInfo?.symbol}</div>
            <TooltipCustom
              className="max-w-[210px] z-[999] bg-neutral-06 text-neutral-02 shadow-sm border-white/10"
              content="Lists other activities at least 5k$ of smart money when trading this token."
            >
              <InfoIcon />
            </TooltipCustom>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SelectTradeValue
            valueSelected={tradeValue}
            setValueSelected={setTradeValue}
            setPage={setPageActivity}
          />
          <SelectMovement
            movement={filterActivity}
            setMovement={setFilterActivity}
            setPage={setPageActivity}
          />
        </div>
      </div> */}
      <DataTable
        className="w-full bg-neutral-06 bg-neutral-07/50 text-xs font-bold leading-4 tracking-normal text-gray-300"
        columns={columnsActivitySmartMoneyOfToken}
        data={dataActivity || []}
        isFetching={activityQuery.isFetching}
        noneBorder
        noneBgHeader
        emptyData="No results."
      />
      <PaginationTable
        className="mt-4"
        currentPage={pageActivity}
        pageSize={10}
        total={totalActivity}
        setPage={setPageActivity}
      />
    </div>
  )
}
