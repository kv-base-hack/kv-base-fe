import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { DateGroup } from '@/components/common/DateGroup'
import { PaginationCustom } from '@/components/common/Pagination'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { cn } from '@/lib/utils'
import { useCexInQuery } from '@/query/onchain-signal/getCexIn'
import { useCexOutQuery } from '@/query/onchain-signal/getCexOut'
import { useState } from 'react'
import CexWithdrawIcon from '@/components/shared/icons/dashboard/CexWithdrawIcon'
import CexDepositIcon from '@/components/shared/icons/dashboard/CexDepositIcon'
import { DataTable } from '@/components/common/DataTable'
import { columnsCexWithdraw } from '@/components/common/DataTable/columnsCexWithdraw'
import { columnsCexDeposit } from '@/components/common/DataTable/columnsCexDeposit'

type TopCoinProps = {
  className?: string
}

const DATA_DATE = [
  {
    value: '1h',
    label: '1h',
  },
  {
    value: '4h',
    label: '4h',
  },
  {
    value: '24h',
    label: '1D',
  },
  {
    value: '168h',
    label: '3D',
  },
]

export const TopCoin: React.FC<TopCoinProps> = ({ className }) => {
  const [cexInPage, setCexInPage] = useState(1)
  const [cexOutPage, setCexOutPage] = useState(1)
  const [cexOutTab, setCexOutTab] = useState('24h')
  const [cexInTab, setCexInTab] = useState('24h')
  const CHAIN = useAtomValue(chainAtom)

  const cexInQuery = useCexInQuery({
    limit: 5,
    start: cexInPage,
    chain: CHAIN,
    duration: cexInTab,
  })
  const dataCexIn = cexInQuery.data?.data.top_cex_in || []
  const totalCexIn = cexInQuery.data?.data.total || 1

  //
  const cexOutQuery = useCexOutQuery({
    limit: 5,
    start: cexOutPage,
    chain: CHAIN,
    duration: cexOutTab,
  })
  const dataCexOut = cexOutQuery.data?.data.top_cex_out || []
  const totalCexOut = cexOutQuery.data?.data.total || 1
  //

  return (
    <div className={cn('self-stretch', className)}>
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
        <div className="flex flex-col w-1/2 max-md:ml-0 max-md:w-full">
          <WrapTable
            title="CEX Withdraw"
            info="A list of Tokens ranked by net withdrawals to Centralized exchanges. Net deposits are calculated as Withdrawals minus Deposits."
            icon={<CexWithdrawIcon />}
            childHeader={
              <DateGroup dataSource={DATA_DATE} active={cexOutTab} handleActive={setCexOutTab} />
            }>
            <div className="mt-8">
              <DataTable
                className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
                columns={columnsCexWithdraw}
                data={dataCexOut || []}
                isFetching={cexOutQuery.isFetching}
                noneBorder
                noneBgHeader
                emptyData="No results."
              />
            </div>
            <PaginationCustom
              className="mt-8"
              currentPage={cexOutPage}
              updatePage={(page: number) => setCexOutPage(page)}
              pageSize={5}
              total={totalCexOut}
              setPage={setCexOutPage}
            />
          </WrapTable>
        </div>
        <div className="flex flex-col w-1/2 max-md:ml-0 max-md:w-full">
          <WrapTable
            title="CEX Deposit"
            info="A list of Tokens ranked by net deposits to Centralized exchanges. Net deposits are calculated as Deposits minus Withdrawals."
            icon={<CexDepositIcon />}
            childHeader={
              <DateGroup dataSource={DATA_DATE} active={cexInTab} handleActive={setCexInTab} />
            }>
            <div className="mt-8">
              <DataTable
                className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
                columns={columnsCexDeposit}
                data={dataCexIn || []}
                isFetching={cexInQuery.isFetching}
                noneBorder
                noneBgHeader
                emptyData="No results."
              />
            </div>
            <PaginationCustom
              className="mt-8"
              currentPage={cexInPage}
              updatePage={(page: number) => setCexInPage(page)}
              pageSize={5}
              total={totalCexIn}
              setPage={setCexInPage}
            />
          </WrapTable>
        </div>
      </div>
    </div>
  )
}
