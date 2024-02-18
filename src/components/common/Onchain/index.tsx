import { DataTable } from '@/components/common/DataTable'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { Activity, columnsActivity } from '@/components/common/DataTable/columnsActivity'
import {
  SmartMoneyRanking,
  columnsSmartMoneyRanking,
} from '@/components/common/DataTable/columnsSmartMoneyRanking'
import { PaginationCustom } from '@/components/common/Pagination'
import Calendar from '@/components/shared/icons/Calendar'
import Info from '@/components/shared/icons/Info'
import SwapDate from '@/components/shared/icons/SwapDate'
import { useState } from 'react'

const TypeActivityGroup = () => {
  return (
    <div className="flex gap-5 justify-between items-center text-base tracking-normal text-gray-500">
      <div className="justify-center self-stretch px-4 py-2 text-gray-300 rounded-lg aspect-[1.6] bg-gray-300 bg-opacity-10">
        All
      </div>{' '}
      <div className="self-stretch my-auto">Inflow</div>
      <div className="self-stretch my-auto">Outflow</div>
      <div className="grow self-stretch my-auto">Buying</div>
      <div className="grow self-stretch my-auto">Selling</div>
    </div>
  )
}

export const Onchain = ({
  dataActivity,
  dataSmartMoneyRanking,
}: {
  dataActivity: Activity[]
  dataSmartMoneyRanking: SmartMoneyRanking[]
}) => {
  const [page, setPage] = useState(1)
  return (
    <>
      <div className="flex my-4 items-center gap-4 self-stretch font-semibold whitespace-nowrap leading-[160%] max-md:flex-wrap">
        <div className="flex gap-2 my-auto text-xl tracking-tight">
          <div className="flex gap-2 justify-between text-gray-300">
            <div>ETH</div>
            <img
              loading="lazy"
              src="/assets/icons/chain/ethereum.svg"
              className="object-center w-6 aspect-square"
            />
          </div>
          <div className="grow text-gray-300">Onchain Signal</div>
        </div>
        <div className="flex gap-2 justify-between text-base tracking-normal max-md:flex-wrap max-md:max-w-full">
          <div className="grow cursor-pointer justify-center px-4 py-2 text-gray-300 rounded-lg bg-neutral-06">
            Smart Money
          </div>
          <div className="grow cursor-pointer justify-center px-4 py-2 text-gray-500 rounded-lg bg-neutral-07">
            Insider Trade
          </div>
        </div>
      </div>
      <WrapTable title="Smart Money Ranking" childHeader={<TypeActivityGroup />}>
        <div className="mt-8">
          {dataSmartMoneyRanking ? (
            <DataTable
              className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
              columns={columnsSmartMoneyRanking}
              data={dataSmartMoneyRanking}
              noneBorder
              noneBgHeader
              emptyData="No results."
            />
          ) : null}
        </div>
        <PaginationCustom
          className="mt-8"
          currentPage={page}
          updatePage={() => null}
          pageSize={10}
          total={10}
          setPage={setPage}
        />
      </WrapTable>
      <WrapTable
        className="mt-4"
        title="Smart Money's Activity"
        childHeader={<TypeActivityGroup />}>
        <div className="mt-8">
          {dataActivity ? (
            <DataTable
              className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
              columns={columnsActivity}
              data={dataActivity}
              noneBorder
              noneBgHeader
              emptyData="No results."
            />
          ) : null}
        </div>
        <PaginationCustom
          className="mt-8"
          currentPage={page}
          updatePage={() => null}
          pageSize={10}
          total={10}
          setPage={setPage}
        />
      </WrapTable>
      {/* */}
      <div className="flex flex-col mt-4">
        <div className="w-full text-xl font-semibold tracking-tight leading-8 text-white uppercase max-md:max-w-full">
          Market Movement
        </div>
        <div className="flex flex-col px-5 py-4 mt-4 w-full rounded-md border border-solid shadow-2xl backdrop-blur-lg bg-zinc-900 bg-opacity-30 border-white/10 max-md:max-w-full">
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
          <div className="flex overflow-hidden relative flex-col justify-center items-center px-16 py-12 mt-4 min-h-[275px] max-md:px-5 max-md:max-w-full">
            <div>Chart</div>
          </div>
        </div>
      </div>
      {/* */}
      <div className="self-stretch mt-4">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow self-stretch px-6 py-4 w-full whitespace-nowrap rounded-lg border border-solid shadow-2xl backdrop-blur-lg bg-neutral-07/50 border-white/10 max-md:px-5 max-md:mt-6 max-md:max-w-full">
              <div className="flex gap-4 justify-between pb-2 max-md:flex-wrap max-md:max-w-full">
                <div className="grow text-xl font-semibold tracking-tight leading-8 text-gray-300">
                  Withdraw vs Deposit
                </div>
                <div className="flex gap-5 justify-between items-center text-sm font-bold tracking-normal leading-4 text-gray-500">
                  <div className="cursor-pointer justify-center self-stretch px-4 py-2 text-gray-300 rounded-lg aspect-[1.88] bg-gray-300 bg-opacity-10">
                    24H
                  </div>
                  <div className="cursor-pointer self-stretch my-auto">7D</div>
                  <div className="cursor-pointer self-stretch my-auto">30D</div>
                  <div className="cursor-pointer grow self-stretch my-auto">3M</div>
                </div>
              </div>
              <div className="flex gap-5 justify-between py-4 max-md:flex-wrap max-md:max-w-full">
                <div className="flex flex-col justify-between text-lg tracking-tight leading-8 text-white basis-0">
                  <div>48.23%</div>
                  <div className="mt-56 max-md:mt-10">51.76%</div>
                </div>
                <div className="h-full w-[30px]">
                  <div style={{ height: '48.23%' }} className="bg-semantic-error-1"></div>
                  <div style={{ height: '51.76%' }} className="bg-primary-2"></div>
                </div>
                <div className="flex flex-col flex-1 justify-between">
                  <div className="flex flex-col items-start py-2 pr-20 pl-4 w-full rounded-lg border border-solid border-secondary-1 max-md:pr-5">
                    <div className="text-2xl leading-9 text-red-400">Withdraw</div>
                    <div className="flex gap-2 text-lg tracking-tight leading-8 text-gray-300">
                      <img
                        loading="lazy"
                        src="/assets/icons/token/usdt.svg"
                        className="my-auto w-10 aspect-square"
                      />
                      <div className="flex flex-col flex-1 justify-center">
                        <div>1,000,463.63</div>
                        <div>$14.576M</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start py-2 pr-20 pl-4 mt-14 w-full rounded-lg border border-solid border-secondary-4 max-md:pr-5 max-md:mt-10">
                    <div className="text-2xl leading-9 text-stone-400">Deposit</div>
                    <div className="flex gap-2 text-lg tracking-tight leading-8 text-gray-300">
                      <img
                        loading="lazy"
                        src="/assets/icons/token/usdt.svg"
                        className="my-auto w-10 aspect-square"
                      />
                      <div className="flex flex-col flex-1 justify-center">
                        <div>1,000,463.63</div>
                        <div>$14.576M</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow self-stretch px-6 py-4 w-full rounded-lg border border-solid shadow-2xl backdrop-blur-lg bg-neutral-07/50 border-white/10 max-md:px-5 max-md:mt-6 max-md:max-w-full">
              <div className="flex gap-5 justify-between pb-2 w-full max-md:flex-wrap max-md:max-w-full">
                <div className="flex-auto text-xl font-semibold tracking-tight leading-8 text-gray-300">
                  Sell vs Buy
                </div>
                <div className="flex gap-5 justify-between items-center text-sm font-bold tracking-normal leading-4 text-gray-500 whitespace-nowrap">
                  <div className="cursor-pointer justify-center self-stretch px-4 py-2 text-gray-300 rounded-lg aspect-[1.88] bg-gray-300 bg-opacity-10">
                    24H
                  </div>
                  <div className="cursor-pointer self-stretch my-auto">7D</div>
                  <div className="cursor-pointer self-stretch my-auto">30D</div>
                  <div className="cursor-pointer grow self-stretch my-auto">3M</div>
                </div>
              </div>
              <div className="flex gap-5 justify-between py-4 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                <div className="flex flex-col justify-between text-lg tracking-tight leading-8 text-white basis-0">
                  <div>20%</div>
                  <div className="mt-56 max-md:mt-10">80%</div>
                </div>
                <div className="h-full w-[30px]">
                  <div style={{ height: '20%' }} className="bg-semantic-error-1"></div>
                  <div style={{ height: '80%' }} className="bg-primary-2"></div>
                </div>
                <div className="flex flex-col flex-1 justify-between">
                  <div className="flex flex-col items-start py-2 pr-20 pl-4 w-full rounded-lg border border-solid border-secondary-1 max-md:pr-5">
                    <div className="text-2xl leading-9 text-red-400">Sell</div>
                    <div className="flex gap-2 text-lg tracking-tight leading-8 text-gray-300">
                      <img
                        loading="lazy"
                        src="/assets/icons/token/usdt.svg"
                        className="my-auto w-10 aspect-square"
                      />
                      <div className="flex flex-col flex-1 justify-center">
                        <div>1,000,463.63</div>
                        <div>$14.576M</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start py-2 pr-20 pl-4 mt-14 w-full rounded-lg border border-solid border-secondary-4 max-md:pr-5 max-md:mt-10">
                    <div className="text-2xl leading-9 text-stone-400">Buy</div>
                    <div className="flex gap-2 text-lg tracking-tight leading-8 text-gray-300">
                      <img
                        loading="lazy"
                        src="/assets/icons/token/usdt.svg"
                        className="my-auto w-10 aspect-square"
                      />
                      <div className="flex flex-col flex-1 justify-center">
                        <div>1,000,463.63</div>
                        <div>$14.576M</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
