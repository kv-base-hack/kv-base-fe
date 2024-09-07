import { chainAtom } from '@/atom/chain'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { DialogNumberOfSmartMoney } from '@/components/common/Dialog/DialogNumberOfSmartMoney'
import { SelectDurationLeaderboard } from '@/components/common/Select/SelectDuration/select-duration-leaderboard'

import IconSpotLight from '@/components/shared/icons/smart-traders/icon-spot-light'
import MoreInfoIcon from '@/components/shared/icons/token-explorer/more-info'
import { cn } from '@/lib/utils'
import { nFormatter } from '@/lib/utils/nFormatter'
import { renderPrice } from '@/lib/utils/renderPrice'
import { useTokenInfoTradeQuery } from '@/query/token-explorer/get-token-info-trade'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import numeral from 'numeral'
import { useQueryState } from 'nuqs'

export function StAnalysisByAI({
  params,
  searchParams,
}: {
  params: { token: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const CHAIN = useAtomValue(chainAtom)
  const currentDurationTrade = searchParams?.tit_duration?.toString() || '1d'

  const [, setDurationTrade] = useQueryState('tit_duration', {
    defaultValue: currentDurationTrade,
    history: 'push',
    shallow: false,
  })

  const tokenInfoTradeQuery = useQuery(
    useTokenInfoTradeQuery({
      address: params?.token?.toString() || '',
      chain: CHAIN,
      duration: currentDurationTrade,
    }),
  )
  const dataTokenInfoTrade = tokenInfoTradeQuery?.data?.res

  const percentBuyTrade =
    dataTokenInfoTrade &&
    (dataTokenInfoTrade?.buy_usdt_amount * 100) /
      (dataTokenInfoTrade?.buy_usdt_amount +
        dataTokenInfoTrade?.sell_usdt_amount)
  const percentSellTrade =
    dataTokenInfoTrade &&
    (dataTokenInfoTrade?.sell_usdt_amount * 100) /
      (dataTokenInfoTrade?.buy_usdt_amount +
        dataTokenInfoTrade?.sell_usdt_amount)


  return (
    <WrapTable
      title="Smart Traders Analysis by AI"
      icon={
        <div className="rounded-full bg-[#182317] p-2">
          <IconSpotLight />
        </div>
      }
      childHeader={
        <SelectDurationLeaderboard
          duration={currentDurationTrade}
          setDuration={setDurationTrade}
          type="option3"
        />
      }
      className="relative flex h-[unset] w-full items-center gap-4 p-6 font-normal"
    >
      <div className="h-px w-full bg-white/10" />
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full flex-wrap items-start justify-between gap-3 whitespace-nowrap text-center leading-[150%]">
          <div className="flex flex-1  flex-col items-start">
            <div className="flex items-center text-xs font-normal text-light-telegray">
              Hold Value
              <span className="ml-1">
                <MoreInfoIcon />
              </span>
            </div>
           <p className='text-base font-medium text-[#EFEFEF]'>${nFormatter(dataTokenInfoTrade?.hold_in_usdt || 0)}</p>
          </div>
          <div className="flex flex-1  flex-col items-start">
            <div className="flex items-center self-start text-xs font-normal text-light-telegray">
              # ST Buy
              <span className="ml-1">
                <MoreInfoIcon />
              </span>
            </div>
            <DialogNumberOfSmartMoney
              number={dataTokenInfoTrade?.number_of_smart_money || 0}
              address={dataTokenInfoTrade?.address || params.token || ''}
              type="trade"
              duration={currentDurationTrade}
              className='text-base font-medium text-[#EFEFEF]'
            />
          </div>
          <div className="flex flex-1 flex-col items-end">
            <div className="self-endfont-normal text-xs text-light-telegray">
              Avg Entry
            </div>
            <div className="text-base font-medium text-[#EFEFEF]">
              {renderPrice(dataTokenInfoTrade?.avg_price || 0)}
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
                'text-base font-medium ',
                dataTokenInfoTrade && dataTokenInfoTrade?.total_profit < 0
                  ? 'text-red'
                  : dataTokenInfoTrade && dataTokenInfoTrade?.total_profit > 0
                    ? 'text-core'
                    : 'text-[#EFEFEF]',
              )}
            >
              {renderPrice(dataTokenInfoTrade?.total_profit || 0)}
            </div>
          </div>
          <div className="flex flex-1  flex-col items-start">
            <div className="self-start text-xs font-normal text-light-telegray">
              Avg ROI
            </div>
            <div
              className={cn(
                'text-base font-medium',
                dataTokenInfoTrade && dataTokenInfoTrade?.roi < 0
                  ? 'text-red'
                  : dataTokenInfoTrade && dataTokenInfoTrade?.roi > 0
                    ? 'text-core'
                    : 'text-[#EFEFEF]',
              )}
            >
              {numeral(dataTokenInfoTrade?.roi).format('0,0.[00]')}%
            </div>
          </div>
          <div className="flex flex-1 flex-col items-end">
            <div className="self-end text-xs font-normal text-light-telegray">
              Realized %
            </div>
            <div className="text-base font-medium text-[#EFEFEF]">
              {numeral(dataTokenInfoTrade?.realized_percent).format('0,0.[00]')}
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
              {renderPrice(dataTokenInfoTrade?.buy_usdt_amount || 0)}
            </div>
          </div>
          <div className="flex flex-1 flex-col items-end py-px pl-20">
            <div className="self-end text-xs uppercase leading-4 text-neutral-500">
              ST Sell Vol
            </div>
            <div className="self-end text-sm leading-5 text-white">
              {renderPrice(dataTokenInfoTrade?.sell_usdt_amount || 0)}
            </div>
          </div>
        </div>
        <div className="flex w-full gap-0.5 py-0.5">
          <div
            style={{ width: percentBuyTrade + '%' }}
            className="h-1 shrink-0 rounded-[100px] bg-core"
          />
          <div
            style={{ width: percentSellTrade + '%' }}
            className="h-1 shrink-0 rounded-[100px] bg-red"
          />
        </div>
      </div>
    </WrapTable>
  )
}
