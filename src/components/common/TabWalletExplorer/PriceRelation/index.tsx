import { DateGroup } from '@/components/common/DateGroup'
// import Calendar from '@/components/shared/icons/Calendar'
// import Info from '@/components/shared/icons/Info'
// import SwapDate from '@/components/shared/icons/SwapDate'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useTokenInspectBuySellQuery } from '@/query/token-explorer/getTokenInspectBuySell'
import { useTokenInspectDepositWithdrawQuery } from '@/query/token-explorer/getTokenInspectDepositWithdraw'
import { TokenInfo } from '@/types/tokenInfo'
import { nFormatter } from '@/lib/utils/nFormatter'
import numeral from 'numeral'
import { useState } from 'react'
// import { ChartCompare } from './ChartCompare'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { useParams } from 'next/navigation'

const DATA_DATE = [
  {
    value: '1h',
    label: '1h',
  },
  {
    value: '4h',
    label: '4h',
  },
  {
    value: '24h',
    label: '1D',
  },
  {
    value: '72h',
    label: '3D',
  },
]

export const PriceRelation = ({
  dataTokenInfo,
}: {
  dataTokenInfo?: TokenInfo
}) => {
  const [durationWithDrawDeposit, setDurationWithDrawDeposit] = useState('24h')
  const [durationSellBuy, setDurationSellBuy] = useState('24h')
  const params = useParams<{ token: string }>()
  const CHAIN = useAtomValue(chainAtom)
  //
  const tokenInspectDepositWithdraw = useTokenInspectDepositWithdrawQuery({
    address: params?.token,
    duration: durationWithDrawDeposit,
    chain: CHAIN,
  })
  const dataTokenInspectDW = tokenInspectDepositWithdraw.data?.data

  const totalWithdrawDeposit =
    (dataTokenInspectDW?.cex_in_flow || 0) +
    (dataTokenInspectDW?.cex_out_flow || 0)

  const percentWithdraw = (
    ((dataTokenInspectDW?.cex_out_flow || 0) / (totalWithdrawDeposit || 1)) *
    100
  ).toFixed(2)

  const percentDeposit = (
    ((dataTokenInspectDW?.cex_in_flow || 0) / (totalWithdrawDeposit || 1)) *
    100
  ).toFixed(2)
  //
  const tokenInspectBuySell = useTokenInspectBuySellQuery({
    address: params?.token,
    duration: durationSellBuy,
    chain: CHAIN,
  })
  const dataTokenInspectBS = tokenInspectBuySell.data?.data

  const totalBuySell =
    (dataTokenInspectBS?.in_flow_in_token || 0) +
    (dataTokenInspectBS?.out_flow_in_token || 0)

  const percentBuy = (
    ((dataTokenInspectBS?.in_flow_in_token || 0) / (totalBuySell || 1)) *
    100
  ).toFixed(2)

  const percentSell = (
    ((dataTokenInspectBS?.out_flow_in_token || 0) / (totalBuySell || 1)) *
    100
  ).toFixed(2)

  return (
    <div>
      {/* */}
      {/* <div className="flex flex-col w-full">
        <div className="flex flex-col px-5 py-4 w-full rounded-md border border-solid shadow-2xl backdrop-blur-lg bg-neutral-07/50 border-white/10 w-full">
          <div className="flex gap-5 justify-between pb-2.5 w-full max-md:flex-wrap max-md:max-w-full">
            <div className="flex gap-2.5 items-center justify-between pr-2.5 text-xl font-semibold tracking-tight leading-8 text-white max-md:flex-wrap max-md:max-w-full">
              <div className="grow max-md:max-w-full">
                Price relation with Deposits & Withdrawals
              </div>
              <Info />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 text-sm tracking-normal leading-6 text-gray-300 whitespace-nowrap rounded-md shadow-2xl backdrop-blur-lg bg-gray-300 bg-opacity-10">
              <div className="grow">2020-11-02</div>
              <SwapDate />
              <div className="flex-auto">2020-11-02</div>
              <Calendar />
            </div>
          </div>
          <div className="flex gap-20 justify-start pr-20 w-full text-sm tracking-normal leading-6 text-white whitespace-nowrap max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
            <div className="flex gap-5 justify-between">
              <div className="my-auto w-2 h-2 bg-emerald-400 rounded" />
              <div>Deposit</div>
            </div>
            <div className="flex gap-5 justify-between">
              <div className="my-auto w-2 h-2 bg-red-400 rounded" />
              <div>Withdrawals</div>
            </div>
            <div className="flex gap-5 justify-between">
              <div className="my-auto h-px bg-blue-500 w-[30px]" />
              <div>Price</div>
            </div>
          </div>
          <ChartCompare />
        </div>
      </div> */}
      {/* */}
      <div className="mt-4 w-full self-stretch">
        <div className="flex gap-5 max-lg:flex-col max-lg:gap-0">
          <div className="flex w-1/2 flex-col max-lg:ml-0 max-lg:w-full">
            <div className="flex w-full grow flex-col self-stretch whitespace-nowrap rounded-lg border border-solid border-white/10 bg-neutral-07/50 px-6 py-4 shadow-2xl backdrop-blur-lg max-md:mt-6 max-md:max-w-full max-md:px-5">
              <div className="flex justify-between gap-4 pb-2 max-md:max-w-full max-md:flex-wrap">
                <div className="grow text-xl font-semibold leading-8 tracking-tight text-gray-300">
                  Withdraw vs Deposit
                </div>
                <DateGroup
                  dataSource={DATA_DATE}
                  active={durationWithDrawDeposit}
                  handleActive={setDurationWithDrawDeposit}
                />
              </div>
              <div className="flex justify-between gap-5 py-4 max-md:max-w-full max-md:flex-wrap">
                <div className="flex basis-0 flex-col justify-between text-lg leading-8 tracking-tight text-white">
                  <div>{percentWithdraw}%</div>
                  <div className="mt-56 max-md:mt-10">{percentDeposit}%</div>
                </div>
                <div className="h-full w-[30px]">
                  <div
                    style={{
                      height: `${percentWithdraw}%`,
                    }}
                    className="bg-semantic-error-1"
                  ></div>
                  <div
                    style={{
                      height: `${percentDeposit}%`,
                    }}
                    className="bg-primary-2"
                  ></div>
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex w-full flex-col items-start rounded-lg border border-solid border-secondary-1 py-2 pl-4 pr-20 max-md:pr-5">
                    <div className="text-2xl leading-9 text-red-400">
                      Withdraw
                    </div>
                    <div className="flex gap-2 text-lg leading-8 tracking-tight text-gray-300">
                      <ImageToken
                        className="h-10 w-10"
                        symbol={dataTokenInfo?.symbol}
                      />
                      <div className="flex flex-1 flex-col justify-center">
                        <div>
                          {numeral(
                            dataTokenInspectDW?.cex_out_flow || 0,
                          ).format('0,0.00')}
                        </div>
                        <div>
                          $
                          {nFormatter(
                            dataTokenInspectDW?.cex_out_flow_in_usdt || 0,
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-14 flex w-full flex-col items-start rounded-lg border border-solid border-secondary-4 py-2 pl-4 pr-20 max-md:mt-10 max-md:pr-5">
                    <div className="text-2xl leading-9 text-stone-400">
                      Deposit
                    </div>
                    <div className="flex gap-2 text-lg leading-8 tracking-tight text-gray-300">
                      <ImageToken
                        className="h-10 w-10"
                        symbol={dataTokenInfo?.symbol}
                      />
                      <div className="flex flex-1 flex-col justify-center">
                        <div>
                          {numeral(dataTokenInspectDW?.cex_in_flow || 0).format(
                            '0,0.00',
                          )}
                        </div>
                        <div>
                          $
                          {nFormatter(
                            dataTokenInspectDW?.cex_in_flow_in_usdt || 0,
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-5 mt-4 flex w-1/2 flex-col max-lg:ml-0 max-lg:w-full lg:mt-0">
            <div className="flex w-full grow flex-col self-stretch rounded-lg border border-solid border-white/10 bg-neutral-07/50 px-6 py-4 shadow-2xl backdrop-blur-lg max-md:mt-6 max-md:max-w-full max-md:px-5">
              <div className="flex w-full justify-between gap-5 pb-2 max-lg:max-w-full max-lg:flex-wrap">
                <div className="flex-auto text-xl font-semibold leading-8 tracking-tight text-gray-300">
                  Sell vs Buy
                </div>
                <DateGroup
                  dataSource={DATA_DATE}
                  active={durationSellBuy}
                  handleActive={setDurationSellBuy}
                />
              </div>
              <div className="flex justify-between gap-5 whitespace-nowrap py-4 max-md:max-w-full max-md:flex-wrap">
                <div className="flex basis-0 flex-col justify-between text-lg leading-8 tracking-tight text-white">
                  <div>{percentSell}%</div>
                  <div className="mt-56 max-md:mt-10">{percentBuy}%</div>
                </div>
                <div className="h-full w-[30px]">
                  <div
                    style={{ height: `${percentSell}%` }}
                    className="bg-semantic-error-1"
                  ></div>
                  <div
                    style={{ height: `${percentBuy}%` }}
                    className="bg-primary-2"
                  ></div>
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex w-full flex-col items-start rounded-lg border border-solid border-secondary-1 py-2 pl-4 pr-20 max-md:pr-5">
                    <div className="text-2xl leading-9 text-red-400">Sell</div>
                    <div className="flex gap-2 text-lg leading-8 tracking-tight text-gray-300">
                      <ImageToken
                        className="h-10 w-10"
                        symbol={dataTokenInfo?.symbol}
                      />
                      <div className="flex flex-1 flex-col justify-center">
                        <div>
                          {numeral(
                            dataTokenInspectBS?.out_flow_in_token || 0,
                          ).format('0,0.00')}
                        </div>
                        <div>
                          $
                          {nFormatter(
                            dataTokenInspectBS?.out_flow_in_usdt || 0,
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-14 flex w-full flex-col items-start rounded-lg border border-solid border-secondary-4 py-2 pl-4 pr-20 max-md:mt-10 max-md:pr-5">
                    <div className="text-2xl leading-9 text-stone-400">Buy</div>
                    <div className="flex gap-2 text-lg leading-8 tracking-tight text-gray-300">
                      <ImageToken
                        className="h-10 w-10"
                        symbol={dataTokenInfo?.symbol}
                      />
                      <div className="flex flex-1 flex-col justify-center">
                        <div>
                          {numeral(
                            dataTokenInspectBS?.in_flow_in_token || 0,
                          ).format('0,0.00')}
                        </div>
                        <div>
                          $
                          {nFormatter(dataTokenInspectBS?.in_flow_in_usdt || 0)}
                        </div>
                      </div>
                    </div>
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
