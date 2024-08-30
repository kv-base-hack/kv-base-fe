import { DataTable } from '@/components/common/DataTable'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import { useTradeActivityQuery } from '@/query/wallet-explorer/getTradeActivity'
import { TokenList } from '@/types/tokenList'
import { useState } from 'react'
import { columnsActivityWalletDetail } from './columns-activity-wallet-detail'

type BigTradeActivityProps = {
  address: string
  chain: string
  hideSmallTrade: boolean
}

export const BigTradeActivity: React.FC<BigTradeActivityProps> = ({
  address,
  chain,
  hideSmallTrade,
}) => {
  const [pageActivity, setPageActivity] = useState(1)
  const [filterActivity, setFilterActivity] = useState('all')
  const [listToken, setListToken] = useState<TokenList[]>([])
  const [tradeValue, setTradeValue] = useState<unknown>([])
  // get data Big Trade Activity
  const activityQuery = useTradeActivityQuery({
    action: filterActivity,
    limit: 10,
    start: pageActivity,
    chain,
    address,
    amount_filter: tradeValue?.toString() || '',
    is_big_trade_only: hideSmallTrade,
    token_address:
      listToken?.map((item) => item.tokenAddress)?.toString() || '',
  })

  const dataActivity = activityQuery.isFetching
    ? [...(Array(10).keys() as any)]
    : activityQuery.data?.data.activities || []
  const totalActivity = activityQuery.data?.data.total || 1

  return (
    <div>
      
      <div>
        <DataTable
          className="bg-neutral-06 bg-neutral-07/50 text-xs font-normal leading-4 tracking-normal text-gray-300"
          columns={columnsActivityWalletDetail}
          data={dataActivity?.slice(0, 10) || []}
          isFetching={activityQuery.isFetching}
          noneBorder
          noneBgHeader
          emptyData="No results."
        />
      </div>
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
