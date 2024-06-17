import { DataTable } from '@/components/common/DataTable'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { TokenInfo } from '@/types/tokenInfo'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { TooltipCustom } from '@/components/common/Tooltip'
import InfoIcon from '@/components/shared/icons/dashboard/InfoIcon'
import { useSmartMoneyTransactionQuery } from '@/query/token-explorer/getSmartMoneyTransaction'
import { columnsSmartMoneyTransaction } from '@/components/common/DataTable/columnsSmartMoneyTransaction'
import { useParams } from 'next/navigation'
import { PaginationTable } from '../../Pagination/PaginationTable'
import { SelectTradeValue } from '../../Select/SelectTradeValue'
import { SelectMovement } from '../../Select/SelectMovements'

export const Transactions = ({
  dataTokenInfo,
}: {
  dataTokenInfo?: TokenInfo
}) => {
  const [pageSmartMoneyTransaction, setPageSmartMoneyTransaction] = useState(1)
  const params = useParams<{ token: string }>()
  const CHAIN = useAtomValue(chainAtom)
  const [tradeValue, setTradeValue] = useState<unknown>([])
  const [filterActivity, setFilterActivity] = useState('all')
  //
  const smartMoneyTransactionQuery = useSmartMoneyTransactionQuery({
    limit: 10,
    start: pageSmartMoneyTransaction,
    chain: CHAIN,
    address: params?.token,
    action: filterActivity,
    amount_filter: tradeValue?.toString() || '',
  })
  const dataSmartMoneyTransaction = smartMoneyTransactionQuery.isFetching
    ? [...(Array(10).keys() as any)]
    : smartMoneyTransactionQuery.data?.data.smart_money_tx || []
  const totalSmartMoneyTransaction =
    smartMoneyTransactionQuery?.data?.data?.total || 1
  return (
    <div>
      <div className="flex items-center justify-between mb-4 font-medium">
        <div className="flex items-center gap-2">
          <div className="text-neutral-07 text-xl not-italic font-medium leading-8 tracking-[-0.4px]">
            Smart Money Transactions of
          </div>
          <div className="flex items-center gap-2">
            <ImageToken
              className="w-8 h-8"
              imgUrl={dataTokenInfo?.image_url}
              symbol={dataTokenInfo?.symbol}
            />
            <div className="text-purple-300">{dataTokenInfo?.symbol}</div>
            <TooltipCustom
              className="w-[320px] z-999 bg-neutral-06 text-neutral-02 shadow-sm border-white/10"
              content="Smart Money Transactions"
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
        className="text-xs mt-4 font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
        columns={columnsSmartMoneyTransaction(CHAIN)}
        data={dataSmartMoneyTransaction || []}
        isFetching={smartMoneyTransactionQuery.isFetching}
        noneBorder
        noneBgHeader
        emptyData="No results."
      />
      <PaginationTable
        className="mt-8"
        currentPage={pageSmartMoneyTransaction}
        updatePage={(page: number) => setPageSmartMoneyTransaction(page)}
        pageSize={10}
        total={totalSmartMoneyTransaction}
        setPage={setPageSmartMoneyTransaction}
      />
    </div>
  )
}
