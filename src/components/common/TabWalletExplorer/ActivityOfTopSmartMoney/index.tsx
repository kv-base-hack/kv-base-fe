import { DataTable } from '@/components/common/DataTable'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { TokenInfo } from '@/types/tokenInfo'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { TooltipCustom } from '@/components/common/Tooltip'
import InfoIcon from '@/components/shared/icons/dashboard/InfoIcon'
import { useActivitySmartMoneyOfTokenQuery } from '@/query/token-explorer/getActivitySmartMoneyOfToken'
import { columnsActivitySmartMoneyOfToken } from '@/components/common/DataTable/columnsActivitySmartMoneyOfToken'
import { useParams } from 'next/navigation'
import { PaginationTable } from '../../Pagination/PaginationTable'
import { SelectTradeValue } from '../../Select/SelectTradeValue'
import { SelectMovement } from '../../Select/SelectMovements'

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
      <div className="mb-4 flex w-full items-center justify-between font-medium">
        <div className="flex items-center gap-2">
          <div className="text-xl font-medium not-italic leading-8 tracking-[-0.4px] text-neutral-07">
            Activity of Top Smart Money trading
          </div>
          <div className="flex items-center gap-2">
            <ImageToken
              className="h-8 w-8"
              imgUrl={dataTokenInfo?.image_url}
              symbol={dataTokenInfo?.symbol}
            />
            <div className="text-purple-300">{dataTokenInfo?.symbol}</div>
            <TooltipCustom
              className="z-999 w-[320px] border-white/10 bg-neutral-06 text-neutral-02 shadow-sm"
              content="Activity of Top Smart Money Profiting"
            >
              <InfoIcon />
            </TooltipCustom>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SelectTradeValue
            valueSelected={tradeValue}
            setValueSelected={setTradeValue}
          />
          <SelectMovement
            movement={filterActivity}
            setMovement={setFilterActivity}
          />
        </div>
      </div>
      <DataTable
        className="w-full bg-neutral-06 bg-neutral-07/50 text-xs font-bold leading-4 tracking-normal text-gray-300"
        columns={columnsActivitySmartMoneyOfToken(CHAIN)}
        data={dataActivity || []}
        isFetching={activityQuery.isFetching}
        noneBorder
        noneBgHeader
        emptyData="No results."
      />
      <PaginationTable
        className="mt-8"
        currentPage={pageActivity}
        pageSize={10}
        total={totalActivity}
        setPage={setPageActivity}
      />
    </div>
  )
}
