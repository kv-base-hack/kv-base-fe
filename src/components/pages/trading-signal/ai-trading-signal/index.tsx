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
      <p className="text-neutral-07 text-[32px] leading-[48px] font-normal">
        Trading Signal By AI
      </p>
      <div className="flex items-center justify-between">
        <div className="flex overflow-y-auto gap-4 self-stretch py-2 font-medium tracking-tight leading-8 text-center max-md:flex-wrap max-md:pr-5">
          {tabsSignal.map((item, index) => (
            <div
              key={index}
              onClick={() => handleActiveTab(item)}
              className={cn(
                'cursor-pointer whitespace-nowrap transition-all duration-300 justify-center px-4 py-2 rounded-lg !text-xl not-italic font-medium leading-8 border border-solid hover:bg-neutral-03 hover:text-neutral-07',
                activeTab === item.tab
                  ? 'tab-find-gems text-neutral-07 bg-neutral-03 border-[#FEFEFE]'
                  : 'text-neutral-04 border-transparent',
              )}
            >
              {item.tab}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <DialogSelectToken listToken={listToken} setListToken={setListToken}>
            <div className="rounded-xl h-10 p-px bg-gradient-to-r from-[#9945FF] to-[#14F195] shadow-lg backdrop-blur-[2px]">
              <div className="text-neutral-07 cursor-pointer rounded-xl flex items-center justify-center px-7 h-full text-sm tracking-normal leading-5 bg-neutral-01">
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
                  <div className="text-neutral-07 cursor-pointer rounded-3xl flex items-center justify-center px-4 gap-1 h-full text-sm tracking-normal leading-5 bg-neutral-01">
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4">
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
