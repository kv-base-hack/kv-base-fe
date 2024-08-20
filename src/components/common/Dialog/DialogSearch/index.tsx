import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import SearchIcon from '@/components/shared/icons/SearchIcon'
import Link from 'next/link'
import { useTokenListQuery } from '@/query/token-explorer/getListToken'
import { useRouter } from 'next/navigation'
import { useAtomValue } from 'jotai'
import { chainAtom } from '@/atom/chain'
import { TokenList } from '@/types/tokenList'
import { TrendingToken } from '@/types/trendingToken'
import { ImageToken } from '../../Image/ImageToken'
import LastDateIcon from '@/components/shared/icons/wallet-explorer/LastDateIcon'
import { cn } from '@/lib/utils'
import { useTrendingTokenQuery } from '@/query/wallet-explorer/getTrendingToken'
import { useClickAway, useDebounce } from 'react-use'
import numeral from 'numeral'
import { TokenItem } from '../../Search/token-item'
import ViewWalletIcon from '@/components/shared/icons/ViewWallet'
import { nFormatter } from '@/lib/utils/nFormatter'
import { useLeaderboardQuery } from '@/query/leaderboard/getLeaderboard'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { WrapGradient } from './wrap-gradient'
import { TooltipWallet } from '../../Tooltip/tooltip-wallet'
import { ImageRanking } from '../../Image/image-ranking'

export const DialogSearchToken = ({
  children,
}: {
  children?: React.ReactNode
}) => {
  const router = useRouter()
  const CHAIN = useAtomValue(chainAtom)
  const [search, setSearch] = useState('')
  const [debounceSearch, setDebounceSearch] = useState('')
  const [focusing, setFocusing] = useState(false)
  const [dataRecently, setDataRecently] = useState<TrendingToken[]>([])
  const ref = useRef<HTMLInputElement>(null)

  const trendingTokenQuery = useTrendingTokenQuery({
    chain: CHAIN,
    limit: 5,
  })

  const leaderboardQuery = useQuery(
    useLeaderboardQuery({
      start: 1,
      limit: 3,
      chain: CHAIN,
      sortBy: '',
      token_addresses: '',
    }),
  )
  const dataLeaderboard = leaderboardQuery.isFetching
    ? [...(Array(3).keys() as any)]
    : leaderboardQuery?.data?.leaderboard?.slice(0, 3) || []

  //
  const dataToken = trendingTokenQuery?.data?.data?.trending_tokens || []

  const listTokenQuery = useQuery(
    useTokenListQuery({
      symbol_search: debounceSearch,
      chain: CHAIN,
      enabled: debounceSearch !== '',
    }),
  )
  const listTokenData = listTokenQuery.data?.tokens || []
  const listWalletData = listTokenQuery.data?.users || []

  useDebounce(
    () => {
      setDebounceSearch(search)
    },
    300,
    [search],
  )

  const navigateToTokenDetail = (token: TrendingToken) => {
    updateRecentlySearched(token)
    router.push(
      `/smartmoney-onchain/token-explorer/${
        token?.address || token?.tokenAddress
      }`,
    )
  }

  useEffect(() => {
    const data = localStorage.getItem('recently_searched')
    if (data) {
      setDataRecently(JSON.parse(data))
    }
  }, [])

  const updateRecentlySearched = (token: TrendingToken | TokenList) => {
    const data = localStorage.getItem('recently_searched')
    let tokenData = data ? JSON.parse(data) : []
    tokenData = tokenData.filter(
      (item: TrendingToken) => item.symbol !== token.symbol,
    )
    tokenData.unshift(token)
    tokenData = tokenData.slice(0, 3)
    setDataRecently(tokenData)
    localStorage.setItem('recently_searched', JSON.stringify(tokenData))
  }

  const handleNavigateTokenDetail = (token: any) => {
    updateRecentlySearched(token)
    router.push(
      `/smartmoney-onchain/token-explorer/${
        token?.tokenAddress || token?.address
      }`,
    )
  }

  const handleNavigateWalletDetail =
    (wallet: any) => (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()
      e.stopPropagation()
      router.push(`/smartmoney-onchain/wallet-explorer/${wallet?.address}`)
    }

  const handleRemoveAllRecently = () => {
    localStorage.removeItem('recently_searched')
    setDataRecently([])
  }

  const focusInputSearch = () => {
    setFocusing(true)
  }

  useClickAway(ref, () => {
    setFocusing(false)
  })

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="left-[30%] top-[20%] z-[999999] flex h-[660px] max-w-[750px] translate-x-[-10%] translate-y-[-10%] flex-col justify-start rounded-[20px] bg-black/50 p-6 shadow-search backdrop-blur-xl">
        <div
          ref={ref}
          className={cn(
            'my-auto flex items-center justify-start rounded-[20px] border-[0.5px] border-white/20 text-base font-medium leading-6 text-neutral-02',
            focusing
              ? 'bg-gradient-to-r from-[#9945FF] to-[#14F195] shadow-lg backdrop-blur-[1px]'
              : '',
          )}
        >
          <div
            className={cn(
              focusing ? 'bg-background' : 'bg-white/10',
              'my-auto flex flex-1 items-center justify-start gap-2 rounded-[20px] p-2 text-base font-medium leading-6 text-[#98A2B3] xl:px-3',
            )}
          >
            <SearchIcon />
            <input
              value={search}
              onFocus={focusInputSearch}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              placeholder="Search for tokens, address,..."
              className="flex w-full bg-transparent outline-none xl:flex"
            />
          </div>
        </div>
        {search ? (
          <div className="flex h-full flex-col">
            <div className="flex gap-3 self-start text-base leading-6 text-[#9AA0A6]">
              Token ({listTokenData?.length || 0} results)
            </div>
            {listTokenData?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {listTokenData.map((token, index: number) => (
                  <DialogClose asChild className="border-none" key={index}>
                    <TokenItem
                      onClick={() => handleNavigateTokenDetail(token)}
                      symbol={token.symbol}
                      imageUrl={token.imageUrl}
                      name={token.name}
                      price={token.usdPrice}
                      percentChange24h={token.price_24h}
                    />
                  </DialogClose>
                ))}
              </div>
            ) : null}

            <div className="mb-3 flex gap-3 self-start text-base leading-6 text-[#9AA0A6]">
              Wallet ({listWalletData?.length} results)
            </div>
            {listWalletData ? (
              <div className="flex flex-wrap gap-2">
                {listWalletData?.map((wallet, index: number) => (
                  <div
                    key={index}
                    onClick={handleNavigateWalletDetail(wallet)}
                    className="z-50 flex max-w-[585px] justify-between gap-3.5 self-stretch rounded-xl px-4 py-3 max-md:flex-wrap"
                  >
                    <div className="flex items-center gap-3">
                      <div className="my-auto h-2 w-2 shrink-0 self-stretch rounded-full bg-purple-500" />
                      <div>{`${wallet.address?.substring(
                        0,
                        6,
                      )}...${wallet.address?.slice(-6)}`}</div>
                      <ViewWalletIcon />
                    </div>
                    <div className="text-green-500 flex justify-between gap-5 text-right text-sm font-semibold leading-6 tracking-normal">
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
                            ? 'text-green'
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
        ) : (
          <div className="h-full w-full overflow-y-auto">
            <div className="z-50 flex flex-col justify-center">
              {/* Smart Traders Popular Search */}
              <div className="mb-3 flex gap-3 self-start text-base font-normal leading-6 text-[#9AA0A6]">
                Tokens Recommend by AI
              </div>
              <div className="scroll-text flex justify-start gap-3 overflow-x-auto whitespace-nowrap text-center tracking-normal text-white max-md:flex-wrap">
                {dataToken.map((token, index: number) => (
                  <DialogClose asChild className="border-none" key={index}>
                    <TokenItem
                      onClick={() => handleNavigateTokenDetail(token)}
                      symbol={token.symbol}
                      imageUrl={token.imageUrl}
                      name={token.name}
                      price={token.price}
                      percentChange24h={token.price_change_percentage_24h}
                    />
                  </DialogClose>
                ))}
              </div>
              {/* Smart Traders Popular Search */}
              <div className="mb-3 mt-4 flex gap-3 self-start text-base leading-6 text-[#9AA0A6]">
                Top 3 Smart Traders
              </div>
              <div className="flex flex-col gap-2">
                {dataLeaderboard?.map((item, index) => (
                  <WrapGradient key={index}>
                    <div className="m-px flex cursor-pointer items-center justify-between rounded-xl border border-solid border-white/10 p-3 text-sm hover:bg-neutral-06">
                      <div className="flex flex-col gap-1">
                        <TooltipWallet data={item}>
                          <div className="flex items-center gap-1">
                            <ImageRanking ranking={item.ranking} size={16} />
                            <Link
                              className="max-w-32 truncate text-neutral-300 underline"
                              href={`/smartmoney-onchain/wallet-explorer/${item.user_address}`}
                            >
                              <DialogClose className="max-w-32 truncate text-neutral-300 underline">
                                {item.user_address}
                              </DialogClose>
                            </Link>
                          </div>
                        </TooltipWallet>
                        <div className="flex items-center gap-1">
                          {item.badges?.map((badge: any, index: number) => {
                            return (
                              <Image
                                key={index}
                                src={`/images/badges/${badge}.png`}
                                alt={badge}
                                width={16}
                                height={16}
                              />
                            )
                          })}
                        </div>
                      </div>
                      <div className="text-sm font-normal leading-5 text-neutral-03">
                        <div className="">Total Profit</div>
                        <div
                          className={
                            item.net_profit < 0 ? 'text-red' : 'text-core'
                          }
                        >
                          {item.net_profit
                            ? `$${nFormatter(item.net_profit)}`
                            : '-'}
                        </div>
                      </div>
                      <div className="text-sm font-normal leading-5 text-neutral-03">
                        <div className="">ROI</div>
                        <div
                          className={item.roi > 0 ? 'text-core' : 'text-red'}
                        >
                          {item.roi ? `${item.roi.toFixed(2)}%` : '-'}
                        </div>
                      </div>
                      <div className="text-sm font-normal leading-5 text-neutral-03">
                        <div className="">Winrate</div>
                        <div className="text-neutral-100">
                          {numeral(item.win_rate_percent).format('0,0.[00]') ||
                            '-'}
                          %
                        </div>
                      </div>
                      <div className="text-sm font-normal leading-5 text-neutral-03">
                        <div className=""># of Trades</div>
                        <div className="text-right text-neutral-100">
                          {item.total_trade}
                        </div>
                      </div>
                    </div>
                  </WrapGradient>
                ))}
              </div>
              {/* Recently search */}
              <div className="mt-4 flex gap-3 text-base leading-6 tracking-normal text-[#9AA0A6] max-md:flex-wrap">
                <div className="flex-1 max-md:max-w-full">Recent search</div>
                <div
                  className="cursor-pointer"
                  onClick={handleRemoveAllRecently}
                >
                  Clear
                </div>
              </div>
              <div>
                {dataRecently?.map((item: TrendingToken, index: number) => (
                  <DialogClose asChild className="border-none" key={index}>
                    <div
                      onClick={() => navigateToTokenDetail(item)}
                      className="mt-3 flex cursor-pointer items-center gap-3 whitespace-nowrap pr-9 leading-[140%] hover:underline max-md:flex-wrap max-md:pr-5"
                    >
                      <LastDateIcon />
                      <div className="flex flex-1 items-center gap-2 py-px pr-20 max-md:flex-wrap">
                        <ImageToken
                          symbol={item.symbol}
                          imgUrl={item.imageUrl || item.thumb}
                          className="aspect-square h-5 w-5 self-center"
                        />
                        <div className="font-Inter flex gap-1 text-base">
                          <div className="text-neutral-200">{item.name}</div>
                          <div className="text-[#9AA0A6]">({item.symbol})</div>
                        </div>
                      </div>
                    </div>
                  </DialogClose>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
