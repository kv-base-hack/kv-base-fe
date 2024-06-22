import FirstTimeBuyIcon from '@/components/shared/icons/wallet-explorer/FirstTimeBuyIcon'
import { WalletInfoItem, WalletInfoItemTitle } from '../WalletInfoItem'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTradeFirstTimeQuery } from '@/query/wallet-explorer/getUserTradeFirstTime'
import { SelectDuration } from '@/components/common/SelectDuration'

export const FirstTimeBuy = ({
  address,
  chain,
}: {
  address: string
  chain: string
}) => {
  const [start, setStart] = useState(0)
  const [page, setPage] = useState(1)
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
  const totalPage = Math.ceil(totalToken / 2)

  const nextPage = () => {
    if (page < totalPage) {
      setStart(start + 2)
      setPage(page + 1)
    }
  }

  const prevPage = () => {
    if (page > 1) {
      setStart(start - 2)
      setPage(page - 1)
    }
  }

  const dataFirstTimeBuy = tradeStatisticTokensQuery.isFetching
    ? [...(Array(3).keys() as any)]
    : getVisibleItems()

  return (
    <div className="flex w-full flex-col h-full">
      <div className="flex items-center justify-between h-full">
        <WalletInfoItemTitle
          name="First Time Buy"
          icon={<FirstTimeBuyIcon />}
        />
        <SelectDuration duration={duration} setDuration={setDuration} />
      </div>
      {(dataFirstTimeBuy?.length as number) > 0 ? (
        <div className="flex flex-col items-start h-full justify-between">
          {dataFirstTimeBuy?.map((token, i) => {
            return (
              <WalletInfoItem
                key={i}
                imgUrl={token.imageUrl}
                symbol={token.symbol}
                name={token.name}
                usdPrice={token.usdPrice}
                avg_price={token.avg_price}
                spent={token.volume}
                roi={token.roi}
                pnl={token.pnl}
                address={token.tokenAddress}
                loading={tradeStatisticTokensQuery.isFetching}
              />
            )
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full font-semibold text-sm text-neutral-03">
          No results
        </div>
      )}
    </div>
  )
}
