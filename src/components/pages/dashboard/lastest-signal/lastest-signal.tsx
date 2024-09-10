'use client'

import { useGetDexTradingSignalQuery } from '@/query/trading-signal/getDexTradingSignal'
import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSuspenseQuery } from '@tanstack/react-query'
import { CHAIN } from '@/constant/chain'
import { CardSignal } from '../../trading-signal/ai-trading-signal/CardAISignal'
import { IconAi } from './icon/icon-ai'

export const LastestSignal = () => {
  const [page] = useState(1)
  const [perPage] = useState(2)
  const [type] = useState<string>('')

  const dataDexTradingSignalQuery = useSuspenseQuery(
    useGetDexTradingSignalQuery({
      limit: perPage,
      start: page,
      token_addresses: '',
      chain: CHAIN,
      type,
    }),
  )

  const dataDexTradingSignal = dataDexTradingSignalQuery?.data?.data || []

  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-2xl border border-white/10 bg-black/50 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full border border-core p-2">
            <IconAi />
          </div>
          Lastest Signal Trading by AI
        </div>
        <Link
          href="/trading-signal"
          className="text-sm font-medium text-core underline"
        >
          See All Signal
        </Link>
      </div>
      {dataDexTradingSignal?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-2/3 text-center text-sm font-medium not-italic leading-5 tracking-[-0.14px] text-[#D6D9DC]">
            Currently, there are no trading signals available for this token.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Suspense fallback={<div>loading...</div>}>
            {dataDexTradingSignal?.map((item, index) => (
              <CardSignal
                key={index}
                item={item}
                loading={dataDexTradingSignalQuery.isFetching}
                index={index}
                className="h-10 w-10"
              />
            ))}
          </Suspense>
        </div>
      )}
    </div>
  )
}
