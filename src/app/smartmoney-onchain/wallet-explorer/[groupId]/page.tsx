'use client'

import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useTradeStatisticQuery } from '@/query/wallet-explorer/getTradeStatistic'

import LastDateIcon from '@/components/shared/icons/wallet-explorer/LastDateIcon'
import BoughtIcon from '@/components/shared/icons/wallet-explorer/BoughtIcon'
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
import { SelectDuration } from '@/components/common/Select/SelectDuration'
import { TokenList } from '@/types/tokenList'
import { ImageToken } from '@/components/common/Image/ImageToken'
import Close from '@/components/shared/icons/Close'
import { Switch } from '@/components/ui/switch'
import numeral from 'numeral'
import { formatPriceNumber } from '@/lib/utils/formatPriceNumber'
import { WalletInfoPieChart } from '@/components/pages/wallet-detail/wallet-infor-pie-chart'
import IconSpotLight from '@/components/shared/icons/smart-traders/icon-spot-light'
import { WalletStatChart } from '@/components/pages/wallet-detail/wallet-stat-chart'
import IconCopyAddress from '@/components/shared/icons/icon-copy-address'
import { ImageRanking } from '@/components/common/Image/image-ranking'
import { ButtonChooseToken } from '@/components/common/Button/button-choose-token'

const TABS = ['Trade Statistic', 'Assets', 'Activity']

export default function WalletExplorerDetail({
  params,
}: {
  params: { groupId: string }
}) {
  const [tab, setTabs] = useState('Trade Statistic')
  const [duration, setDuration] = useState('24h')
  const [filterDateStatistic, setFilterDateStatistic] = useState('24h')
  const [listToken, setListToken] = useState<TokenList[]>([])
  const [hideSmallAsset, setHideSmallAsset] = useState(false)
  const [hideSmallTrade, setHideSmallTrade] = useState(false)
  const CHAIN = useAtomValue(chainAtom)
  const handleChangeTab = (tab: string) => () => {
    setTabs(tab)
  }

  const tradeStatisticQuery = useTradeStatisticQuery({
    address: params.groupId,
    chain: CHAIN,
    token_address: '',
    duration: '24h',
  })

  const tradeStatistic = tradeStatisticQuery?.data?.data

  const DATA_STATS = [
    {
      name: 'Most Bought 24h',
      icon: <BoughtIcon />,
      imgUrl: tradeStatistic?.most_buy?.imageUrl,
      title: tradeStatistic?.most_buy?.name,
      priceChangeH24: tradeStatistic?.most_buy?.priceChangeH24,
      symbol: tradeStatistic?.most_buy?.symbol,
      token_address: tradeStatistic?.most_buy_detail?.token_address,
      avg_price: tradeStatistic?.most_buy_detail?.avg_price,
      value_in_usdt: tradeStatistic?.most_buy_detail?.value_in_usdt,
      usdPrice: tradeStatistic?.most_buy?.usdPrice,
      volume: tradeStatistic?.most_buy_detail?.volume,
      roi: tradeStatistic?.most_buy_detail?.roi,
      pnl: tradeStatistic?.most_buy_detail?.pnl,
      chain: tradeStatistic?.most_buy?.chain,
      address: tradeStatistic?.most_buy?.tokenAddress,
    },
    {
      name: 'Most Profitable Token',
      icon: <BigestGainerIcon />,
      imgUrl: tradeStatistic?.most_profit?.imageUrl,
      title: tradeStatistic?.most_profit?.name,
      priceChangeH24: tradeStatistic?.most_profit?.priceChangeH24,
      symbol: tradeStatistic?.most_profit?.symbol,
      token_address: tradeStatistic?.most_profit_detail?.token_address,
      avg_price: tradeStatistic?.most_profit_detail?.avg_price,
      usdPrice: tradeStatistic?.most_profit?.usdPrice,
      volume: tradeStatistic?.most_profit_detail?.volume,
      roi: tradeStatistic?.most_profit_detail?.roi,
      pnl: tradeStatistic?.most_profit_detail?.pnl,
      chain: tradeStatistic?.most_profit?.chain,
      address: tradeStatistic?.most_profit?.tokenAddress,
    },
  ]

  // get user info
  const userInfoQuery = useGetUserInfoQuery({
    address: params.groupId,
    chain: CHAIN,
  })
  const userInfo = userInfoQuery?.data?.data.user_info

  const renderTab = () => {
    switch (tab) {
      case 'Trade Statistic':
        return (
          <Statistic
            filterDate={filterDateStatistic}
            address={params.groupId}
            chain={CHAIN}
            listToken={listToken}
          />
        )
      case 'Assets':
        return (
          <PortfolioComp
            address={params.groupId}
            chain={CHAIN}
            hideSmallAsset={hideSmallAsset}
          />
        )
      case 'Activity':
        return (
          <BigTradeActivity
            address={params.groupId}
            chain={CHAIN}
            hideSmallTrade={hideSmallTrade}
          />
        )
    }
  }

  const handleRemoveToken = (item: TokenList) => (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const newListToken = listToken.filter(
      (token) => token.tokenAddress !== item.tokenAddress,
    )
    setListToken([...newListToken])
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
                      className="h-9 rounded-3xl bg-gradient-to-r from-[#9945FF] to-[#14F195] p-px shadow-lg backdrop-blur-[2px]"
                      key={item.tokenAddress}
                    >
                      <div className="flex h-full cursor-pointer items-center justify-center gap-1 rounded-3xl bg-neutral-07 px-4 text-sm leading-5 tracking-normal text-white">
                        <ImageToken
                          imgUrl={item?.imageUrl}
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
            <SelectDuration
              duration={filterDateStatistic}
              setDuration={setFilterDateStatistic}
            />
          </div>
        )
      case 'Assets':
        return (
          <div className="flex items-center gap-4">
            <span className="text-sm font-normal not-italic leading-5 tracking-[-0.14px]">
              {`Hide Small Assets (<$1K)`}
            </span>
            <Switch
              checked={hideSmallAsset}
              onCheckedChange={(checked: boolean) => setHideSmallAsset(checked)}
            />
          </div>
        )
      case 'Activity':
        return (
          <div className="flex items-center gap-4">
            <span className="text-sm font-normal not-italic leading-5 tracking-[-0.14px]">
              {`Hide Small Trades (<$1K)`}
            </span>
            <Switch
              checked={hideSmallTrade}
              onCheckedChange={(checked: boolean) => setHideSmallTrade(checked)}
            />
          </div>
        )
    }
  }

  return (
    <div className="h-full w-full">
      <div className="mx-4 mt-2 flex flex-col justify-center gap-2 self-stretch md:flex-row md:flex-wrap xl:flex-nowrap">
        {/* left */}
        <div className="max-w-1/2 flex w-full flex-col gap-4 self-stretch overflow-hidden rounded-2xl border border-solid border-white/10 bg-black/50 p-4 shadow-2xl backdrop-blur-lg md:w-1/2 xl:w-1/4">
          <div className="flex flex-col gap-2">
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
                    href={`https://solscan.io/account/${params.groupId}`}
                    target="_blank"
                  >
                    <Image
                      loading="lazy"
                      src="/images/scan.webp"
                      className="h-[23px] w-[23px]"
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
            <div className="flex gap-2 px-5 text-base tracking-normal text-zinc-300">
              <div className="flex items-center gap-1 text-neutral-400">
                <LastDateIcon />
                <div>Last trade</div>
              </div>
              {userInfo?.last_activity ? (
                <div className="font-medium">
                  <ReactTimeAgo
                    date={new Date(userInfo.last_activity)}
                    locale="en-US"
                  />
                </div>
              ) : null}
            </div>
          </div>
          <WalletInfoPieChart address={params.groupId} />
        </div>
        <WrapTable
          title="Wallet Overview"
          icon={<IconSpotLight />}
          childHeader={
            <SelectDuration duration={duration} setDuration={setDuration} />
          }
          className="relative order-3 flex h-[unset] w-full items-center gap-4 p-6 font-normal xl:order-2 xl:w-1/2"
        >
          <div className="h-px w-full bg-white/10" />
          <div className="flex w-full gap-6">
            <div className="mt-2 w-[55%]">
              <div className="flex w-full items-center justify-between gap-16">
                <div className="w-1/2">
                  <div className="text-neutral-300">Total Profit</div>
                  <div className="mt-2 text-[32px] leading-[48px] text-core">
                    {userInfo?.total_pnl
                      ? `${formatPriceNumber(userInfo?.total_pnl)}`
                      : '-'}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-neutral-300">Realized</div>
                    <div className="text-core">
                      {userInfo?.realized_pnl
                        ? `${formatPriceNumber(userInfo?.realized_pnl)}`
                        : '-'}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-neutral-300">Unrealized</div>
                    <div className="text-red">
                      {userInfo?.unrealized_pnl
                        ? `${formatPriceNumber(userInfo?.unrealized_pnl)}`
                        : '-'}
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="text-neutral-300">Total ROI</div>
                  <div className="mt-2 text-[32px] leading-[48px] text-core">
                    {numeral(userInfo?.roi_percent).format('0,0.[00]')}%
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-neutral-300">Realized</div>
                    <div className="text-core">
                      {userInfo?.roi_realized_percent
                        ? `${formatPriceNumber(userInfo?.roi_realized_percent)}`
                        : '-'}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-neutral-300">Unrealized</div>
                    <div className="text-red">
                      {userInfo?.roi_unrealized_percent
                        ? `${formatPriceNumber(
                            userInfo?.roi_unrealized_percent,
                          )}`
                        : '-'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-8 h-px w-full bg-white/10" />
              <div className="flex w-full items-center justify-between gap-16">
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
                    {Number(userInfo?.tx_buy || 0) +
                      Number(userInfo?.tx_sell || 0)}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-neutral-300">Buy</div>
                    <div className="text-core">
                      {Number(userInfo?.tx_buy || 0)}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-neutral-300">Sell</div>
                    <div className="text-red">
                      {Number(userInfo?.tx_sell || 0)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-[45%] items-center justify-center">
              <WalletStatChart
                userInfoChart={userInfo?.user_info_chart_point}
              />
            </div>
          </div>
        </WrapTable>
        {/* right */}
        <WrapTable
          title="Wallet Spotlight"
          icon={<IconSpotLight />}
          childHeader={
            <SelectDuration duration={duration} setDuration={setDuration} />
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
