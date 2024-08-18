import FirstTimeBuyIcon from '@/components/shared/icons/wallet-explorer/FirstTimeBuyIcon'
import { WalletInfoItem, WalletInfoItemTitle } from '../WalletInfoItem'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTradeFirstTimeQuery } from '@/query/wallet-explorer/getUserTradeFirstTime'
import { SelectDuration } from '@/components/common/SelectDuration'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'

export const FirstTimeBuy = ({
  address,
  chain,
}: {
  address: string
  chain: string
}) => {
  const [start, setStart] = useState(1)
  const [duration, setDuration] = useState('72h')

  const tradeStatisticTokensQuery = useQuery(
    useTradeFirstTimeQuery({
      address,
      chain,
      duration,
      token_address: '',
      sort_by: '',
    }),
  )
  const tradeStatisticTokens = tradeStatisticTokensQuery?.data?.first_time_buy

  const getVisibleItems = () => {
    const startIndex = start
    const endIndex = startIndex + 2
    return tradeStatisticTokens?.slice(startIndex, endIndex)
  }

  const totalToken = tradeStatisticTokens?.length || 1

  const dataFirstTimeBuy = tradeStatisticTokensQuery.isFetching
    ? [...(Array(2).keys() as any)]
    : getVisibleItems()

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-full items-center justify-between">
        <WalletInfoItemTitle
          name="First Time Buy"
          icon={<FirstTimeBuyIcon />}
        />
        <SelectDuration duration={duration} setDuration={setDuration} />
      </div>
      {(dataFirstTimeBuy?.length as number) > 0 ? (
        <div className="flex h-full w-full items-center gap-2">
          {dataFirstTimeBuy?.map((token, i) => {
            return (
              <div key={i} className="w-full">
                <WalletInfoItem
                  imgUrl={token.imageUrl}
                  symbol={token.symbol}
                  name={token.name}
                  priceChangeH24={token.priceChangeH24}
                  usdPrice={token.usdPrice}
                  avg_price={token.avg_price}
                  spent={token.volume}
                  roi={token.roi}
                  pnl={token.pnl}
                  address={token.tokenAddress}
                  loading={tradeStatisticTokensQuery.isFetching}
                />
              </div>
            )
          })}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-sm font-semibold text-neutral-03">
          No results
        </div>
      )}
      <PaginationTable
        className="mt-2"
        currentPage={start}
        pageSize={2}
        total={totalToken}
        setPage={setStart}
      />
    </div>
  )
}
