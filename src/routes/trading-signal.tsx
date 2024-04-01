import { LineChart } from '@/components/common/ChartDetail/LineChart'
import { GroupHeader } from '@/components/common/GroupHeader'
import BotIcon from '@/components/shared/icons/trading-signal/BotIcon'
import IncreaseIcon from '@/components/shared/icons/trading-signal/IncreaseIcon'
import InfoIcon from '@/components/shared/icons/trading-signal/InfoIcon'
import PNLIcon from '@/components/shared/icons/trading-signal/PNLIcon'
import ROIIcon from '@/components/shared/icons/trading-signal/ROIIcon'
import TargetIcon from '@/components/shared/icons/trading-signal/TargetIcon'
import WinrateIcon from '@/components/shared/icons/trading-signal/WinrateIcon'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/trading-signal')({
  component: TradingSignal,
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

function TradingSignal() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-center self-stretch p-10 max-md:px-5">
        <GroupHeader
          title="Kaivest Trading Signal"
          desc={
            <div className="text-base tracking-normal leading-6 text-zinc-50 max-md:max-w-full">
              Kaivest trading signal is a trading approach executed by market data and technical
              indicators. It trades automatically based on a number of{' '}
              <span className="font-bold">
                preset signals, including technical indicator, price movements, market indices,
                on-chain or a combination of them all.
              </span>{' '}
              We have different types of Trading Signals depending on your investment style
            </div>
          }></GroupHeader>
        <img
          loading="lazy"
          src="/assets/images/trading-signal.svg"
          className="mt-4 w-full aspect-[3.7] max-md:max-w-full"
        />
        <div className="flex flex-col justify-center p-6 mt-4 font-bold text-neutral-04 rounded-lg border border-solid shadow-lg backdrop-blur-lg bg-neutral-07/50 border-white border-opacity-10 max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary-4">
                <ROIIcon />
              </div>
              <div className="flex gap-1 pr-5 mt-5 text-sm tracking-normal leading-4 max-md:pr-5">
                <div>Total 30D ROI</div>
                <InfoIcon />
              </div>
              <div className="mt-2 text-5xl font-normal text-primary-2 max-md:text-4xl">
                +245.45%
              </div>
              <div className="flex">
                <div className="flex gap-1 justify-start p-1 mt-2 text-xs tracking-normal leading-4 rounded bg-gray-300/10">
                  <IncreaseIcon />
                  <div>
                    <span className="text-primary-2">37.8%</span>{' '}
                    <span className="text-neutral-04">this week</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="shrink-0 w-px rounded-sm bg-white bg-opacity-10 h-[184px]" />
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary-2">
                <PNLIcon />
              </div>
              <div className="flex gap-1 pr-1.5 mt-5 text-sm tracking-normal leading-4">
                <div>Kaivest’s invest total PNL</div>
                <InfoIcon />
              </div>
              <div className="mt-2 text-5xl text-primary-2 font-normal max-md:text-4xl">+$5.5k</div>
              <div className="flex">
                <div className="justify-center p-1 mt-2 text-xs tracking-normal leading-4 rounded-lg bg-gray-300/10">
                  <span className="text-primary-2">+$451</span>{' '}
                  <span className="text-neutral-04">Unrealized PNL</span>
                </div>
              </div>
            </div>
            <div className="shrink-0 w-px rounded-sm bg-white bg-opacity-10 h-[184px]" />
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary-3">
                <WinrateIcon />
              </div>
              <div className="mt-5 whitespace-nowrap text-sm tracking-normal leading-4">
                Total Risk Reward Ratio / Winrate
              </div>
              <div className="mt-2 text-5xl text-neutral-01 font-normal max-md:text-4xl">
                1:2.3 / 72%
              </div>
              <div className="flex">
                <div className="justify-center p-1 mt-2 text-xs tracking-normal leading-4 rounded bg-gray-300 bg-opacity-10">
                  <span className="text-primary-2">124</span>{' '}
                  <span className="text-neutral-04"> Signal in the last 7 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow p-6 w-full rounded-lg border border-solid shadow-lg backdrop-blur-lg bg-neutral-07/50 border-white border-opacity-10 max-md:px-5 max-md:mt-8 max-md:max-w-full">
                <div className="flex gap-4 pr-20 text-xl tracking-tight leading-8 text-neutral-01 max-md:flex-wrap max-md:pr-5">
                  <div>KAIVEST AI Signal </div>
                  <BotIcon />
                </div>
                <div className="mt-4 text-base tracking-normal leading-6 text-neutral-01 max-md:max-w-full">
                  Kaivest AI signal delves into comprehensive market trend analysis, evaluation, and
                  prediction based on a series of critical indicators. It incorporates multi-source
                  data from on-chain information, technical analysis, and sentiment analysis.
                </div>
                <div className="flex gap-4 justify-between mt-8 max-md:flex-wrap">
                  <div className="flex flex-col flex-1">
                    <div className="text-sm font-bold tracking-normal leading-4 text-neutral-04">
                      30D ROI
                    </div>
                    <div className="mt-2 text-xl font-semibold tracking-tight leading-8 text-primary-2">
                      +192.88%
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 whitespace-nowrap justify-center">
                    <div className="text-sm font-bold tracking-[-0.13px] leading-4 text-neutral-04">
                      Risk Reward Ratio / Winrate
                    </div>
                    <div className="mt-2 text-xl font-semibold tracking-tight leading-8 text-right text-neutral-03">
                      1:3.3 / 67%
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="self-end text-sm font-bold tracking-normal leading-4 text-neutral-04">
                      Max drawdown
                    </div>
                    <div className="mt-2 text-xl font-semibold tracking-tight leading-8 text-right text-primary-3">
                      18%
                    </div>
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
                <div className="flex gap-3 justify-between mt-4 text-sm font-bold tracking-normal leading-4 text-neutral-shades-0475 max-md:flex-wrap max-md:max-w-full">
                  <div>
                    <span className="text-neutral-04">21d 21h 29m</span> Runtime
                  </div>
                  <div className="shrink-0 my-auto w-0.5 h-2 rounded-sm bg-zinc-800" />
                  <div>
                    <span className="text-neutral-04">1573</span>{' '}
                    <span className="text-neutral-shades-0475">Signal in the last 7 days</span>
                  </div>
                </div>
                <div className="flex gap-5 justify-between mt-8 max-md:flex-wrap max-md:max-w-full">
                  <div className="justify-center p-1 my-auto text-xs font-bold tracking-normal leading-4 rounded bg-zinc-800 text-neutral-shades-0475">
                    Profit sharing 20% <span className="text-neutral-shades-0475">or</span>{' '}
                    89$/month
                  </div>
                  <div className="justify-center px-4 py-2 text-base font-semibold tracking-normal leading-6 whitespace-nowrap rounded-lg bg-gray-300 bg-opacity-10 text-zinc-50">
                    Subcribe
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow p-6 w-full rounded-lg border border-solid shadow-lg backdrop-blur-lg bg-zinc-900 bg-opacity-50 border-white border-opacity-10 max-md:px-5 max-md:mt-8 max-md:max-w-full">
                <div className="flex gap-4 px-0.5 text-xl tracking-tight leading-8 text-zinc-50 max-md:flex-wrap">
                  <div className="max-md:max-w-full">Follow Smart-money Onchain Signal</div>
                  <TargetIcon />
                </div>
                <div className="mt-4 text-base tracking-normal leading-6 text-zinc-50 max-md:max-w-full">
                  When the Kaivest detects a trade by smart money, the bot automatically executes
                  the same trade for the users following this strategy, ensuring they can act
                  quickly on market opportunities.
                </div>
                <div className="flex gap-4 justify-between mt-8 max-md:flex-wrap">
                  <div className="flex flex-col flex-1">
                    <div className="text-sm font-bold tracking-normal leading-4 text-neutral-04">
                      30D ROI
                    </div>
                    <div className="mt-2 text-xl font-semibold tracking-tight leading-8 text-primary-2">
                      +32.88%
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 items-end whitespace-nowrap justify-center">
                    <div className="text-sm font-bold tracking-[-0.13px] leading-4 text-neutral-04">
                      Risk Reward Ratio / Winrate
                    </div>
                    <div className="mt-2 text-xl font-semibold tracking-tight leading-8 text-right text-gray-300">
                      1:1.3 / 77%
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="self-end text-sm font-bold tracking-normal leading-4 text-neutral-04">
                      Max drawdown
                    </div>
                    <div className="mt-2 text-xl font-semibold tracking-tight leading-8 text-right text-red-400">
                      13%
                    </div>
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
                <div className="flex gap-3 justify-between mt-4 text-sm font-bold tracking-normal leading-4 text-neutral-shades-0475 max-md:flex-wrap max-md:max-w-full">
                  <div>
                    <span className="text-neutral-04">11d 14h 29m</span> Runtime
                  </div>
                  <div className="shrink-0 my-auto w-0.5 h-2 rounded-sm bg-zinc-800" />
                  <div>
                    <span className="text-neutral-04">13</span>{' '}
                    <span className="text-neutral-shades-0475">Signal in the last 7 days</span>
                  </div>
                </div>
                <div className="flex gap-5 justify-between mt-8 max-md:flex-wrap max-md:max-w-full">
                  <div className="justify-center p-1 my-auto text-xs font-bold tracking-normal leading-4 rounded bg-zinc-800 text-neutral-shades-0475">
                    Profit sharing 10% <span className="text-neutral-shades-0475">or</span>{' '}
                    49$/month
                  </div>
                  <div className="justify-center px-4 py-2 text-base font-semibold tracking-normal leading-6 whitespace-nowrap rounded-lg bg-gray-300 bg-opacity-10 text-zinc-50">
                    Subcribe
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
