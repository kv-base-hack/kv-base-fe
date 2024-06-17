import { DataTable } from '@/components/common/DataTable'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { TokenInfo } from '@/types/tokenInfo'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { columnsSmartMoneyRanking } from '@/components/common/DataTable/columnsSmartMoneyRanking'
import { TooltipCustom } from '@/components/common/Tooltip'
import InfoIcon from '@/components/shared/icons/dashboard/InfoIcon'
import { useTopSmartMoneyForTokenQuery } from '@/query/token-explorer/getTopSmartMoneyForToken'
import { useParams } from 'next/navigation'
import { PaginationTable } from '../../Pagination/PaginationTable'

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
  console.log(dataTokenInfo)

  return (
    <div>
      <div className="flex items-center mb-4 gap-2 font-medium">
        <div className="text-neutral-07 text-xl not-italic font-medium leading-8 tracking-[-0.4px]">
          Top Smart Money trading
        </div>
        <div className="flex items-center gap-2">
          <ImageToken
            className="w-8 h-8"
            symbol={dataTokenInfo?.symbol}
            imgUrl={dataTokenInfo?.image_url}
          />
          <div className="text-purple-300">{dataTokenInfo?.symbol}</div>
          <TooltipCustom
            className="w-[320px] z-999 bg-neutral-06 text-neutral-02 shadow-sm border-white/10"
            content="Top Smart Money Profiting"
          >
            <InfoIcon />
          </TooltipCustom>
        </div>
      </div>
      <DataTable
        className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
        columns={columnsSmartMoneyRanking(
          pageTopSmartMoneyForToken,
          perPageTopSmartMoneyForToken,
          <ImageToken
            className="w-4 h-4"
            symbol={dataTokenInfo?.symbol}
            imgUrl={dataTokenInfo?.image_url}
          />,
          CHAIN,
        )}
        data={dataTopSmartMoneyProfiting || []}
        isFetching={topSmartMoneyForTokenQuery.isFetching}
        noneBorder
        noneBgHeader
        emptyData="No results."
      />
      <PaginationTable
        className="mt-8"
        currentPage={pageTopSmartMoneyForToken}
        updatePage={(page: number) => setPageTopSmartMoneyForToken(page)}
        pageSize={perPageTopSmartMoneyForToken}
        total={totalTopSmartMoneyForToken}
        setPage={setPageTopSmartMoneyForToken}
      />
    </div>
  )
}
