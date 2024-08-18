'use client'

import { chainAtom } from '@/atom/chain'
import { ImageToken } from '@/components/common/Image/ImageToken'
import SearchIcon from '@/components/shared/icons/SearchIcon'
import ViewWalletIcon from '@/components/shared/icons/ViewWallet'
import TopTrendingIcon from '@/components/shared/icons/kaichat/TopTrendingIcon'
import LastDateIcon from '@/components/shared/icons/wallet-explorer/LastDateIcon'
import { cn } from '@/lib/utils'
import { nFormatter } from '@/lib/utils/nFormatter'
import { useTokenListQuery } from '@/query/token-explorer/getListToken'
import { useTrendingTokenQuery } from '@/query/wallet-explorer/getTrendingToken'
import { TokenList } from '@/types/tokenList'
import { TrendingToken } from '@/types/trendingToken'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useClickAway, useDebounce } from 'react-use'
import { TokenItem } from './TokenItem'

export const SearchComp = () => {
  const router = useRouter()
  const CHAIN = useAtomValue(chainAtom)
  const [openSearch, setOpenSearch] = useState(false)
  const [dataRecently, setDataRecently] = useState<TrendingToken[]>([])
  const [search, setSearch] = useState('')
  const [debounceSearch, setDebounceSearch] = useState('')
  const ref = useRef<HTMLInputElement>(null)
  const [focusing, setFocusing] = useState(false)

  useClickAway(ref, () => {
    setOpenSearch(false)
    setFocusing(false)
  })

  const trendingTokenQuery = useTrendingTokenQuery({
    chain: CHAIN,
    search: debounceSearch,
    limit: 5,
  })
  const dataToken = trendingTokenQuery.data?.data?.trending_tokens || []
  //

  useDebounce(
    () => {
      setDebounceSearch(search)
    },
    300,
    [search],
  )

  const listTokenQuery = useTokenListQuery({
    symbol_search: debounceSearch,
    chain: CHAIN,
    enabled: debounceSearch !== '',
  })
  const listTokenData = listTokenQuery.data?.data?.tokens || []
  const listWalletData = listTokenQuery.data?.data?.users || []

  const navigateTokenDetail = (token: TrendingToken) => (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(
      `/smartmoney-onchain/token-explorer/${
        token?.address || token?.tokenAddress
      }`,
    )
    setOpenSearch(false)
  }

  useEffect(() => {
    const data = window?.localStorage?.getItem('recently_searched')
    let tokenData: any = []
    if (data) {
      tokenData = JSON.parse(data)
    }
    if (
      listTokenQuery?.data?.data?.tokens &&
      listTokenQuery?.data?.data?.tokens?.length > 0
    ) {
      ;[...listTokenQuery.data.data.tokens]
        .reverse()
        .forEach((token: TokenList) => {
          const tokenExist = tokenData.find(
            (item: TrendingToken) => item.symbol === token.symbol,
          )
          if (!tokenExist) {
            tokenData.unshift(token)
            if (tokenData.length > 3) {
              tokenData.pop()
            }
            setDataRecently(tokenData)
            window?.localStorage.setItem(
              'recently_searched',
              JSON.stringify(tokenData),
            )
          }
        })
    }
  }, [listTokenQuery?.data?.data?.tokens])

  useEffect(() => {
    const data = window?.localStorage?.getItem('recently_searched')
    if (data) {
      setDataRecently(JSON.parse(data))
    }
  }, [])

  const handleRemoveAllRecently = () => {
    window?.localStorage.removeItem('recently_searched')
    setDataRecently([])
  }

  const focusInputSearch = () => {
    setOpenSearch(true)
    setFocusing(true)
  }

  const handleNavigateTokenDetail = (token: TokenList) => () => {
    setOpenSearch(false)
    router.push(`/smartmoney-onchain/token-explorer/${token?.tokenAddress}`)
  }

  const handleNavigateWalletDetail = (wallet: any) => () => {
    setOpenSearch(false)
    router.push(`/smartmoney-onchain/wallet-explorer/${wallet?.address}`)
  }

  return (
    <div
      ref={ref}
      className="wrap-box wrap-box relative flex w-full rounded-[20px] lg:max-w-[600px]"
    >
      <div
        className={cn(
          'my-auto flex items-center justify-start rounded-full p-px',
          focusing
            ? 'bg-gradient-to-r from-[#0080FF] to-white shadow-lg backdrop-blur-[2px]'
            : '',
        )}
      >
        <div className="my-auto flex items-center justify-end gap-2 rounded-full border border-white/20 bg-neutral-07 p-2 text-base font-medium leading-6 text-neutral-02">
          <SearchIcon onClick={() => setOpenSearch(true)} />
          <input
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            onFocus={focusInputSearch}
            placeholder="Search..."
            className="flex w-full bg-transparent outline-none"
          />
        </div>
      </div>
      {openSearch ? (
        <div className="no-scrollbar absolute -right-1/2 top-[60px] max-h-[500px] w-screen overflow-y-auto scroll-smooth md:right-0 md:w-full lg:min-w-[500px]">
          {search ? (
            <div className="">
              <div className="flex w-full flex-col justify-center rounded-2xl border border-solid border-white/10 bg-stone-900 p-4">
                <div className="flex items-center justify-start gap-4 py-2 text-base font-medium leading-6 text-zinc-50 shadow-lg backdrop-blur-lg max-md:flex-wrap">
                  <div className="flex items-center justify-start whitespace-nowrap rounded-3xl bg-zinc-100 bg-opacity-10 px-4 py-1">
                    All
                  </div>
                  <div className="my-auto">Token</div>
                  <div className="my-auto">Wallet</div>
                </div>

                <div className="mt-4 text-base leading-6 text-zinc-400 max-md:max-w-full">
                  Token ({listTokenData?.length || 0} results)
                </div>
                {listTokenData?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {listTokenData.map((token, index: number) => (
                      <TokenItem
                        key={index}
                        onClick={handleNavigateTokenDetail(token)}
                        token={token}
                      />
                    ))}
                  </div>
                ) : null}

                <div className="mt-4 text-base leading-6 text-zinc-400 max-md:max-w-full">
                  Wallet ({listWalletData?.length} results)
                </div>
                {listWalletData ? (
                  <div className="flex flex-wrap gap-2">
                    {listWalletData?.map((wallet, index: number) => (
                      <div
                        key={index}
                        onClick={handleNavigateWalletDetail(wallet)}
                        className="flex max-w-[585px] justify-between gap-3.5 self-stretch rounded-xl py-3 max-md:flex-wrap"
                      >
                        <div className="flex items-center gap-3">
                          <div className="my-auto h-2 w-2 shrink-0 self-stretch rounded-full bg-purple-500" />
                          <div>{`${wallet.address?.substring(
                            0,
                            6,
                          )}...${wallet.address?.slice(-6)}`}</div>
                          <ViewWalletIcon />
                        </div>
                        <div className="flex justify-between gap-5 text-right text-sm font-semibold leading-6 tracking-normal text-green-500">
                          <div className="text-base tracking-normal text-stone-300">
                            <span className="whitespace-nowrap text-gray-500">
                              Volume 24h
                            </span>{' '}
                            <span className="text-stone-300">
                              {nFormatter(wallet.volume_24h)}
                            </span>
                          </div>
                          <div
                            className={cn(
                              'text-base',
                              wallet?.roi_percent > 0
                                ? 'text-success-500'
                                : 'text-error-500',
                            )}
                          >
                            ROI: {wallet.roi_percent?.toFixed(2)}%
                          </div>
                          <div className="text-base">
                            PNL: {nFormatter(wallet?.pnl)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="z-50 flex max-w-[320px] flex-col justify-center rounded-2xl border border-solid border-white/10 bg-neutral-07 p-4 text-base leading-6 md:max-w-[678px] lg:max-w-[620px]">
              <div className="flex gap-3 self-start font-medium text-zinc-400">
                <TopTrendingIcon />
                <div>Top Performing Tokens</div>
              </div>
              <div className="mt-3 flex justify-start gap-3 overflow-x-auto whitespace-nowrap text-center tracking-normal text-white max-md:flex-wrap">
                {dataToken.map((token, index: number) => (
                  <div
                    key={index}
                    onClick={navigateTokenDetail(token)}
                    className="z-50 flex !w-24 cursor-pointer flex-col justify-center rounded-xl bg-zinc-700 p-3"
                  >
                    <ImageToken
                      symbol={token.symbol}
                      imgUrl={token.thumb}
                      className="aspect-square h-8 w-8 self-center"
                    />
                    <div className="mt-2">{token.symbol}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-3 tracking-normal text-zinc-400 max-md:flex-wrap">
                <div className="flex-1 max-md:max-w-full">Recent search</div>
                <div
                  className="cursor-pointer"
                  onClick={handleRemoveAllRecently}
                >
                  Delete all
                </div>
              </div>
              <div>
                {dataRecently?.map((item: TrendingToken, index: number) => (
                  <div
                    key={index}
                    onClick={navigateTokenDetail(item)}
                    className="mt-3 flex cursor-pointer items-center gap-3 whitespace-nowrap pr-9 leading-[140%] hover:underline max-md:flex-wrap max-md:pr-5"
                  >
                    <LastDateIcon />
                    <div className="flex flex-1 items-center gap-2 py-px pr-20 max-md:flex-wrap">
                      <ImageToken
                        symbol={item.symbol}
                        imgUrl={item.imageUrl}
                        className="aspect-square h-5 w-5 self-center"
                      />
                      <div className="flex gap-1">
                        <div className="text-white">{item.name}</div>
                        <div className="text-zinc-400">({item.symbol})</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
