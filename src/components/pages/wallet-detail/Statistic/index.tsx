import { DataTable } from '@/components/common/DataTable'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { columnsTradeStatisticToken } from '@/components/common/DataTable/columnsTradeStatisticToken'
import { DialogSelectToken } from '@/components/common/Dialog/DialogSelectToken'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import { SelectDuration } from '@/components/common/Select/SelectDuration'
import Close from '@/components/shared/icons/Close'
import TradeStatisticIcon from '@/components/shared/icons/wallet-explorer/TradeStatisticIcon'
import { useTradeStatisticTokensQuery } from '@/query/wallet-explorer/getTradeStatisticTokens'
import { TokenList } from '@/types/tokenList'
import { useState } from 'react'

type StatisticProps = {
  address: string
  chain: string
}

export const Statistic: React.FC<StatisticProps> = ({ address, chain }) => {
  const [filterDate, setFilterDate] = useState('24h')
  const [listToken, setListToken] = useState<TokenList[]>([])
  const [sort, setSort] = useState('')

  const tradeStatisticTokensQuery = useTradeStatisticTokensQuery({
    address,
    chain,
    duration: filterDate,
    token_address:
      listToken?.map((item) => item.tokenAddress)?.toString() || '',
    sort_by: sort,
  })
  const tradeStatisticTokens = tradeStatisticTokensQuery?.data?.data

  // pagination portfolio in FE
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)

  const totalPages = tradeStatisticTokens?.token_stats?.length || 0

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleRemoveToken = (item: TokenList) => (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const newListToken = listToken.filter(
      (token) => token.tokenAddress !== item.tokenAddress,
    )
    setListToken([...newListToken])
  }

  const getVisibleItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return tradeStatisticTokens?.token_stats?.slice(startIndex, endIndex)
  }

  const dataSource = tradeStatisticTokensQuery?.isFetching
    ? [...(Array(6).keys() as any)]
    : getVisibleItems() || []

  return (
    <WrapTable
      className="justify-start"
      icon={<TradeStatisticIcon />}
      title={<div className="whitespace-nowrap">Trades Statistics</div>}
      childHeader={
        <div className="flex items-center gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <DialogSelectToken
              listToken={listToken}
              setListToken={setListToken}
            >
              <div className="rounded-3xl h-10 p-px bg-gradient-to-r from-[#9945FF] to-[#14F195] shadow-lg backdrop-blur-[2px]">
                <div className="bg-neutral-07 whitespace-nowrap cursor-pointer rounded-3xl flex items-center justify-center px-7 h-full text-sm tracking-normal leading-5 text-white">
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
                      <ImageToken
                        imgUrl={item?.imageUrl}
                        symbol={item?.symbol}
                      />
                      <div>{item.symbol}</div>
                      <Close onclick={handleRemoveToken(item)} />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <SelectDuration duration={filterDate} setDuration={setFilterDate} />
        </div>
      }
    >
      <div className="mt-8">
        <DataTable
          className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
          columns={columnsTradeStatisticToken(setSort)}
          data={dataSource}
          noneBorder
          noneBgHeader
          emptyData="No results."
          isFetching={tradeStatisticTokensQuery?.isFetching}
        />
        <PaginationTable
          className="mt-8"
          currentPage={currentPage}
          updatePage={(page: number) => handlePageChange(page)}
          pageSize={itemsPerPage}
          total={totalPages}
          setPage={setCurrentPage}
        />
      </div>
    </WrapTable>
  )
}
