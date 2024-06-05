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
      <DialogContent className="!p-0 z-[999999]">
        <div className="flex flex-col py-4 rounded-lg border-none bg-neutral-01 border-white/10 max-w-[510px]">
          <div className="flex px-4 gap-5 w-full justify-between text-xl font-bold tracking-tight leading-7 text-neutral-07 max-md:flex-wrap max-md:pl-5 max-md:max-w-full">
            <div></div>
            <div className="text-center">Select tokens</div>
            <DialogClose>
              <Close />
            </DialogClose>
          </div>
          <div className="flex px-4 flex-col justify-center mt-4 text-base tracking-tight leading-6 text-neutral-07  max-md:max-w-full">
            <div className="flex gap-4 justify-start px-4 py-3.5 rounded-xl border border-solid backdrop-blur-[50px]  border-neutral-07 max-md:flex-wrap max-md:max-w-full">
              <SearchIcon />
              <input
                placeholder="Search token name or paste address"
                className="w-full h-6 bg-transparent outline-none focus:outline-none font-normal "
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="mt-4 h-px bg-white bg-opacity-10 max-md:max-w-full" />
          <div className="h-[500px] px-4 relative overflow-y-auto pb-16">
            {listTokenData?.map((token, index) =>
              token.tokenAddress && action === 'navigate' ? (
                <DialogClose key={index} className="w-full cursor-pointer">
                  <div
                    onClick={handleNavigte(token)}
                    className="flex justify-between p-4 mt-4 rounded-xl bg-zinc-800 max-md:flex-wrap max-md:max-w-full"
                  >
                    <div className="flex gap-4 justify-between whitespace-nowrap">
                      <ImageToken
                        symbol={token?.symbol}
                        imgUrl={token?.imageUrl}
                      />
                      <div className="flex flex-col items-start flex-1">
                        <div className="text-base font-bold tracking-normal leading-6 text-neutral-07">
                          {token.symbol}
                        </div>
                        <div className="text-sm tracking-normal leading-4 text-neutral-07">
                          {token.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 justify-center items-end whitespace-nowrap">
                      <div className="self-end text-base font-bold tracking-normal leading-6 text-neutral-07">
                        {formatPriceNumber(token.usdPrice)}
                      </div>
                      <div className="flex items-center gap-2 justify-between text-sm tracking-normal leading-4">
                        {token.price_24h === 0 ? (
                          <div className="text-neutral-07 text-sm not-italic leading-5">
                            -
                          </div>
                        ) : (
                          <div
                            className={cn(
                              'text-neutral-07 text-sm not-italic  leading-5',
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
                    'mt-4  p-px',
                    tokens?.find(
                      (item) => item.tokenAddress === token.tokenAddress,
                    ) &&
                      'z-0 bg-gradient-to-b from-[#9945FF] to-[#14F195] rounded-xl',
                  )}
                >
                  <div
                    onClick={handleSelectToken(token)}
                    className={cn(
                      'flex z-1 cursor-pointer w-full h-full justify-between p-4 rounded-xl',
                      tokens?.find(
                        (item) => item.tokenAddress === token.tokenAddress,
                      )
                        ? 'bg-neutral-01'
                        : '',
                    )}
                  >
                    <div className="flex gap-4 justify-between whitespace-nowrap">
                      <ImageToken
                        imgUrl={token?.imageUrl}
                        symbol={token?.symbol}
                      />
                      <div className="flex flex-col flex-1">
                        <div className="text-base font-bold tracking-normal leading-6 text-neutral-07">
                          {token.symbol}
                        </div>
                        <div className="text-sm tracking-normal leading-4 text-neutral-07">
                          {token.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 justify-center items-end whitespace-nowrap">
                      <div className="self-end text-base font-bold tracking-normal leading-6 text-neutral-07">
                        {formatPriceNumber(token.usdPrice)}
                      </div>
                      <div className="flex items-center gap-2 justify-between text-sm tracking-normal leading-4">
                        {token.price_24h === 0 ? (
                          <div className="text-neutral-07 text-sm not-italic leading-5">
                            -
                          </div>
                        ) : (
                          <div
                            className={cn(
                              'text-sm not-italic  leading-5',
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
            <div className="fixed left-0 w-full flex justify-center bottom-4">
              <DialogClose className="w-full mx-8">
                <div
                  onClick={handleApplySelect}
                  className={cn(
                    'w-auto rounded-full flex items-center justify-center',
                    tokens.length > 0 ? 'button-gradient' : 'bg-neutral-500',
                  )}
                >
                  <span className="hidden font-medium xl:flex h-12 justify-center rounded-full items-center self-stretch px-6 py-2">
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
