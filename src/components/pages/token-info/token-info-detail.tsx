'use client'

import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useTokenInfoQuery } from '@/query/token-explorer/getTokenInfo'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { TradingSignal } from '@/components/common/TabWalletExplorer/TradingSignal'
import { WrapLineChart } from '@/components/common/Chart/ChartDetail/WrapLineChart'
import { TopSmartMoney } from '@/components/common/TabWalletExplorer/TopSmartMoney'
import { ActivityOfTopSmartMoney } from '@/components/common/TabWalletExplorer/ActivityOfTopSmartMoney'

import { SelectDuration } from '@/components/common/Select/SelectDuration'

import { Switch } from '@/components/ui/switch'

import { useQuery } from '@tanstack/react-query'
import { useQueryState } from 'nuqs'
import { TokenInfo } from '../token-explorer/token-info'
import { StAnalysisByAI } from '../token-explorer/st-analysis-ai'
import { UnusualBuyAnalysis } from '../token-explorer/unusual-buy-analysis'
import { useTokenInfoTradeQuery } from '@/query/token-explorer/get-token-info-trade'
import { useTokenInfoUnusualBuyQuery } from '@/query/token-explorer/get-token-info-unusual-buy'
import MoreInfoIcon from '@/components/shared/icons/token-explorer/more-info'

const TABS = ['Smart Traders Activity', 'Top Smart Traders', 'Trading Signal']

export const TokenExplorerDetail = ({
  params,
  searchParams,
}: {
  params: { token: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  const currentDurationTrade = searchParams?.tit_duration?.toString() || '1d'
  const currentDurationUnusualBuy =
    searchParams?.tiub_duration?.toString() || '24h'

  const [duration, setDuration] = useState('24h')
  const [, setDurationTrade] = useQueryState('tit_duration', {
    defaultValue: currentDurationTrade,
    history: 'push',
    shallow: false,
  })
  const [, setDurationUnusualBuy] = useQueryState('tiub_duration', {
    defaultValue: currentDurationUnusualBuy,
    history: 'push',
    shallow: false,
  })

  const [hideSmallTrade, setHideSmallTrade] = useState(false)
  const [hideSmallBalance, setHideSmallBalance] = useState(false)
  const [tab, setTabs] = useState('Smart Traders Activity')
  const CHAIN = useAtomValue(chainAtom)
  //
  const tokenInfoQuery = useQuery(
    useTokenInfoQuery({
      address: params?.token?.toString() || '',
      chain: CHAIN,
    }),
  )
  const dataTokenInfo = tokenInfoQuery?.data?.info
  //
  const tokenInfoTradeQuery = useQuery(
    useTokenInfoTradeQuery({
      address: params?.token?.toString() || '',
      chain: CHAIN,
      duration: currentDurationTrade,
    }),
  )
  const dataTokenInfoTrade = tokenInfoTradeQuery?.data?.res
  //
  const tokenInfoUnusualBuyQuery = useQuery(
    useTokenInfoUnusualBuyQuery({
      address: params?.token?.toString() || '',
      chain: CHAIN,
      duration: currentDurationUnusualBuy,
    }),
  )
  const dataTokenInfoUnusualBuy = tokenInfoUnusualBuyQuery?.data?.res
  const handleChangeTab = (tab: string) => () => {
    setTabs(tab)
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
  const renderFilterTab = (tab: string) => {
    switch (tab) {
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
            <SelectDuration
              duration={duration}
              setDuration={setDuration}
              type="option3"
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

  if (!dataTokenInfo) return null

  return (
    <div className="h-full w-full">
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
              <WrapLineChart address={params.token} />
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
                      {item === tab ? <MoreInfoIcon /> : null}
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
