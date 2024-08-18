'use client'

import { LineChart } from '@/components/common/Chart/ChartDetail/LineChart'
import { OngoingSignals } from '@/components/pages/trading-signal/OnGoingSignals'
import { ROIAlanyst } from '@/components/pages/trading-signal/ROIAnalyst'
import { SignalTriggered } from '@/components/pages/trading-signal/SignalTriggered'
import ArrowRightIcon from '@/components/shared/icons/ArrowRight'
import IconUSDT from '@/components/shared/icons/token/usdt'
import { cn } from '@/lib/utils'
import { useGetChannelDetailQuery } from '@/query/trading-signal/getChannelDetail'
import Link from 'next/link'
import { useState } from 'react'

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

const TABS = ['Ongoing Signals', 'Signal Triggered', 'ROI Analyst']

export default function TradingSignalDetail({
  params,
}: {
  params: { channelId: string }
}) {
  const [tab, setTabs] = useState('Ongoing Signals')

  const channelDetailQuery = useGetChannelDetailQuery({ id: params.channelId })

  const dataChannelDetail = channelDetailQuery?.data?.data

  const handleChangeTab = (tab: string) => () => {
    setTabs(tab)
  }

  const renderContentTab = (tab: string) => {
    switch (tab) {
      case 'Ongoing Signals':
        return <OngoingSignals id={params.channelId} />
      case 'Signal Triggered':
        return <SignalTriggered id={params.channelId} />
      case 'ROI Analyst':
        return <ROIAlanyst id={params.channelId} />
    }
    return null
  }

  return (
    <div className="flex flex-col self-stretch p-10 max-md:px-5">
      <div className="flex items-center gap-0 text-xl leading-8 tracking-tight max-md:max-w-full max-md:flex-wrap">
        <Link href="/trading-signal" className="text-gray-400">
          Kaivest Trading Signal
        </Link>
        <ArrowRightIcon />
        <div className="flex-auto text-gray-200 max-md:max-w-full">
          KAI AI Signal
        </div>
      </div>
      <div className="my-4 h-px w-full bg-white/10"></div>
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
          <div className="flex flex-col justify-center px-5 leading-[123%] max-md:mt-4 max-md:max-w-full">
            <div className="flex items-center gap-5 pr-20 leading-[150%] max-md:flex-wrap max-md:pr-5">
              <div className="text-3xl font-bold text-gray-300">
                {dataChannelDetail?.name}
              </div>
              <div className="h-12 rounded-3xl bg-gradient-to-r from-[#9945FF] to-[#14F195] p-px shadow-lg backdrop-blur-[2px]">
                <div className="flex h-full cursor-pointer items-center justify-center rounded-3xl bg-neutral-07 px-7 text-sm leading-5 tracking-normal text-white">
                  Follow Signal
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm font-bold tracking-normal text-gray-500 max-md:max-w-full">
              Introduction
            </div>
            <div className="mt-4 text-base leading-6 tracking-normal text-zinc-50 max-md:max-w-full">
              Kaivest AI signal delves into comprehensive market trend analysis,
              evaluation, and prediction based on a series of critical
              indicators. It incorporates multi-source data from on-chain
              information, technical analysis, and sentiment analysis.
            </div>
            <div className="mt-4 text-sm font-bold tracking-normal text-gray-500 max-md:max-w-full">
              Risk Control
            </div>
            <div className="mt-4 text-base leading-6 tracking-normal max-md:max-w-full">
              Trade Size:{' '}
              <span className="font-medium">Use 1% margin of your account</span>
              <br />
              Leverage: <span className="font-medium">25x (Cross Margin)</span>
              <br />
              Default SL: <span className="text-red-400">5%</span>
              <br />
              Take Profit Levels:{' '}
              <span className="text-green-500">2% - 4% - 6% - 8%</span>
            </div>
          </div>
        </div>
        <div className="ml-5 flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
          <div className="flex grow flex-col justify-center max-md:mt-4 max-md:max-w-full">
            <div className="flex flex-col justify-center rounded-xl border border-solid border-white/10 bg-neutral-07/30 p-4 max-md:max-w-full">
              <div className="flex justify-between gap-0 max-md:flex-wrap">
                <div className="flex flex-1 flex-col">
                  <div className="text-sm font-bold leading-4 tracking-normal text-neutral-04">
                    3D ROI
                  </div>
                  <div
                    className={cn(
                      'mt-2 text-3xl leading-10',
                      dataChannelDetail?.thirtyDaysROI &&
                        dataChannelDetail.thirtyDaysROI > 0
                        ? 'text-green-500'
                        : 'text-red-400',
                    )}
                  >
                    {dataChannelDetail?.thirtyDaysROI &&
                    dataChannelDetail.thirtyDaysROI > 0
                      ? '+'
                      : '-'}
                    {dataChannelDetail?.thirtyDaysROI
                      ? dataChannelDetail.thirtyDaysROI.toFixed(2)
                      : '-'}
                    %
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <div className="w-full whitespace-nowrap text-right text-sm font-bold leading-4 tracking-normal text-neutral-04">
                    Winrate
                  </div>
                  <div className="mt-2 text-right text-3xl leading-10 text-gray-300">
                    {dataChannelDetail?.winRate
                      ? dataChannelDetail.winRate.toFixed(2)
                      : '-'}
                    %
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <div className="w-full whitespace-nowrap text-right text-sm font-bold leading-4 tracking-normal text-neutral-04">
                    Follower
                  </div>
                  <div className="mt-2 text-right text-3xl leading-10 text-gray-300">
                    0
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <div className="self-end text-sm font-bold leading-4 tracking-normal text-neutral-04">
                    Max drawdown
                  </div>
                  <div className="mt-2 text-right text-3xl leading-10 text-error-500">
                    0%
                  </div>
                </div>
              </div>
              <div className="h-16 opacity-10">
                <LineChart
                  dataTokenInfo={null}
                  sparkLineIn7D={DUMMY_CHART}
                  loading={false}
                  setValueIndex={() => null}
                  showDate={false}
                />
              </div>
              <div className="mt-4 flex justify-between gap-3 text-sm font-bold leading-4 tracking-normal text-zinc-400 max-md:max-w-full max-md:flex-wrap">
                <div>
                  <span className="text-neutral-04">
                    {dataChannelDetail?.runtime}
                  </span>{' '}
                  Runtime
                </div>
                <div className="my-auto h-2 w-0.5 shrink-0 rounded-sm bg-zinc-800" />
                <div>
                  <span className="text-neutral-04">
                    {dataChannelDetail?.total7DaysSignals}
                  </span>{' '}
                  <span className="text-neutral-07">
                    Signal in the last 7 days
                  </span>
                </div>
              </div>
            </div>
            <div className="relative mt-4 flex flex-col justify-center rounded-xl border border-solid border-white/10 bg-neutral-07/30 p-4 max-md:max-w-full">
              <div className="flex justify-between gap-1 opacity-10 max-md:max-w-full max-md:flex-wrap">
                <div className="flex flex-col justify-center pr-2.5">
                  <div className="text-sm font-bold leading-4 tracking-normal text-neutral-02">
                    3D backtested APY
                  </div>
                  <div className="mt-2 text-3xl leading-10 text-neutral-03">
                    167.43%
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="ml-5 self-start text-sm font-bold leading-4 tracking-normal text-neutral-02 max-md:ml-2.5">
                    Supported trading pairs
                  </div>
                  <div className="mt-2 flex gap-2">
                    <div className="my-auto flex gap-2">
                      <IconUSDT className="aspect-[0.93] w-6 shrink-0" />
                      <IconUSDT className="aspect-square w-[26px] shrink-0" />
                      <IconUSDT className="aspect-square w-[26px] shrink-0" />
                    </div>
                    <div className="text-right text-3xl leading-10 text-neutral-02">
                      180+
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inline-block w-full items-center justify-center bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-xl font-medium text-transparent">
                Coming Soon
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-start gap-4 self-stretch py-2 text-center text-lg font-medium leading-6 tracking-tight text-neutral-400 max-md:flex-wrap">
          {TABS.map((item, index) => {
            return (
              <div
                key={index}
                onClick={handleChangeTab(item)}
                className={cn(
                  'cursor-pointer self-stretch px-3 py-2',
                  item === tab
                    ? 'tab-explorer justify-center whitespace-nowrap border border-solid border-white/10 text-white'
                    : 'my-auto',
                )}
              >
                {item}
              </div>
            )
          })}
        </div>
        {renderContentTab(tab)}
      </div>
    </div>
  )
}
