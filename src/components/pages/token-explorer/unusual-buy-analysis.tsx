import { chainAtom } from '@/atom/chain'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { DialogNumberOfSmartMoney } from '@/components/common/Dialog/DialogNumberOfSmartMoney'
import { SelectDuration } from '@/components/common/Select/SelectDuration'

import IconSpotLight from '@/components/shared/icons/smart-traders/icon-spot-light'
import MoreInfoIcon from '@/components/shared/icons/token-explorer/more-info'
import { cn } from '@/lib/utils'
import { renderPrice } from '@/lib/utils/renderPrice'
import { useTokenInfoUnusualBuyQuery } from '@/query/token-explorer/get-token-info-unusual-buy'
import { useAtomValue } from 'jotai'
import numeral from 'numeral'
import { useState } from 'react'

export function UnusualBuyAnalysis({ params }: { params: { token: string } }) {
  const CHAIN = useAtomValue(chainAtom)
  const [duration, setDuration] = useState('24h')

  const tokenInfoUnusualBuyQuery = useTokenInfoUnusualBuyQuery({
    address: params.token,
    chain: CHAIN,
    duration,
  })
  const dataTokenInfoUnusualBuy = tokenInfoUnusualBuyQuery.data?.data.res

  const percentBuyUnusual =
    dataTokenInfoUnusualBuy &&
    (dataTokenInfoUnusualBuy?.buy_volume_in_usdt * 100) /
      (dataTokenInfoUnusualBuy?.buy_volume_in_usdt +
        dataTokenInfoUnusualBuy?.sell_volume_in_usdt)
  const percentSellUnusual =
    dataTokenInfoUnusualBuy &&
    (dataTokenInfoUnusualBuy?.sell_volume_in_usdt * 100) /
      (dataTokenInfoUnusualBuy?.buy_volume_in_usdt +
        dataTokenInfoUnusualBuy?.sell_volume_in_usdt)

  return (
    <WrapTable
      title="Unusual Buy Analysis by AI"
      icon={<IconSpotLight fill="#8F53F8" />}
      childHeader={
        <SelectDuration duration={duration} setDuration={setDuration} />
      }
      className="relative flex h-[unset] w-full items-center gap-4 p-6 font-normal"
    >
      <div className="h-px w-full bg-white/10" />
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full flex-wrap items-start justify-between gap-3 whitespace-nowrap text-center leading-[150%]">
          <div className="flex flex-1 cursor-pointer flex-col items-start">
            <div className="flex items-center text-xs font-normal text-light-telegray">
              Hold Value
              <span className="ml-1">
                <MoreInfoIcon />
              </span>
            </div>
            <DialogNumberOfSmartMoney
              number={dataTokenInfoUnusualBuy?.number_of_hold_users || 0}
              address={dataTokenInfoUnusualBuy?.address || params.token || ''}
              type="find-gems-sm-holding"
              duration={'24h'}
            />
          </div>
          <div className="flex flex-1 cursor-pointer flex-col items-start">
            <div className="flex items-center self-start text-xs font-normal text-light-telegray">
              # Wallet Buy
              <span className="ml-1">
                <MoreInfoIcon />
              </span>
            </div>
            <DialogNumberOfSmartMoney
              number={dataTokenInfoUnusualBuy?.number_of_users || 0}
              address={dataTokenInfoUnusualBuy?.address || params.token || ''}
              type="find-gems-sm-holding"
              duration={'24h'}
            />
          </div>
          <div className="flex flex-1 cursor-pointer flex-col items-end">
            <div className="self-endfont-normal text-xs text-light-telegray">
              Avg Entry
            </div>
            <div className="text-sm font-medium">
              {renderPrice(dataTokenInfoUnusualBuy?.avg_price || 0)}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-wrap items-start justify-between gap-3 whitespace-nowrap text-center leading-[150%]">
          <div className="flex flex-1 cursor-pointer flex-col items-start">
            <div className="self-start text-xs font-normal text-light-telegray">
              Total Profit
            </div>
            <div className="text-sm font-medium text-core">
              {renderPrice(dataTokenInfoUnusualBuy?.pnl || 0)}
            </div>
          </div>
          <div className="flex flex-1 cursor-pointer flex-col items-start">
            <div className="self-start text-xs font-normal text-light-telegray">
              Avg ROI
            </div>
            <div
              className={cn(
                'text-sm font-medium',
                dataTokenInfoUnusualBuy && dataTokenInfoUnusualBuy?.roi < 0
                  ? 'text-red'
                  : 'text-core',
              )}
            >
              {numeral(dataTokenInfoUnusualBuy?.roi).format('0,0.[00]')}%
            </div>
          </div>
          <div className="flex flex-1 cursor-pointer flex-col items-end">
            <div className="self-end text-xs font-normal text-light-telegray">
              Realized %
            </div>
            <div className="text-sm font-medium">
              {numeral(dataTokenInfoUnusualBuy?.realized_percent).format(
                '0,0.[00]',
              )}
              %
            </div>
          </div>
        </div>
        <div className="mt-2 flex justify-center gap-1">
          <div className="flex flex-1 flex-col py-px">
            <div className="text-xs uppercase leading-4 text-neutral-500">
              SM Buy Vol
            </div>
            <div className="text-sm leading-5 text-white">
              {renderPrice(dataTokenInfoUnusualBuy?.buy_volume_in_usdt || 0)}
            </div>
          </div>
          <div className="flex flex-1 flex-col items-end py-px pl-20">
            <div className="self-end text-xs uppercase leading-4 text-neutral-500">
              SM Sell Vol
            </div>
            <div className="self-end text-sm leading-5 text-white">
              {renderPrice(dataTokenInfoUnusualBuy?.sell_volume_in_usdt || 0)}
            </div>
          </div>
        </div>
        <div className="flex w-full gap-0.5 py-0.5">
          <div
            style={{ width: percentBuyUnusual + '%' }}
            className="h-1 shrink-0 rounded-[100px] bg-core"
          />
          <div
            style={{ width: percentSellUnusual + '%' }}
            className="h-1 shrink-0 rounded-[100px] bg-red"
          />
        </div>
      </div>
    </WrapTable>
  )
}
