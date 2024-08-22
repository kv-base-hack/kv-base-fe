'use client'

import { ImageToken } from '@/components/common/Image/ImageToken'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import Close from '@/components/shared/icons/Close'
import EmptyTableIcon from '@/components/shared/icons/EmptyTableIcon'
import { cn } from '@/lib/utils'
import { useGetDexTradingSignalQuery } from '@/query/trading-signal/getDexTradingSignal'
import { TokenList } from '@/types/tokenList'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { parseAsInteger, useQueryState } from 'nuqs'
import { CHAIN } from '@/constant/chain'
import { ButtonChooseToken } from '@/components/common/Button/button-choose-token'
import { CardSignal } from './CardAISignal'

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

export const AiTradingSignal = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  const currentPageSignal = parseInt(
    searchParams?.start_signal?.toString() || '1',
  )
  const currentPerPageSignal = parseInt(
    searchParams?.limit_signal?.toString() || '9',
  )
  const currentTypeSignal = searchParams?.type_signal?.toString() || ''
  const currentTASignal = searchParams?.ta_signal?.toString() || ''
  const currentChainSignal = searchParams?.chain_signal?.toString() || CHAIN

  const [, setPageSignal] = useQueryState(
    'start_signal',
    parseAsInteger.withDefault(currentPageSignal).withOptions({
      history: 'push',
      shallow: false,
    }),
  )

  const [activeTab, setActiveTab] = useState<string>('All Strategy')

  const [, setTypeSignal] = useQueryState('type_signal', {
    defaultValue: currentTypeSignal,
    history: 'push',
    shallow: false,
  })

  const [, setTokenAddresses] = useQueryState('ta_signal', {
    defaultValue: currentTypeSignal,
    history: 'push',
    shallow: false,
  })

  const [listToken, setListToken] = useState<TokenList[]>([])

  const dataDexTradingSignalQuery = useQuery(
    useGetDexTradingSignalQuery({
      limit: currentPerPageSignal,
      start: currentPageSignal,
      type: currentTypeSignal,
      token_addresses: currentTASignal,
      chain: currentChainSignal,
    }),
  )

  const dataDexTradingSignal = dataDexTradingSignalQuery.isFetching
    ? [...(Array(9).keys() as any)]
    : dataDexTradingSignalQuery?.data?.data || []

  const total = dataDexTradingSignalQuery?.data?.metadata?.total || 0

  const handleActiveTab = (value: TabProps) => {
    setActiveTab(value.tab)
    setTypeSignal(value.type || '')
  }

  const handleRemoveToken = (item: TokenList) => (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const newListToken = listToken.filter(
      (token) => token.tokenAddress !== item.tokenAddress,
    )
    setTokenAddresses(
      newListToken?.map((item) => item.tokenAddress)?.toString() || '',
    )
    setPageSignal(1)
  }

  const handleSetListToken = (item: TokenList[]) => {
    setListToken(item)
    setTokenAddresses(item?.map((item) => item.tokenAddress)?.toString() || '')
  }

  return (
    <div className="mx-4 mt-2 flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/50 p-6 px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 self-stretch overflow-y-auto text-center font-medium leading-8 tracking-tight text-neutral-03 max-md:flex-wrap max-md:pr-5">
          {tabsSignal.map((item, index) => (
            <div
              key={index}
              onClick={() => handleActiveTab(item)}
              className={cn(
                'cursor-pointer justify-center whitespace-nowrap rounded-3xl px-4 py-1 text-base font-medium leading-8 transition-all duration-300',
                activeTab === item.tab
                  ? 'text-neutral-100'
                  : 'my-auto text-[activeTab] text-neutral-500',
              )}
            >
              {item.tab}
              <div
                className={cn(
                  'mt-2 h-px w-full',
                  activeTab === item.tab
                    ? 'active-tab-gradient'
                    : 'bg-transparent',
                )}
              ></div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ButtonChooseToken
            listToken={listToken}
            setListToken={handleSetListToken}
          />
          {listToken?.length > 0 ? (
            <div className="flex items-center gap-2">
              {listToken.map((item) => (
                <div
                  className="h-9 rounded-3xl bg-gradient-to-r from-[#9945FF] to-[#14F195] p-px shadow-lg backdrop-blur-[2px]"
                  key={item.tokenAddress}
                >
                  <div className="flex h-full cursor-pointer items-center justify-center gap-1 rounded-3xl bg-neutral-07 px-4 text-sm leading-5 tracking-normal text-white">
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

      {dataDexTradingSignalQuery?.isFetching ||
      dataDexTradingSignal?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10">
          <EmptyTableIcon />
          <div className="w-2/3 text-center text-sm font-medium not-italic leading-5 tracking-[-0.14px] text-[#D6D9DC]">
            Currently, there are no trading signals available for this token.
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dataDexTradingSignal?.map((item, index) => (
            <CardSignal
              key={index}
              item={item}
              loading={dataDexTradingSignalQuery.isFetching}
              index={index}
            />
          ))}
        </div>
      )}
      {dataDexTradingSignal.length > 0 && (
        <PaginationTable
          className={cn(
            'mt-4',
            dataDexTradingSignalQuery.isFetching ? 'hidden' : 'visible',
          )}
          currentPage={currentPageSignal}
          pageSize={currentPerPageSignal}
          total={total}
          setPage={setPageSignal}
        />
      )}
    </div>
  )
}
