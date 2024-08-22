import { DataTable } from '@/components/common/DataTable'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { TokenInfo } from '@/types/tokenInfo'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { useTopSmartMoneyForTokenQuery } from '@/query/token-explorer/getTopSmartMoneyForToken'
import { PaginationTable } from '../../Pagination/PaginationTable'
import { useQuery } from '@tanstack/react-query'
import { parseAsInteger, useQueryState } from 'nuqs'
import { columnsSmartMoneyRanking } from './columns-smart-money-ranking'

export const TopSmartMoney = ({
  dataTokenInfo,
  params,
  searchParams,
}: {
  dataTokenInfo?: TokenInfo
  params: { token: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  const currentPage = parseInt(searchParams?.smft_start?.toString() || '1')
  const currentPerPage = parseInt(searchParams?.smft_limit?.toString() || '10')

  const [, setPage] = useQueryState(
    'smft_start',
    parseAsInteger.withDefault(currentPage).withOptions({
      history: 'push',
      shallow: false,
    }),
  )

  const CHAIN = useAtomValue(chainAtom)
  //
  const topSmartMoneyForTokenQuery = useQuery(
    useTopSmartMoneyForTokenQuery({
      limit: currentPerPage,
      start: currentPage,
      chain: CHAIN,
      address: params?.token,
    }),
  )
  const dataTopSmartMoneyProfiting = topSmartMoneyForTokenQuery.isFetching
    ? [...(Array(10).keys() as any)]
    : topSmartMoneyForTokenQuery?.data?.smart_money_for_token || []
  const totalTopSmartMoneyForToken =
    topSmartMoneyForTokenQuery?.data?.total || 1
  //
  return (
    <div>
      <DataTable
        className="bg-neutral-06 bg-neutral-07/50 text-xs font-bold leading-4 tracking-normal text-gray-300"
        columns={columnsSmartMoneyRanking(
          currentPage,
          currentPerPage,
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
        currentPage={currentPage}
        pageSize={currentPerPage}
        total={totalTopSmartMoneyForToken}
        setPage={setPage}
      />
    </div>
  )
}
