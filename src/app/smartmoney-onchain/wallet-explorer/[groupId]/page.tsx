'use client'

import { useTradeStatisticQuery } from '@/query/wallet-explorer/getTradeStatistic'

import LastDateIcon from '@/components/shared/icons/wallet-explorer/LastDateIcon'
import BigestGainerIcon from '@/components/shared/icons/wallet-explorer/BigestGainerIcon'
import { CopyCustom } from '@/components/common/CopyCustom'
import { useGetUserInfoQuery } from '@/query/wallet-explorer/getUserInfo'
import ReactTimeAgo from 'react-time-ago'
import { PortfolioComp } from '@/components/pages/wallet-detail/Portfolio'
import { Statistic } from '@/components/pages/wallet-detail/Statistic'
import { BigTradeActivity } from '@/components/pages/wallet-detail/BigTradeActivity'
import {
  WalletInfoItem,
  WalletInfoItemTitle,
} from '@/components/pages/wallet-detail/WalletInfoItem'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { TokenList } from '@/types/tokenList'
import { ImageToken } from '@/components/common/Image/ImageToken'
import Close from '@/components/shared/icons/Close'
import numeral from 'numeral'
import { useQuery } from '@tanstack/react-query'
import { CHAIN } from '@/constant/chain'
import { parseAsBoolean, useQueryState } from 'nuqs'
import { Switch } from '@/components/ui/switch'
import { nFormatter } from '@/lib/utils/nFormatter'
import { IconCart } from '@/components/shared/icons/spotlight'
import React from 'react'
import { ButtonChooseToken } from '@/components/common/Button/button-choose-token'
import { SelectDurationLeaderboard } from '@/components/common/Select/SelectDuration/select-duration-leaderboard'
import { ImageRanking } from '@/components/common/Image/image-ranking'
import IconCopyAddress from '@/components/shared/icons/icon-copy-address'
import { WalletInfoPieChart } from '@/components/pages/wallet-detail/wallet-infor-pie-chart'
import IconSpotLight from '@/components/shared/icons/smart-traders/icon-spot-light'
import { WalletStatChart } from '@/components/pages/wallet-detail/wallet-stat-chart'
import { DialogWalletAnalysis } from '@/components/pages/wallet-detail/dialog-wallet-analysis'

const TABS = ['Trade Statistic', 'Assets', 'Activity']

export default function WalletExplorerDetail({
  params,
  searchParams,
}: {
  params: { groupId: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const [tab, setTabs] = useState('Trade Statistic')

  const refWalletDetail = React.useRef(null)

  const currentTradeStatisticDuration =
    searchParams?.statistic_duration?.toString() || '30d'
  const currentUserInfoDuration =
    searchParams?.u_info_duration?.toString() || '30d'

  const [hideSmallAsset, setHideSmallAsset] = useState(false)

  const [listToken, setListToken] = useState<TokenList[]>([])

  const currentHideSmallTrade = Boolean(
    searchParams?.ta_is_big_trade_only?.toString() || false,
  )
  const currentFilterDateStatistic =
    searchParams?.tst_duration?.toString() || '30d'
  const currentListToken = searchParams?.tst_token_address?.toString() || ''

  const [, setUserInfoDuration] = useQueryState('u_info_duration', {
    defaultValue: currentUserInfoDuration,
    history: 'push',
    shallow: false,
  })

  const [, setTradeStatisticDuration] = useQueryState('statistic_duration', {
    defaultValue: currentTradeStatisticDuration,
    history: 'push',
    shallow: false,
  })

  const [, setFilterDateStatistic] = useQueryState('tst_duration', {
    defaultValue: currentFilterDateStatistic,
    history: 'push',
    shallow: false,
  })

  const [, setFilterListToken] = useQueryState('tst_token_address', {
    defaultValue: currentListToken,
    history: 'push',
    shallow: false,
  })

  const [, setHideSmallTrade] = useQueryState(
    'ta_is_big_trade_only',
    parseAsBoolean.withDefault(currentHideSmallTrade).withOptions({
      history: 'push',
      shallow: false,
    }),
  )

  const handleChangeTab = (tab: string) => () => {
    setTabs(tab)
  }

  const tradeStatisticQuery = useQuery(
    useTradeStatisticQuery({
      address: params?.groupId?.toString() || '',
      chain: CHAIN,
      token_address: '',
      duration: currentTradeStatisticDuration,
    }),
  )

  const tradeStatistic = tradeStatisticQuery?.data

  const DATA_STATS = [
    {
      name: 'Most Bought',
      icon: (
        <div className="flex items-center justify-center rounded-full border border-core p-1 text-core">
          <IconCart className="h-3 w-3" />
        </div>
      ),
      imgUrl: tradeStatistic?.most_buy_detail?.image_url,
      title: tradeStatistic?.most_buy_detail?.name,
      priceChangeH24: tradeStatistic?.most_buy_detail?.price_change_24h,
      symbol: tradeStatistic?.most_buy_detail?.symbol,
      token_address: tradeStatistic?.most_buy_detail?.token_address,
      avg_price: tradeStatistic?.most_buy_detail?.avg_price,
      value_in_usdt: tradeStatistic?.most_buy_detail?.value_in_usdt,
      usdPrice: tradeStatistic?.most_buy_detail?.value_in_usdt,
      volume: tradeStatistic?.most_buy_detail?.volume,
      roi: tradeStatistic?.most_buy_detail?.roi,
      pnl: tradeStatistic?.most_buy_detail?.pnl,
      address: tradeStatistic?.most_buy_detail?.token_address,
      realized_percent: tradeStatistic?.most_buy_detail?.realized_percent,
      score: tradeStatistic?.most_buy_detail?.score,
      hold_in_usdt: tradeStatistic?.most_buy_detail?.hold_in_usdt,
      number_of_users: tradeStatistic?.most_buy_detail?.number_of_users,
    },
    {
      name: 'Most Profitable',
      icon: <BigestGainerIcon />,
      imgUrl: tradeStatistic?.most_profit_detail?.image_url,
      title: tradeStatistic?.most_profit_detail?.name,
      priceChangeH24: tradeStatistic?.most_profit_detail?.price_change_24h,
      symbol: tradeStatistic?.most_profit_detail?.symbol,
      token_address: tradeStatistic?.most_profit_detail?.token_address,
      avg_price: tradeStatistic?.most_profit_detail?.avg_price,
      usdPrice: tradeStatistic?.most_profit_detail?.value_in_usdt,
      volume: tradeStatistic?.most_profit_detail?.volume,
      roi: tradeStatistic?.most_profit_detail?.roi,
      pnl: tradeStatistic?.most_profit_detail?.pnl,
      address: tradeStatistic?.most_profit_detail?.token_address,
      realized_percent: tradeStatistic?.most_profit_detail?.realized_percent,
      score: tradeStatistic?.most_profit_detail?.score,
      hold_in_usdt: tradeStatistic?.most_profit_detail?.hold_in_usdt,
      number_of_users: tradeStatistic?.most_profit_detail?.number_of_users,
    },
  ]

  // get user info
  const userInfoQuery = useQuery(
    useGetUserInfoQuery({
      address: params?.groupId?.toString() || '',
      chain: CHAIN,
      frame: currentUserInfoDuration,
    }),
  )
  const userInfo = userInfoQuery?.data?.user_info

  const renderTab = () => {
    switch (tab) {
      case 'Trade Statistic':
        return (
          <Statistic
            filterDate={currentFilterDateStatistic}
            address={params?.groupId?.toString() || ''}
            chain={CHAIN}
            filterListToken={currentListToken}
          />
        )
      case 'Assets':
        return <PortfolioComp address={params.groupId} />
      case 'Activity':
        return (
          <BigTradeActivity
            address={params.groupId}
            searchParams={searchParams}
            chain={CHAIN}
            hideSmallTrade={currentHideSmallTrade}
          />
        )
    }
  }

  const handleRemoveToken = (item: TokenList) => (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const newListToken = listToken.filter(
      (token) => token.token_address !== item.token_address,
    )
    setListToken([...newListToken])
    setFilterListToken([...newListToken].toString())
  }
  const renderFilterTab = () => {
    switch (tab) {
      case 'Trade Statistic':
        return (
          <div className="mb-4 flex w-full items-center justify-end gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <ButtonChooseToken
                listToken={listToken}
                setListToken={setListToken}
              />
              {listToken?.length > 0 ? (
                <div className="flex items-center gap-2">
                  {listToken.map((item) => (
                    <div
                      className="h-7 rounded-3xl bg-gradient-to-r from-[#9945FF] to-[#14F195] p-px shadow-lg backdrop-blur-[2px]"
                      key={item.token_address}
                    >
                      <div className="flex h-full cursor-pointer items-center justify-center gap-1 rounded-3xl bg-neutral-07 px-4 text-xs leading-5 tracking-normal text-white">
                        <ImageToken
                          imgUrl={item?.imageUrl || item?.image_url}
                          symbol={item?.symbol}
                        />
                        <div>{item.symbol}</div>
                        <Close onclick={handleRemoveToken(item)} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <SelectDurationLeaderboard
              duration={currentFilterDateStatistic}
              setDuration={setFilterDateStatistic}
              type="option2"
            />
          </div>
        )
    }
  }

  return (
    <div className="h-full w-full">
      <div className="mx-4 mt-2 flex flex-col justify-center gap-2 self-stretch md:flex-row md:flex-wrap xl:flex-nowrap">
        {/* left */}
        <div
          ref={refWalletDetail}
          className="max-w-1/2 flex w-full flex-col self-stretch overflow-hidden rounded-2xl border border-solid border-white/10 bg-black/50 shadow-2xl backdrop-blur-lg md:w-1/2 xl:w-1/4"
        >
          <div className="mt-6 flex gap-4 whitespace-nowrap px-5 text-base font-medium leading-6 tracking-normal text-[#EFEFEF]">
            <ImageRanking ranking={userInfo?.ranking} size={56} />
            <div>
              <div className="flex items-center gap-2">
                <div>{`${params.groupId?.substring(
                  0,
                  6,
                )}...${params.groupId?.slice(-6)}`}</div>
                <div className="mt-1">
                  <CopyCustom
                    value={params.groupId}
                    icon={<IconCopyAddress />}
                  />
                </div>
                <a
                  href={userInfo?.scan_link}
                  target="_blank"
                >
                  <Image
                    loading="lazy"
                    src="/images/logo-scan.svg"
                    width={23}
                    height={23}
                    alt="scan"
                  />
                </a>
              </div>
              <div className="mt-2 flex items-end">
                {userInfo?.badges?.map((item, index) => {
                  return (
                    <Image
                      key={index}
                      src={`/images/badges/${item}.png`}
                      alt={item}
                      width={24}
                      height={24}
                    />
                  )
                })}
              </div>
            </div>
          </div>
          <div className="mt-2.5 flex items-center gap-2 px-5 text-base tracking-normal text-zinc-300">
            <div className="flex items-center gap-1 text-neutral-400">
              <LastDateIcon />
              <div className="test-sm">Last trade</div>
            </div>
            {userInfo?.last_activity ? (
              <div className="text-sm font-medium">
                <ReactTimeAgo
                  date={new Date(userInfo.last_activity)}
                  locale="en-US"
                />
              </div>
            ) : null}
            <DialogWalletAnalysis address={params.groupId} />
          </div>
          <div className="flex h-full w-full items-center justify-center">
            <WalletInfoPieChart address={params.groupId} total_balance={userInfo?.total_balance || 0}/>
          </div>
        </div>
        <WrapTable
          title="Wallet Overview"
          icon={
            <div className="rounded-full bg-[#182317] p-2">
              <IconSpotLight />
            </div>
          }
          childHeader={
            <SelectDurationLeaderboard
              duration={currentUserInfoDuration}
              setDuration={setUserInfoDuration}
              type="option3"
            />
          }
          className="relative order-3 flex h-[unset] w-full items-center gap-4 p-6 font-normal xl:order-2 xl:w-1/2"
        >
          <div className="h-px w-full bg-white/10" />
          <div className="flex w-full flex-col items-center gap-4 lg:flex-row">
            <div className="mt-2 w-full lg:w-1/2">
              <div className="flex w-full flex-col items-center justify-between gap-6 lg:flex-row">
                <div className="w-full lg:w-1/2">
                  <div className="text-neutral-300">Total Profit</div>
                  <div className="mt-2 w-full text-[32px] leading-[48px] text-core">
                    {userInfo?.total_pnl
                      ? `$${nFormatter(userInfo?.total_pnl)}`
                      : '-'}
                  </div>
                  <div className="mt-2 flex w-full items-center justify-between">
                    <div className="text-neutral-300">Realized</div>
                    <div
                      className={cn(
                        userInfo && userInfo?.realized_pnl > 0
                          ? 'text-core'
                          : 'text-red',
                      )}
                    >
                      {userInfo?.realized_pnl
                        ? `$${nFormatter(userInfo?.realized_pnl)}`
                        : '-'}
                    </div>
                  </div>
                  <div className="mt-2 flex w-full items-center justify-between">
                    <div className="text-neutral-300">Unrealized</div>
                    <div
                      className={cn(
                        userInfo && userInfo?.unrealized_pnl > 0
                          ? 'text-core'
                          : 'text-red',
                      )}
                    >
                      {userInfo?.unrealized_pnl
                        ? `$${nFormatter(userInfo?.unrealized_pnl)}`
                        : '-'}
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <div className="text-neutral-300">Total ROI</div>
                  <div className="mt-2 text-[32px] leading-[48px] text-core">
                    {numeral(userInfo?.roi_percent).format('0,0.[00]')}%
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-neutral-300">Realized</div>
                    <div
                      className={cn(
                        userInfo && userInfo?.roi_realized_percent > 0
                          ? 'text-core'
                          : 'text-red',
                      )}
                    >
                      {userInfo?.roi_realized_percent
                        ? numeral(userInfo?.roi_realized_percent).format(
                            '0,0.[00]%',
                          )
                        : '-'}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-neutral-300">Unrealized</div>
                    <div
                      className={cn(
                        userInfo && userInfo?.roi_unrealized_percent > 0
                          ? 'text-core'
                          : 'text-red',
                      )}
                    >
                      {userInfo?.roi_unrealized_percent
                        ? numeral(userInfo?.roi_unrealized_percent).format(
                            '0,0.[00]%',
                          )
                        : '-'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-8 h-px w-full bg-white/10" />
              <div className="flex w-full items-center justify-between gap-6">
                <div className="w-1/2">
                  <div className="text-neutral-300">Winrate</div>
                  <div className="mt-2 text-[32px] leading-[48px]">
                    {numeral(userInfo?.win_rate).format('0,0.[00]')}%
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-neutral-300">Win</div>
                    <div className="text-core">{userInfo?.token_win}</div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-neutral-300">Lose</div>
                    <div className="text-red">{userInfo?.token_loss}</div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="text-neutral-300"># of Trades</div>
                  <div className="mt-2 text-[32px] leading-[48px]">
                    {userInfo?.total}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-neutral-300">Buy</div>
                    <div className="text-core">{userInfo?.tx_buy}</div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-neutral-300">Sell</div>
                    <div className="text-red">{userInfo?.tx_sell}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-center lg:w-1/2">
              <WalletStatChart
                userInfoChart={userInfo?.user_info_chart_point}
              />
            </div>
          </div>
        </WrapTable>
        {/* right */}
        <WrapTable
          title="Wallet Spotlight"
          icon={
            <div className="rounded-full bg-[#182317] p-2">
              <IconSpotLight />
            </div>
          }
          childHeader={
            <SelectDurationLeaderboard
              duration={currentTradeStatisticDuration}
              setDuration={setTradeStatisticDuration}
              type="option3"
            />
          }
          className="relative order-2 flex h-auto w-full items-center justify-between gap-3 p-6 md:w-1/3 xl:order-3 xl:w-1/4"
        >
          <div className="h-px w-full bg-white/10" />
          <WalletInfoItemTitle
            name={DATA_STATS[0].name}
            icon={DATA_STATS[0].icon}
          />
          <WalletInfoItem
            imgUrl={DATA_STATS[0].imgUrl}
            symbol={DATA_STATS[0].symbol}
            chain={DATA_STATS[0].title}
            priceChangeH24={DATA_STATS[0].priceChangeH24}
            usdPrice={DATA_STATS[0].usdPrice}
            avg_price={DATA_STATS[0].avg_price}
            volume={DATA_STATS[0].volume}
            roi={DATA_STATS[0].roi}
            pnl={DATA_STATS[0].pnl}
            address={DATA_STATS[0].address}
            loading={tradeStatisticQuery.isFetching}
            data={DATA_STATS[0]}
          />
          <WalletInfoItemTitle
            name={DATA_STATS[1].name}
            icon={DATA_STATS[1].icon}
          />
          <WalletInfoItem
            imgUrl={DATA_STATS[1].imgUrl}
            symbol={DATA_STATS[1].symbol}
            chain={DATA_STATS[1].title}
            priceChangeH24={DATA_STATS[1].priceChangeH24}
            usdPrice={DATA_STATS[1].usdPrice}
            avg_price={DATA_STATS[1].avg_price}
            volume={DATA_STATS[1].volume}
            roi={DATA_STATS[1].roi}
            pnl={DATA_STATS[1].pnl}
            address={DATA_STATS[1].address}
            loading={tradeStatisticQuery.isFetching}
            data={DATA_STATS[1]}
          />
        </WrapTable>
      </div>
      {/* table */}
      <div className="mx-4 mb-0 mt-2 pb-4">
        <div className="flex h-full flex-col justify-start self-stretch rounded-2xl border border-solid border-white/10 bg-black bg-opacity-50 p-6 font-semibold leading-[160%] shadow-2xl backdrop-blur-lg max-md:px-5">
          <div className="inline-flex w-full">
            <div className="flex flex-1 items-center justify-start gap-4 self-stretch overflow-x-auto whitespace-nowrap py-2 text-center text-base font-medium leading-6 tracking-tight text-neutral-400 max-md:flex-wrap">
              {TABS.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={handleChangeTab(item)}
                    className={cn(
                      'cursor-pointer self-stretch font-medium',
                      item === tab ? 'text-neutral-100' : '',
                    )}
                  >
                    {item}
                    <div
                      className={cn(
                        'mt-2 h-px w-full',
                        item === tab ? 'active-tab-gradient' : 'bg-transparent',
                      )}
                    />
                  </div>
                )
              })}
            </div>
            <div> {renderFilterTab()}</div>
          </div>
          {renderTab()}
        </div>
      </div>
    </div>
  )
}
