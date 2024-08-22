'use client'

import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useTokenInfoQuery } from '@/query/token-explorer/getTokenInfo'

import { useCallback, useState } from 'react'

import { cn } from '@/lib/utils'
import { TradingSignal } from '@/components/common/TabWalletExplorer/TradingSignal'

import { TopSmartMoney } from '@/components/common/TabWalletExplorer/TopSmartMoney'
import { ActivityOfTopSmartMoney } from '@/components/common/TabWalletExplorer/ActivityOfTopSmartMoney'
import { WrapLineChart } from '@/components/common/Chart/ChartDetail/WrapLineChart'
import { TokenInfo } from '@/components/pages/token-explorer/token-info'
import { StAnalysisByAI } from '@/components/pages/token-explorer/st-analysis-ai'
import { UnusualBuyAnalysis } from '@/components/pages/token-explorer/unusual-buy-analysis'
import MoreInfoIcon from '@/components/shared/icons/token-explorer/more-info'
import { Switch } from '@/components/ui/switch'
import { SelectDuration } from '@/components/common/Select/SelectDuration'

const DUMMY_CHART = [
  [1700582400, 139.2820760583722837],
  [1700596800, 139.293678752367937],
  [1700611200, 139.267607134722679],
  [1700625600, 139.2383452159168096],
  [1700640000, 139.2713647267275487],
  [1700654400, 139.2849299222571455],
  [1700668800, 139.2812792112861628],
  [1700683200, 139.285411599501722],
  [1700697600, 139.304992187923194],
  [1700712000, 139.3025387325266873],
  [1700726400, 139.3101804211155927],
  [1700740800, 139.3364311866861343],
  [1700755200, 139.3574309481187357],
  [1700769600, 139.3420127842033551],
  [1700784000, 139.3613067184270784],
  [1700798400, 139.3632495568806504],
  [1700812800, 139.3694888962263747],
  [1700827200, 139.3761433222446537],
  [1700841600, 139.3878710860154058],
  [1700856000, 139.4008211214315036],
  [1700870400, 139.3716115965345537],
  [1700884800, 139.366702161216628],
  [1700899200, 139.3818821947181688],
  [1700913600, 139.3814228210891752],
  [1700928000, 139.3573893566747037],
  [1700942400, 139.365540065327867],
  [1700956800, 139.3677196547919548],
  [1700971200, 139.3684873657780736],
  [1700985600, 139.367661884521799],
  [1701000000, 139.378807753589557],
  [1701014400, 139.371757678574763],
  [1701028800, 139.3549718023010506],
  [1701043200, 139.3597396116316751],
  [1701057600, 139.3689482638454455],
  [1701072000, 139.3459421066735182],
  [1701086400, 139.329871889398035],
  [1701100800, 139.3196045314155003],
  [1701115200, 139.309947025324972],
  [1701129600, 139.2978960445684065],
  [1701144000, 139.3226601297295046],
  [1701158400, 139.3206287657374929],
  [1701172800, 139.3115544795935061],
  [1701187200, 139.3333333333333333],
]

const TABS = ['Smart Traders Activity', 'Top Smart Traders', 'Trading Signal']

export default function TokenExplorerDetail({
  params,
  searchParams,
}: {
  params: { token: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const [mode, setMode] = useState('1d')
  const [tab, setTabs] = useState('Smart Traders Activity')
  const CHAIN = useAtomValue(chainAtom)
  const [hideSmallTrade, setHideSmallTrade] = useState(false)
  const [hideSmallBalance, setHideSmallBalance] = useState(false)
  const [duration, setDuration] = useState('24h')

  //
  const tokenInfoQuery = useTokenInfoQuery({
    address: params.token,
    chain: CHAIN,
  })
  const dataTokenInfo = tokenInfoQuery.data?.data.info

  const handleChangeTab = (tab: string) => () => {
    setTabs(tab)
  }
  const handleModeChange = useCallback((mode: string) => {
    setMode(mode)
  }, [])

  const renderFilterTab = (tab: string) => {
    switch (tab) {
      case 'Transactions':
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
      case 'Top Smart Traders':
        return (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-4">
              <span className="text-sm font-normal not-italic leading-5 tracking-[-0.14px]">
                {`Hide Small Token Balance (<$1K)`}
              </span>
              <Switch
                checked={hideSmallBalance}
                onCheckedChange={(checked: boolean) =>
                  setHideSmallBalance(checked)
                }
              />
            </div>
            <SelectDuration duration={duration} setDuration={setDuration} />
          </div>
        )
      case 'Smart Traders Activity':
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
      case 'Trading Signal':
        return (
          <div className="flex items-center gap-4">
            <span className="text-sm font-normal not-italic leading-5 tracking-[-0.14px]">
              {`Hide Small Token Balance (<$1K)`}
            </span>
            <Switch
              checked={hideSmallBalance}
              onCheckedChange={(checked: boolean) =>
                setHideSmallBalance(checked)
              }
            />
          </div>
        )
    }
    return null
  }

  const renderContentTab = (tab: string) => {
    switch (tab) {
      case 'Smart Traders Activity':
        return (
          <ActivityOfTopSmartMoney
            params={params}
            searchParams={searchParams}
          />
        )
      case 'Top Smart Traders':
        return (
          <TopSmartMoney
            dataTokenInfo={dataTokenInfo}
            params={params}
            searchParams={searchParams}
          />
        )
      case 'Trading Signal':
        return <TradingSignal params={params} searchParams={searchParams} />
    }
    return null
  }

  if (!dataTokenInfo) return null

  return (
    <div className="flex h-full w-full flex-col gap-2 pt-2">
      {/* first section */}
      <div className="mb-2 mt-3 flex w-full flex-col items-center gap-2 px-4 xl:flex-row">
        <TokenInfo dataTokenInfo={dataTokenInfo} params={params} />
        <StAnalysisByAI params={params} />
        <UnusualBuyAnalysis params={params} />
      </div>
      <div className="m-0 my-2 flex items-start gap-2 lg:mx-4">
        <div className="w-full overflow-hidden rounded-[20px] border-white/10 bg-neutral-07 shadow-2xl backdrop-blur-lg">
          <div className="flex flex-col items-start self-stretch overflow-hidden border border-solid border-white/10 shadow-box backdrop-blur-lg lg:gap-6">
            {/* overview */}
            <div className="mt-4 w-full lg:mt-0">
              <WrapLineChart
                dataTokenInfo={dataTokenInfo}
                mode={mode}
                sparkLineIn7D={DUMMY_CHART}
                onModeChange={handleModeChange}
                loading={tokenInfoQuery.isLoading}
                address={params.token}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="m-0 my-2 flex items-start gap-4 lg:mx-4">
        <div className="flex h-full w-full flex-col justify-start self-stretch rounded-2xl border border-solid border-white/10 bg-black bg-opacity-50 p-6 font-semibold leading-[160%] shadow-2xl backdrop-blur-lg max-md:px-5">
          <div className="flex items-center">
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
                    <div className="flex items-center gap-1">
                      {item}
                      <MoreInfoIcon />
                    </div>
                    <div
                      className={cn(
                        'mt-2 h-px w-full',
                        item === tab ? 'active-tab-gradient' : 'bg-transparent',
                      )}
                    ></div>
                  </div>
                )
              })}
            </div>
            <div>{renderFilterTab(tab)}</div>
          </div>
          {renderContentTab(tab)}
        </div>
      </div>
    </div>
  )
}
