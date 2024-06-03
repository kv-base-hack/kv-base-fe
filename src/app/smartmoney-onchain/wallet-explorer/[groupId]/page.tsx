'use client'

import AvatarIcon from '@/components/shared/icons/Avatar'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useTradeStatisticQuery } from '@/query/wallet-explorer/getTradeStatistic'

import { LineChart } from '@/components/common/Chart/ChartDetail/LineChart'
import CopyIcon from '@/components/shared/icons/wallet-explorer/CopyIcon'
import LastDateIcon from '@/components/shared/icons/wallet-explorer/LastDateIcon'
import TotalBalanceIcon from '@/components/shared/icons/wallet-explorer/TotalBalanceIcon'
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
import ArrowLeftIcon from '@/components/shared/icons/ArrowLeft'
import ArrowRightIcon from '@/components/shared/icons/ArrowRight'
import FirstTimeBuyIcon from '@/components/shared/icons/wallet-explorer/FirstTimeBuyIcon'

const DUMMY_CHART = [
  [1700582400, 1.2820760583722837],
  [1700596800, 1.293678752367937],
  [1700611200, 1.267607134722679],
  [1700625600, 1.2383452159168096],
  [1700640000, 1.2713647267275487],
  [1700654400, 1.2849299222571455],
  [1700668800, 1.2812792112861628],
  [1700683200, 1.285411599501722],
  [1700697600, 1.304992187923194],
  [1700712000, 1.3025387325266873],
  [1700726400, 1.3101804211155927],
  [1700740800, 1.3364311866861343],
  [1700755200, 1.3574309481187357],
  [1700769600, 1.3420127842033551],
  [1700784000, 1.3613067184270784],
  [1700798400, 1.3632495568806504],
  [1700812800, 1.3694888962263747],
  [1700827200, 1.3761433222446537],
  [1700841600, 1.3878710860154058],
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
  [1701115200, 1.309947025324972],
  [1701129600, 1.2978960445684065],
  [1701144000, 1.3226601297295046],
  [1701158400, 1.3206287657374929],
  [1701172800, 1.3115544795935061],
  [1701187200, 1.3333333333333333],
]

export default function WalletExplorerDetail({
  params,
}: {
  params: { groupId: string }
}) {
  const CHAIN = useAtomValue(chainAtom)

  const tradeStatisticQuery = useTradeStatisticQuery({
    address: params.groupId,
    chain: CHAIN,
    token_address: '',
    duration: '24h',
  })

  const tradeStatistic = tradeStatisticQuery?.data?.data

  const userBalanceQuery = useGetUserBalanceQuery({
    address: params.groupId,
    chain: CHAIN,
  })
  const userBalance = userBalanceQuery?.data?.data

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
      name: 'Biggest Gainer',
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

  return (
    <div className="w-full h-full pt-2">
      <div className="flex mx-10 mt-4 gap-4 justify-center self-stretch">
        {/* left */}
        <div className="flex flex-col w-1/2 self-stretch p-5 rounded-lg border border-solid shadow-lg backdrop-blur-lg bg-neutral-07/50 border-white/10 max-w-1/2">
          <div className="flex gap-2 max-md:flex-wrap">
            <div className="flex gap-2">
              <AvatarIcon className="w-24 aspect-square" />
              <div className="flex flex-col justify-end leading-[160%]">
                <div className="text-xl font-bold tracking-tight text-white text-opacity-90">
                  Whale Untag
                </div>
                <div className="flex gap-1 pr-5 mt-2 text-base tracking-normal leading-6 text-gray-400 whitespace-nowrap">
                  <div>{`${params.groupId?.substring(
                    0,
                    6,
                  )}...${params.groupId?.slice(-6)}`}</div>
                  <CopyCustom value={params.groupId} icon={<CopyIcon />} />
                  <a
                    href={`https://solscan.io/account/${params.groupId}`}
                    target="_blank"
                  >
                    <ExternalLinkIcon />
                  </a>
                </div>
                <div className="flex gap-2 mt-1 text-base tracking-normal text-zinc-300">
                  <div className="flex gap-1 items-center">
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
          </div>
          <div className="flex gap-5 justify-center mt-6 max-md:flex-wrap">
            <div className="flex flex-col">
              <div className="flex gap-2 text-sm font-medium tracking-normal leading-5 text-white">
                <TotalBalanceIcon />
                <div>Total Balance</div>
              </div>
              <div className="mt-1 text-3xl leading-10 text-white">
                {nFormatter(userBalance?.total_balance || 0)}$
              </div>
            </div>
            <div className="flex items-center justify-end flex-1 gap-5 pl-20 my-auto max-md:flex-wrap">
              <div className="flex flex-col px-3 whitespace-nowrap">
                <div className="text-sm leading-5 text-white">3D PnL</div>
                <div className="mt-1 text-2xl leading-9 text-success-500">
                  {nFormatter(userInfo?.pnl || 0)}$
                </div>
              </div>
              <div className="h-12 w-px bg-neutral-05" />
              <div className="flex flex-col">
                <div className="text-sm leading-5 text-white">3D ROI</div>
                <div className="mt-1 text-2xl leading-9 text-success-500">
                  {userInfo?.roi_percent.toFixed(2)}%
                </div>
              </div>
              <div className="h-12 w-px bg-neutral-05" />
              <div className="flex flex-col">
                <div className="text-sm leading-5 text-white">Volume 24h</div>
                <div className="mt-1 text-2xl leading-9 text-white">
                  {nFormatter(userInfo?.volume_24h || 0)}$
                </div>
              </div>
            </div>
          </div>
          <div className="h-full">
            <LineChart
              dataTokenInfo={null}
              sparkLineIn7D={DUMMY_CHART}
              loading={false}
              setValueIndex={() => null}
              showDate={false}
            />
          </div>
        </div>
        {/* right */}
        <div className="w-1/2 relative flex items-center gap-4">
          <div className="flex w-full flex-col p-4 rounded-2xl border border-solid shadow-lg backdrop-blur-[32px] bg-stone-900 bg-opacity-50 border-white/10">
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
              spent={DATA_STATS[0].volume}
              roi={DATA_STATS[0].roi}
              pnl={DATA_STATS[0].pnl}
              address={DATA_STATS[0].address}
            />
            <div className="mt-4" />
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
              spent={DATA_STATS[1].volume}
              roi={DATA_STATS[1].roi}
              pnl={DATA_STATS[1].pnl}
              address={DATA_STATS[1].address}
            />
          </div>
          <div className="flex w-full opacity-10 flex-col p-4 rounded-2xl border border-solid shadow-lg backdrop-blur-[32px] bg-stone-900 bg-opacity-50 border-white/10">
            <WalletInfoItemTitle
              name="First Time Buy"
              icon={<FirstTimeBuyIcon />}
            />
            <WalletInfoItem
              imgUrl={DATA_STATS[0].imgUrl}
              symbol={DATA_STATS[0].symbol}
              chain={DATA_STATS[0].title}
              priceChangeH24={DATA_STATS[0].priceChangeH24}
              usdPrice={DATA_STATS[0].usdPrice}
              avg_price={DATA_STATS[0].avg_price}
              spent={DATA_STATS[0].volume}
              roi={DATA_STATS[0].roi}
              pnl={DATA_STATS[0].pnl}
            />
            <WalletInfoItem
              imgUrl={DATA_STATS[1].imgUrl}
              symbol={DATA_STATS[1].symbol}
              chain={DATA_STATS[1].title}
              priceChangeH24={DATA_STATS[1].priceChangeH24}
              usdPrice={DATA_STATS[1].usdPrice}
              avg_price={DATA_STATS[1].avg_price}
              spent={DATA_STATS[1].volume}
              roi={DATA_STATS[1].roi}
              pnl={DATA_STATS[1].pnl}
            />
            <div className="mt-4 flex w-full items-center justify-between">
              <ArrowLeftIcon />
              <ArrowRightIcon />
            </div>
          </div>
        </div>
      </div>
      {/* table */}
      <div className="flex w-auto mx-10 mt-10 gap-4">
        <div className="w-1/2">
          <PortfolioComp address={params.groupId} chain={CHAIN} />
        </div>
        <div className="w-1/2">
          <Statistic address={params.groupId} chain={CHAIN} />
        </div>
      </div>
      {/* table */}
      <div className="m-10 mb-0 pb-10">
        <BigTradeActivity address={params.groupId} chain={CHAIN} />
      </div>
    </div>
  )
}
