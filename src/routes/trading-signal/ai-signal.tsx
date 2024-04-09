import { LineChart } from '@/components/common/ChartDetail/LineChart'
import { DataTable } from '@/components/common/DataTable'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { columnsActivity } from '@/components/common/DataTable/columnsActivity'
import { PaginationCustom } from '@/components/common/Pagination'
import ArrowDownIcon from '@/components/shared/icons/ArrowDownIcon'
import ArrowRightIcon from '@/components/shared/icons/ArrowRight'
import { cn } from '@/lib/utils'
import { useActivityQuery } from '@/query/onchain-signal/getActivity'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/trading-signal/ai-signal')({
  component: AISignal,
})

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

const RightGroup = () => {
  return (
    <div className="flex gap-4 justify-between px-3 text-gray-500 rounded-lg">
      <div className="flex items-center gap-2 justify-between px-4 py-2 rounded-xl border-2 border-solid border-white/10">
        <div className="grow">Token</div>
        <ArrowDownIcon />
      </div>
      <div className="flex items-center gap-2 justify-between px-4 py-2 rounded-xl border-2 border-solid border-white/10">
        <div className="grow">Action</div>
        <ArrowDownIcon />
      </div>
    </div>
  )
}

function AISignal() {
  const [tab, setTabs] = useState('Profit and Loss Analysis')
  const dataSignalQuery: any = useActivityQuery('')

  const handleChangeTab = (tab: string) => () => {
    setTabs(tab)
  }

  return (
    <div className="flex flex-col self-stretch p-10 max-md:px-5">
      <div className="flex items-center gap-0 text-xl tracking-tight leading-8 max-md:flex-wrap max-md:max-w-full">
        <Link to="/trading-signal/dashboard" className="text-gray-400">
          Kaivest Trading Signal
        </Link>
        <ArrowRightIcon />
        <div className="flex-auto text-gray-200 max-md:max-w-full">KAIVEST AI Signal</div>
      </div>
      <div className="h-px my-4 bg-white/10 w-full"></div>
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col justify-center max-md:mt-4 max-md:max-w-full">
            <div className="flex gap-5 justify-between pr-9 max-md:flex-wrap max-md:pr-5">
              <div className="text-3xl font-bold leading-10 text-neutral-02">KAIVEST AI Signal</div>
              <div className="justify-center px-4 py-2 my-auto text-base font-semibold tracking-normal leading-6 bg-primary-1 rounded-lg text-neutral-07">
                Subcribe signal
              </div>
            </div>
            <div className="mt-4 text-sm font-bold tracking-normal leading-4 text-neutral-04 max-md:max-w-full">
              Introduction
            </div>
            <div className="mt-4 text-base tracking-normal leading-6 text-neutral-01 max-md:max-w-full">
              Kaivest AI signal delves into comprehensive market trend analysis, evaluation, and
              prediction based on a series of critical indicators. It incorporates multi-source data
              from on-chain information, technical analysis, and sentiment analysis.
            </div>
            <div className="mt-4 text-sm font-bold tracking-normal leading-4 text-neutral-04 max-md:max-w-full">
              Risk Control
            </div>
            <div className="mt-4 text-base tracking-normal leading-6 text-neutral-01 max-md:max-w-full">
              The strategy use variable position size - No TP/SL should be set. <br />
              Exit signal will be sent.
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow justify-center max-md:mt-4 max-md:max-w-full">
            <div className="flex flex-col justify-center p-4 rounded-xl border border-solid bg-neutral-07/30 border-white/10 max-md:max-w-full">
              <div className="flex gap-0 justify-between max-md:flex-wrap">
                <div className="flex flex-col flex-1">
                  <div className="text-sm font-bold tracking-normal leading-4 text-neutral-04">
                    30D ROI
                  </div>
                  <div className="mt-2 text-3xl leading-10 text-neutral-03">+92.88%</div>
                </div>
                <div className="flex flex-col flex-1 justify-center">
                  <div className="text-sm whitespace-nowrap font-bold tracking-normal leading-4 text-neutral-04">
                    Risk Reward Ratio / Winrate
                  </div>
                  <div className="mt-2 text-3xl leading-10 text-right text-gray-300">
                    1:3.3 / 57%
                  </div>
                </div>
                <div className="flex flex-col flex-1 justify-center">
                  <div className="self-end text-sm font-bold tracking-normal leading-4 text-neutral-04">
                    Max drawdown
                  </div>
                  <div className="mt-2 text-3xl leading-10 text-right text-primary-3">8%</div>
                </div>
              </div>
              <div className="h-16">
                <LineChart
                  dataTokenInfo={null}
                  sparkLineIn7D={DUMMY_CHART}
                  loading={false}
                  setValueIndex={() => null}
                  showDate={false}
                />
              </div>
              <div className="flex gap-3 justify-between mt-4 text-sm font-bold tracking-normal leading-4 text-zinc-400 max-md:flex-wrap max-md:max-w-full">
                <div>
                  <span className="text-neutral-04">21d 21h 29m</span> Runtime
                </div>
                <div className="shrink-0 my-auto w-0.5 h-2 rounded-sm bg-zinc-800" />
                <div>
                  <span className="text-neutral-04">1573</span>{' '}
                  <span className="text-neutral-03">Signal in the last 7 days</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center p-4 mt-4 rounded-xl border border-solid bg-neutral-07/30 border-white/10 max-md:max-w-full">
              <div className="flex gap-1 justify-between max-md:flex-wrap max-md:max-w-full">
                <div className="flex flex-col justify-center pr-2.5">
                  <div className="text-sm font-bold tracking-normal leading-4 text-neutral-02">
                    30D backtested APY
                  </div>
                  <div className="mt-2 text-3xl leading-10 text-neutral-03">167.43%</div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="self-start ml-5 text-sm font-bold tracking-normal leading-4 text-neutral-02 max-md:ml-2.5">
                    Supported trading pairs
                  </div>
                  <div className="flex gap-2 mt-2">
                    <div className="flex gap-2 my-auto">
                      <img
                        loading="lazy"
                        src="/assets/icons/token/usdt.svg"
                        className="shrink-0 w-6 aspect-[0.93]"
                      />
                      <img
                        loading="lazy"
                        src="/assets/icons/token/usdt.svg"
                        className="shrink-0 aspect-square w-[26px]"
                      />
                      <img
                        loading="lazy"
                        src="/assets/icons/token/usdt.svg"
                        className="shrink-0 aspect-square w-[26px]"
                      />
                    </div>
                    <div className="text-3xl leading-10 text-right text-neutral-02">180+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="mb-4 bg-[url('/assets/images/bg-tabs.svg')] w-auto bg-no-repeat bg-cover flex overflow-hidden relative flex-col justify-center items-start px-5 text-base font-semibold tracking-normal leading-6 whitespace-nowrap min-h-[55px] max-md:px-5">
          <div className="flex relative gap-5 justify-between">
            <div
              onClick={handleChangeTab('Profit and Loss Analysis')}
              className="cursor-pointer flex flex-col flex-1 justify-between pt-3">
              <div
                className={cn(
                  tab === 'Profit and Loss Analysis' ? 'text-neutral-01' : 'text-neutral-04'
                )}>
                Profit and Loss Analysis
              </div>
              <div
                className={cn(
                  'shrink-0 mt-4 h-1 rounded-sm',
                  tab === 'Profit and Loss Analysis' ? 'bg-amber-200' : ''
                )}
              />
            </div>
            <div
              onClick={handleChangeTab('Signal Triggered Details')}
              className="cursor-pointer flex flex-col flex-1 justify-between pt-3">
              <div
                className={cn(
                  tab === 'Signal Triggered Details' ? 'text-neutral-01' : 'text-neutral-04'
                )}>
                Signal Triggered Details
              </div>
              <div
                className={cn(
                  'shrink-0 mt-4 h-1 rounded-sm',
                  tab === 'Signal Triggered Details' ? 'bg-amber-200' : ''
                )}
              />
            </div>
            <div
              onClick={handleChangeTab('Ongoing Signals')}
              className="cursor-pointer flex flex-col flex-1 justify-between pt-3">
              <div
                className={cn(tab === 'Ongoing Signals' ? 'text-neutral-01' : 'text-neutral-04')}>
                Ongoing Signals
              </div>
              <div
                className={cn(
                  'shrink-0 mt-4 h-1 rounded-sm',
                  tab === 'Ongoing Signals' ? 'bg-amber-200' : ''
                )}
              />
            </div>
          </div>
        </div>
        <WrapTable title="Signal Triggered Details" childHeader={<RightGroup />}>
          <div className="mt-8">
            <DataTable
              className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
              columns={columnsActivity}
              data={dataSignalQuery.data || []}
              isFetching={false}
              noneBorder
              noneBgHeader
              emptyData="No results."
            />
          </div>
          <PaginationCustom
            className="mt-8"
            currentPage={1}
            updatePage={() => null}
            pageSize={10}
            total={1}
            setPage={() => null}
          />
        </WrapTable>
      </div>
    </div>
  )
}
