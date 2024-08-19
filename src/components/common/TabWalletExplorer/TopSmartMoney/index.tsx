import { DataTable } from '@/components/common/DataTable'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { TokenInfo } from '@/types/tokenInfo'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { useTopSmartMoneyForTokenQuery } from '@/query/token-explorer/getTopSmartMoneyForToken'
import { useParams } from 'next/navigation'
import { PaginationTable } from '../../Pagination/PaginationTable'
import { columnsSmartMoneyRanking } from './columns-smart-money-ranking'

export const TopSmartMoney = ({
  dataTokenInfo,
}: {
  dataTokenInfo?: TokenInfo
}) => {
  const [pageTopSmartMoneyForToken, setPageTopSmartMoneyForToken] = useState(1)
  const [perPageTopSmartMoneyForToken] = useState(10)
  const params = useParams<{ token: string }>()
  const CHAIN = useAtomValue(chainAtom)
  //
  const topSmartMoneyForTokenQuery = useTopSmartMoneyForTokenQuery({
    limit: perPageTopSmartMoneyForToken,
    start: pageTopSmartMoneyForToken,
    chain: CHAIN,
    address: params?.token,
  })
  const dataTopSmartMoneyProfiting = topSmartMoneyForTokenQuery.isFetching
    ? [...(Array(10).keys() as any)]
    : topSmartMoneyForTokenQuery?.data?.data?.smart_money_for_token || []
  const totalTopSmartMoneyForToken =
    topSmartMoneyForTokenQuery.data?.data.total || 1
  //
  return (
    <div>
      <DataTable
        className="bg-neutral-06 bg-neutral-07/50 text-xs font-bold leading-4 tracking-normal text-gray-300"
        columns={columnsSmartMoneyRanking(
          pageTopSmartMoneyForToken,
          perPageTopSmartMoneyForToken,
          <ImageToken
            className="h-4 w-4"
            imgUrl={dataTokenInfo?.image_url}
            symbol={dataTokenInfo?.symbol}
          />,
        )}
        data={dataTopSmartMoneyProfiting || []}
        isFetching={topSmartMoneyForTokenQuery.isFetching}
        noneBorder
        noneBgHeader
        emptyData="No results."
      />
      <PaginationTable
        className="mt-4"
        currentPage={pageTopSmartMoneyForToken}
        pageSize={perPageTopSmartMoneyForToken}
        total={totalTopSmartMoneyForToken}
        setPage={setPageTopSmartMoneyForToken}
      />
    </div>
  )
}
