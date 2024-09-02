'use client'

import Close from '@/components/shared/icons/Close'
import SearchIcon from '@/components/shared/icons/SearchIcon'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useTokenListQuery } from '@/query/token-explorer/getListToken'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'

import { ImageToken } from '@/components/common/Image/ImageToken'
import { formatPriceNumber } from '@/lib/utils/formatPriceNumber'
import { TokenList } from '@/types/tokenList'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { renderPrice } from '@/lib/utils/renderPrice'

export function DialogSelectToken({
  children,
  action = 'default',
  listToken,
  setListToken,
}: {
  children?: React.ReactNode
  action?: string
  listToken?: TokenList[]
  setListToken?: (listToken: TokenList[]) => void
}) {
  const [tokens, setTokens] = useState<TokenList[]>(listToken || [])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setTokens(listToken || [])
  }, [listToken])
  //
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [debounceSearch, setDebounceSearch] = useState('')
  const CHAIN = useAtomValue(chainAtom)

  const listTokenQuery = useQuery({
    ...useTokenListQuery({
      symbol_search: debounceSearch,
      chain: CHAIN,
    }),
    enabled: open,
  })
  const listTokenData = listTokenQuery.data?.tokens || []

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  useDebounce(
    () => {
      setDebounceSearch(search)
    },
    300,
    [search],
  )

  const handleNavigte = (token: TokenList) => () => {
    router.push(`/smartmoney-onchain/token-explorer/${token.token_address}`)
  }

  const handleSelectToken = (token: TokenList) => () => {
    if (action === 'default') {
      const tmp = [...tokens]
      const index = tmp.findIndex(
        (item) => item.token_address === token.token_address,
      )
      if (index !== -1) {
        tmp.splice(index, 1)
      } else {
        tmp.push(token)
      }
      setTokens([...tmp])
    }
  }

  const handleApplySelect = (e: any) => {
    if (tokens.length === 0) {
      e.preventDefault()
    }
    if (setListToken && tokens.length > 0) {
      setListToken([...tokens])
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="z-[999999] max-w-[433px] overflow-hidden rounded-[20px] !p-0">
        <div className="flex max-w-[510px] flex-col rounded-[20px] border-none border-white/10 bg-black/50 py-4">
          <div className="flex w-full justify-between gap-5 px-4 text-xl font-bold leading-7 tracking-tight text-zinc-100 max-md:max-w-full max-md:flex-wrap max-md:pl-5">
            <div />
            <div className="flex justify-center font-sans text-xl font-medium not-italic leading-8 tracking-[-0.4px] text-[#F4F4F4]">
              Choose Tokens
            </div>
            <DialogClose>
              <Close />
            </DialogClose>
          </div>
          <div className="mt-4 flex flex-col justify-center px-4 text-base leading-6 tracking-tight text-gray-500 max-md:max-w-full">
            <div className="flex justify-start gap-2 rounded-3xl border-white/10 bg-white/10 px-3 py-2 max-md:max-w-full max-md:flex-wrap">
              <SearchIcon />
              <input
                placeholder="Search for tokens, address,..."
                className="h-6 w-full bg-transparent font-normal text-disabled outline-none focus:outline-none"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="relative h-[500px] overflow-y-auto px-4 pb-16">
            {listTokenData?.map((token, index) =>
              token.token_address && action === 'navigate' ? (
                <DialogClose key={index} className="w-full cursor-pointer">
                  <div
                    onClick={handleNavigte(token)}
                    className="mt-4 flex justify-between rounded-xl bg-zinc-800 p-2 max-md:max-w-full max-md:flex-wrap"
                  >
                    <div className="flex justify-between gap-4 whitespace-nowrap">
                      <ImageToken
                        symbol={token?.symbol}
                        imgUrl={token?.image_url}
                      />
                      <div className="flex flex-1 flex-col items-start">
                        <div className="text-base font-bold leading-6 tracking-normal text-zinc-100">
                          {token.symbol}
                        </div>
                        <div className="text-sm leading-4 tracking-normal text-gray-300">
                          {token.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col items-end justify-center whitespace-nowrap">
                      <div className="self-end text-base font-bold leading-6 tracking-normal text-zinc-100">
                        {renderPrice(token.usd_price)}
                      </div>
                      <div className="flex items-center justify-between gap-2 text-sm leading-4 tracking-normal">
                        {token.price_24h === 0 ? (
                          <div className="text-sm not-italic leading-5 text-neutral-dark-03">
                            -
                          </div>
                        ) : (
                          <div
                            className={cn(
                              'text-sm not-italic leading-5 text-neutral-dark-03',
                              token.price_24h > 0
                                ? 'text-green'
                                : 'text-error-500',
                            )}
                          >
                            {token.price_24h > 0 ? '+' : ''}
                            {token.price_24h.toFixed(2)}%
                          </div>
                        )}
                        <div className="">24h</div>
                      </div>
                    </div>
                  </div>
                </DialogClose>
              ) : (
                <div
                  key={index}
                  className={cn(
                    'mt-4 p-px',
                    tokens?.find(
                      (item) => item.token_address === token.token_address,
                    )
                      ? 'z-0 rounded-xl bg-gradient-to-b from-[#9945FF] to-[#14F195]'
                      : 'rounded-xl hover:bg-white/5',
                  )}
                >
                  <div
                    onClick={handleSelectToken(token)}
                    className={cn(
                      'z-1 flex h-full w-full cursor-pointer justify-between rounded-xl',
                      tokens?.find(
                        (item) => item.token_address === token.token_address,
                      )
                        ? 'bg-black/90'
                        : '',
                    )}
                  >
                    <div
                      className={cn(
                        'z-1 flex h-full w-full cursor-pointer justify-between rounded-xl p-2',
                        tokens?.find(
                          (item) => item.token_address === token.token_address,
                        )
                          ? 'bg-[#15ffab0d]'
                          : 'bg-transparent',
                      )}
                    >
                      <div className="flex justify-between gap-4 whitespace-nowrap">
                        <ImageToken
                          imgUrl={token?.image_url}
                          symbol={token?.symbol}
                        />
                        <div className="flex flex-1 flex-col">
                          <div className="text-base font-bold leading-6 tracking-normal text-zinc-100">
                            {token.symbol}
                          </div>
                          <div className="text-sm leading-4 tracking-normal text-gray-300">
                            {token.name}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col items-end justify-center whitespace-nowrap">
                        <div className="self-end text-base font-bold leading-6 tracking-normal text-zinc-100">
                          {formatPriceNumber(token.usd_price)}
                        </div>
                        <div className="flex items-center justify-between gap-2 text-sm leading-4 tracking-normal">
                          {token.price_24h === 0 ? (
                            <div className="text-sm not-italic leading-5 text-neutral-dark-03">
                              -
                            </div>
                          ) : (
                            <div
                              className={cn(
                                'text-sm not-italic leading-5 text-neutral-dark-03',
                                token.price_24h > 0
                                  ? 'text-green'
                                  : 'text-error-500',
                              )}
                            >
                              {token.price_24h > 0 ? '+' : ''}
                              {token.price_24h.toFixed(2)}%
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}
            <div className="fixed bottom-4 left-0 flex w-full justify-center">
              <DialogClose className="mx-8 w-full">
                <div
                  onClick={handleApplySelect}
                  className={cn(
                    '"w-auto flex items-center justify-center rounded-3xl p-px shadow-lg backdrop-blur-[2px]',
                    tokens.length > 0
                      ? 'bg-gradient-to-r from-[#9945FF] to-[#14F195]'
                      : 'cursor-not-allowed bg-white/10 text-disabled',
                  )}
                >
                  <div
                    className={cn(
                      'flex h-full w-full items-center justify-center rounded-full py-3 font-medium',
                      tokens.length > 0
                        ? 'bg-black'
                        : 'cursor-not-allowed text-disabled',
                    )}
                  >
                    Choose Token
                  </div>
                </div>
              </DialogClose>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
