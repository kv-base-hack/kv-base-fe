import { CardCommon } from '@/components/common/Card/CardCommon'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import { cn } from '@/lib/utils'
import { useGetDexTradingSignalQuery } from '@/query/trading-signal/getDexTradingSignal'
import { useState } from 'react'
import { CardAISignal } from './CardAISignal'
import Close from '@/components/shared/icons/Close'
import { TokenList } from '@/types/tokenList'
import { useQuery } from '@tanstack/react-query'
import { DialogSelectToken } from '@/components/common/SelectTokens/DialogSelectTokens'
import { useAtomValue } from 'jotai'
import { chainAtom } from '@/atom/chain'

interface TabProps {
  tab: string
  type?: string
}

const tabsSignal = [
  {
    tab: 'All Strategy',
  },
  {
    tab: 'AI Unusual Buy',
    type: 'unusual_buy',
  },
  {
    tab: 'AI New Listings Buy',
    type: 'new_listing_buy',
  },
  {
    tab: 'AI Top Buys',
    type: 'top_smart_money_buy',
  },
]

export const AiTradingSignal = () => {
  const [page, setPage] = useState(1)
  const [perPage] = useState(8)
  const [activeTab, setActiveTab] = useState<string>('All Strategy')
  const [type, setType] = useState<string>()
  const [listToken, setListToken] = useState<TokenList[]>([])
  const CHAIN = useAtomValue(chainAtom)

  const dataDexTradingSignalQuery = useQuery(
    useGetDexTradingSignalQuery({
      limit: perPage,
      start: page,
      type,
      addresses: listToken?.map((item) => item.tokenAddress)?.toString() || '',
      chain: CHAIN,
    }),
  )

  const dataDexTradingSignal = dataDexTradingSignalQuery.isFetching
    ? [...(Array(8).keys() as any)]
    : dataDexTradingSignalQuery?.data?.data?.data || []

  const total = dataDexTradingSignalQuery?.data?.data?.metadata?.total || 0

  const handleActiveTab = (value: TabProps) => {
    setActiveTab(value.tab)
    setType(value.type)
  }

  const handleRemoveToken = (item: TokenList) => (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const newListToken = listToken.filter(
      (token) => token.tokenAddress !== item.tokenAddress,
    )
    setListToken([...newListToken])
  }

  return (
    <CardCommon>
      <p className="text-[32px] font-normal leading-[48px] text-neutral-07">
        Trading Signal By AI
      </p>
      <div className="flex items-center justify-between">
        <div className="flex gap-4 self-stretch overflow-y-auto py-2 text-center font-medium leading-8 tracking-tight max-md:flex-wrap max-md:pr-5">
          {tabsSignal.map((item, index) => (
            <div
              key={index}
              onClick={() => handleActiveTab(item)}
              className={cn(
                'cursor-pointer justify-center whitespace-nowrap rounded-lg border border-solid px-4 py-2 !text-xl font-medium not-italic leading-8 transition-all duration-300 hover:bg-neutral-03 hover:text-neutral-07',
                activeTab === item.tab
                  ? 'tab-find-gems border-[#FEFEFE] bg-neutral-03 text-neutral-07'
                  : 'border-transparent text-neutral-04',
              )}
            >
              {item.tab}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <DialogSelectToken listToken={listToken} setListToken={setListToken}>
            <div className="h-10 rounded-xl bg-gradient-to-r from-[#9945FF] to-[#14F195] p-px shadow-lg backdrop-blur-[2px]">
              <div className="flex h-full cursor-pointer items-center justify-center rounded-xl bg-neutral-01 px-7 text-sm leading-5 tracking-normal text-neutral-07">
                Specific Token
              </div>
            </div>
          </DialogSelectToken>
          {listToken?.length > 0 ? (
            <div className="flex items-center gap-2">
              {listToken.map((item) => (
                <div
                  className="h-9 rounded-3xl bg-gradient-to-r from-[#9945FF] to-[#14F195] p-px shadow-lg backdrop-blur-[2px]"
                  key={item.tokenAddress}
                >
                  <div className="flex h-full cursor-pointer items-center justify-center gap-1 rounded-3xl bg-neutral-01 px-4 text-sm leading-5 tracking-normal text-neutral-07">
                    <ImageToken imgUrl={item?.imageUrl} symbol={item?.symbol} />
                    <div>{item.symbol}</div>
                    <Close onclick={handleRemoveToken(item)} />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4">
        {dataDexTradingSignal?.map((item, index) => (
          <CardAISignal
            key={index}
            item={item}
            loading={dataDexTradingSignalQuery.isFetching}
            index={index}
          />
        ))}
      </div>
      <PaginationTable
        className={cn(
          'mt-4',
          dataDexTradingSignalQuery.isFetching ? 'hidden' : 'visible',
        )}
        currentPage={page}
        pageSize={perPage}
        total={total}
        setPage={setPage}
      />
    </CardCommon>
  )
}
