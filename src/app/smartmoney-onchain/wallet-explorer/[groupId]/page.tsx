'use client'

import AvatarIcon from '@/components/shared/icons/Avatar'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useTradeStatisticQuery } from '@/query/wallet-explorer/getTradeStatistic'

import { LineChart } from '@/components/common/Chart/ChartDetail/LineChart'
import CopyIcon from '@/components/shared/icons/wallet-explorer/CopyIcon'
import LastDateIcon from '@/components/shared/icons/wallet-explorer/LastDateIcon'
import BoughtIcon from '@/components/shared/icons/wallet-explorer/BoughtIcon'
import BigestGainerIcon from '@/components/shared/icons/wallet-explorer/BigestGainerIcon'
import { CopyCustom } from '@/components/common/CopyCustom'
import { useGetUserInfoQuery } from '@/query/wallet-explorer/getUserInfo'
import { nFormatter } from '@/lib/utils/nFormatter'
import ReactTimeAgo from 'react-time-ago'
import { PortfolioComp } from '@/components/pages/wallet-detail/Portfolio'
import { useGetUserBalanceQuery } from '@/query/wallet-explorer/getUserBalance'
import { Statistic } from '@/components/pages/wallet-detail/Statistic'
import { BigTradeActivity } from '@/components/pages/wallet-detail/BigTradeActivity'
import ExternalLinkIcon from '@/components/shared/icons/wallet-explorer/ExternalLink'
import {
  WalletInfoItem,
  WalletInfoItemTitle,
} from '@/components/pages/wallet-detail/WalletInfoItem'
import { IconUptrend } from '@/components/shared/icons/IconUptrend'
import { IconChart } from '@/components/shared/icons/IconChart'
import { useQuery } from '@tanstack/react-query'
import Skeleton from '@/components/common/Skeleton'
import { cn } from '@/lib/utils'
import { SelectDuration } from '@/components/common/SelectDuration'
import { useState } from 'react'
import { FirstTimeBuy } from '@/components/pages/wallet-detail/FirstTimeBuy'

const DUMMY_CHART = [
  [1700582400, 3.2820760583722837],
  [1700596800, 1.293678752367937],
  [1700611200, 2.267607134722679],
  [1700625600, 1.2383452159168096],
  [1700640000, 1.2713647267275487],
  [1700654400, 6.2849299222571455],
  [1700668800, 1.2812792112861628],
  [1700683200, 1.285411599501722],
  [1700697600, 7.304992187923194],
  [1700712000, 1.3025387325266873],
  [1700726400, 1.3101804211155927],
  [1700740800, 1.3364311866861343],
  [1700755200, 1.3574309481187357],
  [1700769600, 9.3420127842033551],
  [1700784000, 1.3613067184270784],
  [1700798400, 1.8632495568806504],
  [1700812800, 1.3694888962263747],
  [1700827200, 1.6761433222446537],
  [1700841600, 1.878710860154058],
  [1700856000, 1.4008211214315036],
  [1700870400, 1.3716115965345537],
  [1700884800, 1.366702161216628],
  [1700899200, 1.3818821947181688],
  [1700913600, 1.3814228210891752],
  [1700928000, 1.3573893566747037],
  [1700942400, 1.365540065327867],
  [1700956800, 1.3677196547919548],
  [1700971200, 1.3684873657780736],
  [1700985600, 1.367661884521799],
  [1701000000, 1.378807753589557],
  [1701014400, 1.371757678574763],
  [1701028800, 1.3549718023010506],
  [1701043200, 1.3597396116316751],
  [1701057600, 1.3689482638454455],
  [1701072000, 1.3459421066735182],
  [1701086400, 1.329871889398035],
  [1701100800, 1.3196045314155003],
  [1701115200, 5.309947025324972],
  [1701129600, 8.2978960445684065],
  [1701144000, 2.3226601297295046],
  [1701158400, 3.3206287657374929],
  [1701172800, 10.3115544795935061],
  [1701187200, 3.3333333333333333],
]

export default function WalletExplorerDetail({
  params,
}: {
  params: { groupId: string }
}) {
  const CHAIN = useAtomValue(chainAtom)
  const [duration, setDuration] = useState('24h')

  const tradeStatisticQuery = useQuery(
    useTradeStatisticQuery({
      address: params.groupId,
      chain: CHAIN,
      token_address: '',
      duration,
    }),
  )

  const tradeStatistic = tradeStatisticQuery?.data

  const userBalanceQuery = useQuery(
    useGetUserBalanceQuery({
      address: params.groupId,
      chain: CHAIN,
      duration,
    }),
  )
  const userBalance = userBalanceQuery?.data

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
      price: tradeStatistic?.most_buy?.usdPrice,
    },
    {
      name: 'Most Profitable Token',
      icon: <BoughtIcon />,
      imgUrl: tradeStatistic?.most_profit?.imageUrl,
      title: tradeStatistic?.most_profit?.name,
      priceChangeH24: tradeStatistic?.most_profit?.priceChangeH24,
      symbol: tradeStatistic?.most_profit?.symbol,
      token_address: tradeStatistic?.most_profit_detail?.token_address,
      avg_price: tradeStatistic?.most_profit_detail?.avg_price,
      value_in_usdt: tradeStatistic?.most_profit_detail?.value_in_usdt,
      usdPrice: tradeStatistic?.most_profit?.usdPrice,
      volume: tradeStatistic?.most_profit_detail?.volume,
      roi: tradeStatistic?.most_profit_detail?.roi,
      pnl: tradeStatistic?.most_profit_detail?.pnl,
      chain: tradeStatistic?.most_profit?.chain,
      address: tradeStatistic?.most_profit?.tokenAddress,
      price: tradeStatistic?.most_profit?.usdPrice,
    },
  ]

  // get user info
  const userInfoQuery = useQuery(
    useGetUserInfoQuery({
      address: params.groupId,
      chain: CHAIN,
      duration,
    }),
  )

  const userInfo = userInfoQuery?.data?.user_info

  return (
    <div className="h-full w-full">
      <div className="flex justify-center gap-2 self-stretch">
        {/* left */}
        <div className="flex w-1/2 flex-col self-stretch overflow-hidden rounded-2xl border border-solid border-[#EFEFEF] bg-neutral-01 p-6 shadow-lg">
          <div className="flex items-start justify-between max-md:flex-wrap">
            <div className="flex gap-2">
              {userInfoQuery.isFetching ? (
                <div className="h-24 w-24 overflow-hidden rounded-full">
                  <Skeleton />
                </div>
              ) : (
                <AvatarIcon className="aspect-square w-24" />
              )}
              <div className="flex flex-col justify-end leading-[160%]">
                <div className="text-xl font-bold tracking-tight text-neutral-04">
                  Whale Untag
                </div>
                {userInfoQuery.isFetching ? (
                  <Skeleton className="h-[30px] w-[200px] overflow-hidden rounded-full" />
                ) : (
                  <div className="mt-2 flex gap-1 whitespace-nowrap pr-5 text-base leading-6 tracking-normal text-gray-400">
                    <div>{`${params.groupId?.substring(
                      0,
                      6,
                    )}...${params.groupId?.slice(-6)}`}</div>
                    <CopyCustom value={params.groupId} icon={<CopyIcon />} />
                    <a href={userInfo?.scan_link} target="_blank">
                      <ExternalLinkIcon />
                    </a>
                  </div>
                )}
                <div className="mt-1 flex gap-2 text-base tracking-normal text-zinc-300">
                  <div className="flex items-center gap-1">
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
            </div>
            <div>
              <SelectDuration duration={duration} setDuration={setDuration} />
            </div>
          </div>
          <div className="mt-6 flex justify-center max-md:flex-wrap">
            <div className="flex flex-col">
              <div className="flex gap-2 whitespace-nowrap text-xl font-semibold leading-5 tracking-normal text-neutral-07">
                Total Balance
              </div>
              <div className="mt-1 text-[32px] font-semibold leading-[48px] text-neutral-07">
                {userBalanceQuery.isFetching ? (
                  <div className="h-4 w-40 overflow-hidden rounded-2xl">
                    <Skeleton />
                  </div>
                ) : (
                  <>${nFormatter(userBalance?.total_balance || 0)}</>
                )}
              </div>
            </div>
            <div className="my-auto flex flex-1 items-center justify-end gap-5 max-md:flex-wrap">
              <div className="flex items-center gap-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#B5E4CA] text-2xl text-black">
                  $
                </div>
                <div className="flex flex-col whitespace-nowrap">
                  <div className="text-[15px] font-semibold leading-6 text-neutral-07">
                    PnL
                  </div>
                  <div
                    className={cn(
                      'mt-1 text-xl font-semibold leading-9',
                      (userInfo?.pnl as number) > 0
                        ? 'text-success-500'
                        : 'text-error-500',
                    )}
                  >
                    {userInfoQuery.isFetching ? (
                      <div className="h-4 w-12 overflow-hidden rounded-2xl">
                        <Skeleton />
                      </div>
                    ) : (
                      <>${nFormatter(userInfo?.pnl || 0)}</>
                    )}
                  </div>
                </div>
              </div>
              <div className="h-12 w-px bg-neutral-03" />
              <div className="flex items-center gap-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#B1E5FC] text-2xl text-black">
                  <IconUptrend />
                </div>
                <div className="flex flex-col">
                  <div className="text-[15px] font-semibold leading-6 text-neutral-07">
                    ROI
                  </div>
                  <div
                    className={cn(
                      'mt-1 text-xl font-semibold leading-9',
                      (userInfo?.roi_percent as number) > 0
                        ? 'text-success-500'
                        : 'text-error-500',
                    )}
                  >
                    {userInfoQuery.isFetching ? (
                      <div className="h-4 w-12 overflow-hidden rounded-2xl">
                        <Skeleton />
                      </div>
                    ) : (
                      <>{userInfo?.roi_percent?.toFixed(2)}%</>
                    )}
                  </div>
                </div>
              </div>
              <div className="h-12 w-px bg-neutral-03" />
              <div className="flex items-center gap-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#B1E5FC] text-2xl text-black">
                  <IconChart />
                </div>
                <div className="flex flex-col">
                  <div className="text-[15px] font-semibold leading-6 text-neutral-07">
                    Volume
                  </div>
                  <div className="mt-1 text-xl font-semibold leading-9 text-neutral-07">
                    {userInfoQuery.isFetching ? (
                      <div className="h-4 w-12 overflow-hidden rounded-2xl">
                        <Skeleton />
                      </div>
                    ) : (
                      <>${nFormatter(userInfo?.volume_24h || 0)}</>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full w-full overflow-hidden pr-5">
            <LineChart
              dataTokenInfo={null}
              sparkLineIn7D={DUMMY_CHART}
              loading={userBalanceQuery.isFetching}
              setValueIndex={() => null}
              showDate={false}
            />
          </div>
        </div>
        {/* right */}
        <div className="relative flex w-1/2 flex-col items-center gap-2">
          <div className="flex w-full gap-2">
            <div className="h-full w-full rounded-2xl border border-solid border-[#EFEFEF] bg-neutral-01 p-4 shadow-lg">
              <WalletInfoItemTitle
                name={DATA_STATS[0].name}
                icon={<div className="h-4 w-4 rounded-[4px] bg-secondary-3" />}
              />
              <WalletInfoItem
                imgUrl={DATA_STATS[0].imgUrl}
                symbol={DATA_STATS[0].symbol}
                name={DATA_STATS[0].title}
                priceChangeH24={DATA_STATS[0].priceChangeH24}
                usdPrice={DATA_STATS[0].usdPrice}
                avg_price={DATA_STATS[0].avg_price}
                spent={DATA_STATS[0].volume}
                roi={DATA_STATS[0].roi}
                pnl={DATA_STATS[0].pnl}
                address={DATA_STATS[0].address}
                price={DATA_STATS[0].price}
                loading={tradeStatisticQuery.isFetching}
              />
            </div>
            <div className="h-full w-full rounded-2xl border border-solid border-[#EFEFEF] bg-neutral-01 p-4 shadow-lg">
              <WalletInfoItemTitle
                name={DATA_STATS[1].name}
                icon={<div className="h-4 w-4 rounded-[4px] bg-secondary-3" />}
              />
              <WalletInfoItem
                imgUrl={DATA_STATS[1].imgUrl}
                symbol={DATA_STATS[1].symbol}
                name={DATA_STATS[1].title}
                priceChangeH24={DATA_STATS[1].priceChangeH24}
                usdPrice={DATA_STATS[1].usdPrice}
                avg_price={DATA_STATS[1].avg_price}
                spent={DATA_STATS[1].volume}
                roi={DATA_STATS[1].roi}
                pnl={DATA_STATS[1].pnl}
                address={DATA_STATS[1].address}
                loading={tradeStatisticQuery.isFetching}
              />
            </div>
          </div>
          <div className="h-full w-full rounded-2xl border border-solid border-[#EFEFEF] bg-neutral-01 p-4 shadow-lg">
            <FirstTimeBuy address={params.groupId} chain={CHAIN} />
          </div>
        </div>
      </div>
      {/* table */}
      <div className="mt-2 flex h-full w-auto gap-2">
        <div className="w-1/2">
          <PortfolioComp address={params.groupId} chain={CHAIN} />
        </div>
        <div className="w-1/2">
          <Statistic address={params.groupId} chain={CHAIN} />
        </div>
      </div>
      {/* table */}
      <div className="mb-0 mt-2 pb-10">
        <BigTradeActivity address={params.groupId} chain={CHAIN} />
      </div>
    </div>
  )
}
