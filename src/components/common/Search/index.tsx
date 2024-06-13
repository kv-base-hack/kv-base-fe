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
    const data = localStorage.getItem('recently_searched')
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
            localStorage.setItem('recently_searched', JSON.stringify(tokenData))
          }
        })
    }
  }, [listTokenQuery?.data?.data?.tokens])

  useEffect(() => {
    const data = localStorage.getItem('recently_searched')
    if (data) {
      setDataRecently(JSON.parse(data))
    }
  }, [])

  const handleRemoveAllRecently = () => {
    localStorage.removeItem('recently_searched')
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
      className="flex justify-end w-[400px] max-w-[400px] lg:max-w-[200px] relative wrap-box rounded-full wrap-box"
    >
      <div
        className={cn(
          'flex justify-start items-center my-auto rounded-full p-px',
          focusing
            ? ' bg-gradient-to-r from-[#0080FF] to-white shadow-lg backdrop-blur-[2px]'
            : '',
        )}
      >
        <div className="flex gap-2 justify-end items-center p-2 my-auto text-base font-medium leading-6 text-neutral-02 rounded-full border border-white/20 bg-neutral-07">
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
        <div className="absolute top-[60px] max-h-[500px] overflow-y-auto w-screen -right-1/2 md:w-full lg:min-w-[500px] md:right-0">
          {search ? (
            <div className="">
              <div className="flex flex-col justify-center p-4 rounded-2xl border border-white/10 border-solid bg-stone-900 w-full">
                <div className="flex gap-4 justify-start items-center py-2 text-base font-medium leading-6 shadow-lg backdrop-blur-lg text-zinc-50 max-md:flex-wrap">
                  <div className="flex items-center justify-start px-4 py-1 whitespace-nowrap rounded-3xl bg-zinc-100 bg-opacity-10">
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
                        className="flex gap-3.5 justify-between self-stretch px-4 py-3 rounded-xl max-w-[585px] max-md:flex-wrap"
                      >
                        <div className="flex gap-3 items-center">
                          <div className="shrink-0 self-stretch my-auto w-2 h-2 bg-purple-500 rounded-full" />
                          <div>{`${wallet.address?.substring(
                            0,
                            6,
                          )}...${wallet.address?.slice(-6)}`}</div>
                          <ViewWalletIcon />
                        </div>
                        <div className="flex gap-5 justify-between text-sm font-semibold tracking-normal leading-6 text-right text-green-500">
                          <div className="text-base tracking-normal text-stone-300">
                            <span className="text-gray-500">Volume 24h.</span>{' '}
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
                          <div>PNL: {nFormatter(wallet?.pnl)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="z-50 flex flex-col justify-center p-4 text-base leading-6 rounded-2xl border border-white/10 border-solid bg-neutral-07 max-w-[320px] md:max-w-[678px] lg:max-w-[620px]">
              <div className="flex gap-3 self-start font-medium text-zinc-400">
                <TopTrendingIcon />
                <div>Top Performing Tokens</div>
              </div>
              <div className="flex overflow-x-auto gap-3 justify-start mt-3 tracking-normal text-center text-white whitespace-nowrap max-md:flex-wrap">
                {dataToken.map((token, index: number) => (
                  <div
                    key={index}
                    onClick={navigateTokenDetail(token)}
                    className="z-50 flex cursor-pointer !w-24 flex-col justify-center p-3 rounded-xl bg-zinc-700"
                  >
                    <ImageToken
                      symbol={token.symbol}
                      imgUrl={token.thumb}
                      className="self-center w-8 h-8 aspect-square"
                    />
                    <div className="mt-2">{token.symbol}</div>
                  </div>
                ))}
              </div>
              {/* <div className="flex gap-3 self-start mt-4 tracking-normal text-zinc-400">
                <WalletIcon />
                <div>Popular wallet search</div>
              </div>
              <div className="flex gap-3 mt-3 tracking-normal text-white max-md:flex-wrap">
                <SearchIcon className="shrink-0 my-auto w-4 aspect-square" />
                <div className="flex-1 max-md:max-w-full">Binance 12</div>
              </div>
              <div className="flex gap-3 mt-3 tracking-normal text-white max-md:flex-wrap">
                <SearchIcon className="shrink-0 my-auto w-4 aspect-square" />
                <div className="flex-1 max-md:max-w-full">DWF Lab 1</div>
              </div>
              <div className="flex gap-3 mt-3 tracking-normal text-white whitespace-nowrap max-md:flex-wrap">
                <SearchIcon className="shrink-0 my-auto w-4 aspect-square" />
                <span className="whitespace-pre-wrap">
                  0xda9dfa...ff26f6ea73cf
                </span>
              </div>
              <div className="flex gap-3 self-start mt-4 tracking-normal text-zinc-400">
                <Image
                  loading="lazy"
                  src="/images/bot.png"
                  className="shrink-0 aspect-square"
                  alt="bot"
                  width={24}
                  height={26}
                />
                <div>Popular Bol AI question</div>
              </div>
              <div className="flex gap-3 mt-3 tracking-normal text-white max-md:flex-wrap">
                <SearchIcon className="shrink-0 my-auto w-4 aspect-square" />
                <div className="flex-1 max-md:max-w-full">
                  Make a analysis of SOL today
                </div>
              </div>
              <div className="flex gap-3 mt-3 tracking-normal text-white max-md:flex-wrap">
                <SearchIcon className="shrink-0 my-auto w-4 aspect-square" />
                <div className="flex-1 max-md:max-w-full">
                  Technical analyst of JUP in the latest 1 days
                </div>
              </div>
              <div className="flex gap-3 mt-3 tracking-normal text-white max-md:flex-wrap">
                <SearchIcon className="shrink-0 my-auto w-4 aspect-square" />
                <div className="flex-1 max-md:max-w-full">
                  What token Smart Money is buying in 24h
                </div>
              </div> */}
              <div className="flex gap-3 mt-4 tracking-normal text-zinc-400 max-md:flex-wrap">
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
                    className="flex hover:underline cursor-pointer items-center gap-3 pr-9 mt-3 whitespace-nowrap leading-[140%] max-md:flex-wrap max-md:pr-5"
                  >
                    <LastDateIcon />
                    <div className="flex items-center flex-1 gap-2 py-px pr-20 max-md:flex-wrap">
                      <ImageToken
                        symbol={item.symbol}
                        imgUrl={item.imageUrl}
                        className="self-center w-5 h-5 aspect-square"
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
