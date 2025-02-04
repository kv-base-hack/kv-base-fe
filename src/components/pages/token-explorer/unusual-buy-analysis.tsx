import { chainAtom } from '@/atom/chain'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { DialogNumberOfSmartMoney } from '@/components/common/Dialog/DialogNumberOfSmartMoney'
import { SelectDuration } from '@/components/common/Select/SelectDuration'

import IconSpotLight from '@/components/shared/icons/smart-traders/icon-spot-light'
import MoreInfoIcon from '@/components/shared/icons/token-explorer/more-info'
import { cn } from '@/lib/utils'
import { nFormatter } from '@/lib/utils/nFormatter'
import { renderPrice } from '@/lib/utils/renderPrice'
import { useTokenInfoUnusualBuyQuery } from '@/query/token-explorer/get-token-info-unusual-buy'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import numeral from 'numeral'
import { useQueryState } from 'nuqs'
import { useState } from 'react'

export function UnusualBuyAnalysis({
  params,
  searchParams,
}: {
  params: { token: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const CHAIN = useAtomValue(chainAtom)
  const [duration, setDuration] = useState('24h')
  const currentDurationUnusualBuy =
    searchParams?.tiub_duration?.toString() || '24h'

  const [, setDurationUnusualBuy] = useQueryState('tiub_duration', {
    defaultValue: currentDurationUnusualBuy,
    history: 'push',
    shallow: false,
  })

  const tokenInfoUnusualBuyQuery = useQuery(
    useTokenInfoUnusualBuyQuery({
      address: params?.token?.toString() || '',
      chain: CHAIN,
      duration: currentDurationUnusualBuy,
    }),
  )
  const dataTokenInfoUnusualBuy = tokenInfoUnusualBuyQuery?.data?.res

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
      icon={
        <div className="rounded-full bg-[#182317] p-2">
          <IconSpotLight fill="#8F53F8" />
        </div>
      }
      childHeader={
        <SelectDuration
          duration={currentDurationUnusualBuy}
          setDuration={setDurationUnusualBuy}
          type="option2"
        />
      }
      className="relative flex h-[unset] w-full items-center gap-4 p-6 font-normal"
    >
      <div className="h-px w-full bg-white/10" />
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full flex-wrap items-start justify-between gap-3 whitespace-nowrap text-center leading-[150%]">
          <div className="flex flex-1 flex-col items-start">
            <div className="flex items-center text-xs font-normal text-light-telegray">
              Hold Value
              <span className="ml-1">
                <MoreInfoIcon />
              </span>
            </div>
            <p className="text-base font-medium text-[#EFEFEF]">
              ${nFormatter(dataTokenInfoUnusualBuy?.hold_in_usdt || 0)}
            </p>
          </div>
          <div className="flex flex-1 flex-col items-start">
            <div className="flex items-center self-start text-xs font-normal text-light-telegray">
              # Wallet Buy
              <span className="ml-1">
                <MoreInfoIcon />
              </span>
            </div>
            <DialogNumberOfSmartMoney
              number={dataTokenInfoUnusualBuy?.number_of_users || 0}
              address={dataTokenInfoUnusualBuy?.address || params.token || ''}
              type="unusual-buy"
              duration={currentDurationUnusualBuy}
            />
          </div>
          <div className="flex flex-1 flex-col items-end">
            <div className="self-endfont-normal text-xs text-light-telegray">
              Avg Entry
            </div>
            <div className="text-base font-medium text-[#EFEFEF]">
              {renderPrice(dataTokenInfoUnusualBuy?.avg_price || 0)}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-wrap items-start justify-between gap-3 whitespace-nowrap text-center leading-[150%]">
          <div className="flex flex-1 flex-col items-start">
            <div className="self-start text-xs font-normal text-light-telegray">
              Total Profit
            </div>
            <div
              className={cn(
                'text-base font-medium',
                dataTokenInfoUnusualBuy && dataTokenInfoUnusualBuy?.pnl < 0
                  ? 'text-red'
                  : dataTokenInfoUnusualBuy && dataTokenInfoUnusualBuy?.pnl > 0
                    ? 'text-core'
                    : '',
              )}
            >
              ${nFormatter(dataTokenInfoUnusualBuy?.pnl || 0)}
            </div>
          </div>
          <div className="flex flex-1 flex-col items-start">
            <div className="self-start text-xs font-normal text-light-telegray">
              Avg ROI
            </div>
            <div
              className={cn(
                'text-base font-medium',
                dataTokenInfoUnusualBuy && dataTokenInfoUnusualBuy?.roi < 0
                  ? 'text-red'
                  : dataTokenInfoUnusualBuy && dataTokenInfoUnusualBuy?.roi > 0
                    ? 'text-core'
                    : '',
              )}
            >
              {numeral(dataTokenInfoUnusualBuy?.roi).format('0,0.[00]')}%
            </div>
          </div>
          <div className="flex flex-1 flex-col items-end">
            <div className="self-end text-xs font-normal text-light-telegray">
              Realized %
            </div>
            <div className="text-base font-medium">
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
              ST Buy Vol
            </div>
            <div className="text-sm leading-5 text-white">
              {renderPrice(dataTokenInfoUnusualBuy?.buy_volume_in_usdt || 0)}
            </div>
          </div>
          <div className="flex flex-1 flex-col items-end py-px pl-20">
            <div className="self-end text-xs uppercase leading-4 text-neutral-500">
              ST Sell Vol
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
