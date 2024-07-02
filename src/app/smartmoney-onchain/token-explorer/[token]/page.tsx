'use client'

import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useTokenInfoQuery } from '@/query/token-explorer/getTokenInfo'

import { useCallback, useState } from 'react'
import { IntegratedTerminal } from '@/components/common/Swap'

import { cn } from '@/lib/utils'
import { nFormatter } from '@/lib/utils/nFormatter'
import { TradingSignal } from '@/components/common/TabWalletExplorer/TradingSignal'
import { ImageToken } from '@/components/common/Image/ImageToken'
import MenuArrowDownIcon from '@/components/shared/icons/MenuArrowDown'
import { DialogSelectToken } from '@/components/common/Dialog/DialogSelectToken'
import { Transactions } from '@/components/common/TabWalletExplorer/Transactions'
import { TopSmartMoney } from '@/components/common/TabWalletExplorer/TopSmartMoney'
import { ActivityOfTopSmartMoney } from '@/components/common/TabWalletExplorer/ActivityOfTopSmartMoney'
import { CardCommon } from '@/components/common/Card/CardCommon'
import { WrapLineChart } from '@/components/common/Chart/ChartDetail/WrapLineChart'
import { formatPriceNumber } from '@/utils/formatPriceNumber'
import { DialogNumberOfSmartMoney } from '@/components/common/Dialog/DialogNumberOfSmartMoney'

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
const TABS = [
  'Transactions',
  'Top Smart Money',
  'Activity of Top Smart Money',
  'Trading Signal',
]

export default function TokenExplorerDetail({
  params,
}: {
  params: { token: string }
}) {
  const [mode, setMode] = useState('1d')
  const [tab, setTabs] = useState('Transactions')
  const CHAIN = useAtomValue(chainAtom)

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

  const renderContentTab = (tab: string) => {
    switch (tab) {
      case 'Transactions':
        return <Transactions dataTokenInfo={dataTokenInfo} />
      case 'Top Smart Money':
        return <TopSmartMoney dataTokenInfo={dataTokenInfo} />
      case 'Activity of Top Smart Money':
        return <ActivityOfTopSmartMoney dataTokenInfo={dataTokenInfo} />
      case 'Trading Signal':
        return <TradingSignal />
    }
    return null
  }

  if (!dataTokenInfo) return null

  const percentBuy =
    (dataTokenInfo?.buy_volume * 100) /
    (dataTokenInfo?.buy_volume + dataTokenInfo?.sell_volume)
  const percentSell =
    (dataTokenInfo?.sell_volume * 100) /
    (dataTokenInfo?.buy_volume + dataTokenInfo?.sell_volume)

  return (
    <div className="w-full h-full flex flex-col gap-2 pt-2">
      <div className="m-0 flex flex-col-reverse xl:flex-row items-start gap-2">
        {/* swap left */}
        <div className="font-sora">
          <IntegratedTerminal />
        </div>
        {/* content right */}
        <div className="w-full h-full overflow-hidden rounded-[20px]">
          {/* overview */}
          <CardCommon>
            <div className="flex gap-5 justify-between w-full max-lg:flex-wrap">
              <div className="flex gap-5 justify-between whitespace-nowrap">
                <DialogSelectToken action="navigate">
                  <div className="flex cursor-pointer items-center gap-2 px-4 py-2 text-xl font-bold tracking-tight leading-8 text-neutral-07 border border-solid backdrop-blur-[50px] bg-gray-300 bg-opacity-10 border-white border-opacity-10 rounded-[360px]">
                    <div className="flex gap-2">
                      <ImageToken
                        className="w-8 h-8 rounded-full"
                        imgUrl={dataTokenInfo?.image_url}
                        symbol={dataTokenInfo?.symbol}
                      />
                      <div className="text-neutral-07">
                        {dataTokenInfo?.symbol}
                      </div>
                    </div>
                    <MenuArrowDownIcon />
                  </div>
                </DialogSelectToken>
                {/* <div className="flex flex-col items-start gap-2 justify-center my-auto text-sm tracking-normal leading-5">
                  <div className="flex items-center gap-2 px-px">
                    <div className="flex gap-1 justify-center px-px">
                      <div className="font-medium text-neutral-04">Token:</div>
                      <div className="text-brand">{`${params.token?.substring(
                        0,
                        4,
                      )}...${params.token?.slice(-3)}`}</div>
                    </div>
                    <CopyCustom
                      value={params.token}
                      icon={
                        <CopyIcon className="cursor-pointer text-neutral-04" />
                      }
                    />
                  </div>
                  <div className="flex items-center gap-2 px-px">
                    <div className="flex items-center gap-1 justify-center px-px">
                      <div className="font-medium text-neutral-04">Pair:</div>
                      <div className="text-brand">{`${dataTokenInfo?.pair_address?.substring(
                        0,
                        4,
                      )}...${dataTokenInfo?.pair_address?.slice(-3)}`}</div>
                    </div>
                    <CopyCustom
                      value={dataTokenInfo?.pair_address || ''}
                      icon={
                        <CopyIcon className="cursor-pointer text-neutral-04" />
                      }
                    />
                  </div>
                </div> */}
              </div>
              <div className="flex gap-5 justify-between px-5 max-md:flex-wrap">
                <div className="flex flex-col items-center justify-center whitespace-nowrap">
                  <div className="flex items-center gap-1 justify-center text-sm tracking-normal leading-5 text-right text-neutral-04">
                    <div>AVG SM Entry</div>
                  </div>
                  <div className="mt-1 text-base font-medium leading-6 text-neutral-07">
                    {formatPriceNumber(
                      dataTokenInfo?.avg_price_smart_money || 0,
                    )}
                  </div>
                </div>
                <div className="shrink-0 w-px h-16 rounded-sm bg-neutral-03" />
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-1 justify-center text-sm tracking-normal leading-5 text-right text-neutral-04">
                    <div className="whitespace-nowrap"># SM Hold</div>
                  </div>
                  <div className="self-center mt-1 text-base font-medium leading-6 text-neutral-07">
                    <DialogNumberOfSmartMoney
                      number={dataTokenInfo?.number_of_smart_money_hold || 0}
                      address={dataTokenInfo?.token_address || ''}
                      type="find-gems-sm-holding"
                      duration={'24h'}
                    />
                  </div>
                </div>
                <div className="shrink-0 w-px h-16 rounded-sm bg-neutral-03" />
                <div className="flex flex-col items-center justify-center whitespace-nowrap">
                  <div className="flex items-center gap-1 justify-center text-sm tracking-normal leading-5 text-right text-neutral-04">
                    <div className="whitespace-nowrap"># Unusual Buy</div>
                  </div>
                  <div className="mt-1 text-base font-medium leading-6 text-neutral-07">
                    <DialogNumberOfSmartMoney
                      number={dataTokenInfo?.number_of_unusual_buy || 0}
                      address={dataTokenInfo?.token_address || ''}
                      type="unusual_buy"
                      duration={'24h'}
                    />
                  </div>
                </div>
                <div className="shrink-0 w-px h-16 rounded-sm bg-neutral-03" />
                <div className="flex flex-col items-center justify-center whitespace-nowrap">
                  <div className="flex gap-1 justify-center mt-2">
                    <div className="flex flex-col flex-1 py-px">
                      <div className="flex items-center gap-1 justify-center text-xs tracking-normal leading-5 text-right text-neutral-04">
                        <div>SM BUY VOL</div>
                      </div>
                      <div className="mt-1 text-base font-medium leading-6 text-neutral-07">
                        ${nFormatter(dataTokenInfo?.buy_volume || 0)}
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 items-end py-px pl-20">
                      <div className="flex items-center gap-1 justify-center text-xs tracking-normal leading-5 text-right text-neutral-04">
                        <div>SM SELL VOL</div>
                      </div>
                      <div className="self-end mt-1 text-base font-medium leading-6 text-neutral-07">
                        ${nFormatter(dataTokenInfo?.sell_volume || 0)}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-0.5 py-0.5 w-full">
                    <div
                      style={{ width: percentBuy + '%' }}
                      className="shrink-0 h-1 bg-lime-300 rounded-[100px]"
                    />
                    <div
                      style={{ width: percentSell + '%' }}
                      className="shrink-0 h-1 bg-rose-500 rounded-[100px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardCommon>
          {/* chart */}
          <div className="w-full h-[520px] rounded-[20px] p-0 lg:mt-2">
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
      <CardCommon className="z-50">
        <div className="flex gap-2 justify-start items-center self-stretch py-2 text-lg font-medium tracking-tight leading-6 text-center text-neutral-400 max-md:flex-wrap">
          {TABS.map((item, index) => {
            return (
              <div
                key={index}
                onClick={handleChangeTab(item)}
                className={cn(
                  'cursor-pointer self-stretch px-3 py-2',
                  item === tab
                    ? 'justify-center text-neutral-07 whitespace-nowrap rounded-lg border border-solid border-white/10 bg-neutral-03'
                    : 'my-auto',
                )}
              >
                {item}
              </div>
            )
          })}
        </div>
        {renderContentTab(tab)}
      </CardCommon>
    </div>
  )
}
