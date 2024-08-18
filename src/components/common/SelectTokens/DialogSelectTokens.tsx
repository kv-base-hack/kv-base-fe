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

import { TokenList } from '@/types/tokenList'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { formatPriceNumber } from '@/utils/formatPriceNumber'
import { useGetListTokensQuery } from '@/query/leaderboard/getListTokens'
import { useQuery } from '@tanstack/react-query'

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
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setTokens(listToken || [])
  }, [listToken])
  //
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [debounceSearch, setDebounceSearch] = useState('')
  const CHAIN = useAtomValue(chainAtom)

  const listTokenQuery = useQuery(
    useGetListTokensQuery({
      symbol_search: debounceSearch,
      chain: CHAIN,
      enabled,
    }),
  )
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
    router.push(`/smartmoney-onchain/token-explorer/${token.tokenAddress}`)
  }

  const handleSelectToken = (token: TokenList) => () => {
    if (action === 'default') {
      const tmp = [...tokens]
      const index = tmp.findIndex(
        (item) => item.tokenAddress === token.tokenAddress,
      )
      if (index !== -1) {
        tmp.splice(index, 1)
      } else {
        tmp.push(token)
      }
      setTokens([...tmp])
    }
  }

  const handleApplySelect = () => {
    if (setListToken && listToken) {
      setListToken([...tokens])
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild onClick={() => setEnabled(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="z-[999999] !p-0">
        <div className="flex max-w-[510px] flex-col rounded-lg border-none border-white/10 bg-neutral-01 py-4">
          <div className="flex w-full justify-between gap-5 px-4 text-xl font-bold leading-7 tracking-tight text-neutral-07 max-md:max-w-full max-md:flex-wrap max-md:pl-5">
            <div></div>
            <div className="text-center">Select tokens</div>
            <DialogClose>
              <Close />
            </DialogClose>
          </div>
          <div className="mt-4 flex flex-col justify-center px-4 text-base leading-6 tracking-tight text-neutral-07 max-md:max-w-full">
            <div className="flex justify-start gap-4 rounded-xl border border-solid border-neutral-07 px-4 py-3.5 backdrop-blur-[50px] max-md:max-w-full max-md:flex-wrap">
              <SearchIcon />
              <input
                placeholder="Search token name or paste address"
                className="h-6 w-full bg-transparent font-normal outline-none focus:outline-none"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="mt-4 h-px bg-white bg-opacity-10 max-md:max-w-full" />
          <div className="relative h-[500px] overflow-y-auto px-4 pb-16">
            {listTokenData?.map((token, index) =>
              token.tokenAddress && action === 'navigate' ? (
                <DialogClose key={index} className="w-full cursor-pointer">
                  <div
                    onClick={handleNavigte(token)}
                    className="mt-4 flex justify-between rounded-xl bg-zinc-800 p-4 max-md:max-w-full max-md:flex-wrap"
                  >
                    <div className="flex justify-between gap-4 whitespace-nowrap">
                      <ImageToken
                        symbol={token?.symbol}
                        imgUrl={token?.imageUrl}
                      />
                      <div className="flex flex-1 flex-col items-start">
                        <div className="text-base font-bold leading-6 tracking-normal text-neutral-07">
                          {token.symbol}
                        </div>
                        <div className="text-sm leading-4 tracking-normal text-neutral-07">
                          {token.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col items-end justify-center whitespace-nowrap">
                      <div className="self-end text-base font-bold leading-6 tracking-normal text-neutral-07">
                        {formatPriceNumber(token.usdPrice)}
                      </div>
                      <div className="flex items-center justify-between gap-2 text-sm leading-4 tracking-normal">
                        {token.price_24h === 0 ? (
                          <div className="text-sm not-italic leading-5 text-neutral-07">
                            -
                          </div>
                        ) : (
                          <div
                            className={cn(
                              'text-sm not-italic leading-5 text-neutral-07',
                              token.price_24h > 0
                                ? 'text-semantic-success-1'
                                : 'text-semantic-error-1',
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
                      (item) => item.tokenAddress === token.tokenAddress,
                    ) &&
                      'z-0 rounded-xl bg-gradient-to-b from-[#0080FF] to-[#14F195]',
                  )}
                >
                  <div
                    onClick={handleSelectToken(token)}
                    className={cn(
                      'z-1 flex h-full w-full cursor-pointer justify-between rounded-xl p-4',
                      tokens?.find(
                        (item) => item.tokenAddress === token.tokenAddress,
                      )
                        ? 'bg-neutral-01'
                        : '',
                    )}
                  >
                    <div className="flex justify-between gap-4 whitespace-nowrap">
                      <ImageToken
                        imgUrl={token?.imageUrl}
                        symbol={token?.symbol}
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="text-base font-bold leading-6 tracking-normal text-neutral-07">
                          {token.symbol}
                        </div>
                        <div className="text-sm leading-4 tracking-normal text-neutral-07">
                          {token.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col items-end justify-center whitespace-nowrap">
                      <div className="self-end text-base font-bold leading-6 tracking-normal text-neutral-07">
                        {formatPriceNumber(token.usdPrice)}
                      </div>
                      <div className="flex items-center justify-between gap-2 text-sm leading-4 tracking-normal">
                        {token.price_24h === 0 ? (
                          <div className="text-sm not-italic leading-5 text-neutral-07">
                            -
                          </div>
                        ) : (
                          <div
                            className={cn(
                              'text-sm not-italic leading-5',
                              token.price_24h >= 0
                                ? 'text-semantic-success-1'
                                : 'text-semantic-error-1',
                            )}
                          >
                            {token.price_24h > 0 ? '+' : ''}
                            {token.price_24h.toFixed(2)}%
                          </div>
                        )}
                        <div className="text-neutral-07">24h</div>
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
                    'flex w-auto items-center justify-center rounded-full',
                    tokens.length > 0 ? 'button-gradient' : 'bg-neutral-500',
                  )}
                >
                  <span className="hidden h-12 items-center justify-center self-stretch rounded-full px-6 py-2 font-medium xl:flex">
                    Select Token
                  </span>
                </div>
              </DialogClose>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
