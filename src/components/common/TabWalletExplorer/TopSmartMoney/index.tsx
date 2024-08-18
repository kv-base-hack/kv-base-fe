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

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 font-medium">
        <div className="text-xl font-medium not-italic leading-8 tracking-[-0.4px] text-neutral-07">
          Top Smart Money trading
        </div>
        <div className="flex items-center gap-2">
          <ImageToken
            className="h-8 w-8"
            symbol={dataTokenInfo?.symbol}
            imgUrl={dataTokenInfo?.image_url}
          />
          <div className="text-purple-300">{dataTokenInfo?.symbol}</div>
          <TooltipCustom
            className="z-999 w-[320px] border-white/10 bg-neutral-06 text-neutral-02 shadow-sm"
            content="Top Smart Money Profiting"
          >
            <InfoIcon />
          </TooltipCustom>
        </div>
      </div>
      <DataTable
        className="bg-neutral-06 bg-neutral-07/50 text-xs font-bold leading-4 tracking-normal text-gray-300"
        columns={columnsSmartMoneyRanking(
          pageTopSmartMoneyForToken,
          perPageTopSmartMoneyForToken,
          <ImageToken
            className="h-4 w-4"
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
        pageSize={perPageTopSmartMoneyForToken}
        total={totalTopSmartMoneyForToken}
        setPage={setPageTopSmartMoneyForToken}
      />
    </div>
  )
}
