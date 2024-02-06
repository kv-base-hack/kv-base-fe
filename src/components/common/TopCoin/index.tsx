import { PaginationCustom } from '@/components/common/Pagination'
import { cn } from '@/lib/utils'
import { nFormatter } from '@/utils/nFormatter'
import { useState } from 'react'

type TopCoinProps = {
  className?: string
}
const DUMMY_TOP_BOUGHT = [
  {
    id: '1',
    symbol: 'USDT',
    percentage: 75,
    value: 397362000,
  },
  {
    id: '2',
    symbol: 'USDC',
    percentage: 60,
    value: 135500000,
  },
  {
    id: '3',
    symbol: 'USDC',
    percentage: 50,
    value: 123900000,
  },
  {
    id: '4',
    symbol: 'USDC',
    percentage: 20,
    value: 10300000,
  },
  {
    id: '5',
    symbol: 'USDC',
    percentage: 10,
    value: 6300000,
  },
]

export const TopCoin: React.FC<TopCoinProps> = ({ className }) => {
  const [page, setPage] = useState(1)
  return (
    <div className={cn('self-stretch', className)}>
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow p-6 w-full text-base font-semibold leading-6 whitespace-nowrap rounded-lg border border-solid shadow-2xl backdrop-blur-lg bg-neutral-07/50 bg-opacity-50 border-white/10 max-md:pl-5 max-md:mt-4 max-md:max-w-full">
            <div className="flex gap-4 justify-between text-xl tracking-tight max-md:flex-wrap max-md:max-w-full">
              <div className="grow justify-center px-4 py-2 text-gray-300 rounded-lg bg-gray-300 bg-opacity-10">
                Top Coins Bought 24h
              </div>
              <div className="grow my-auto text-gray-500">Top Coins Inflow 24h</div>
            </div>
            <div className="mt-8">
              {DUMMY_TOP_BOUGHT?.map((item, index) => (
                <div key={index} className="flex flex-col w-full">
                  <div className="flex gap-2 mt-3 tracking-normal max-md:flex-wrap max-md:mr-2 max-md:max-w-full">
                    <div className="flex items-center justify-start w-full gap-3">
                      <div className="flex gap-3 text-gray-300 w-1/3">
                        <div>{item.id}</div>
                        <img
                          loading="lazy"
                          src="/assets/icons/token/usdt.svg"
                          className="w-6 h-6 aspect-square"
                        />
                        <div className="text-right">{item.symbol}</div>
                      </div>
                      <div className="w-2/3">
                        <div
                          className="h-6 bg-green-200 rounded-sm"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="grow text-right text-green-200">
                      ${nFormatter(item.value, 2)}
                    </div>
                  </div>
                  {index < DUMMY_TOP_BOUGHT.length - 1 ? (
                    <div className="mt-3 max-w-full h-px rounded-sm bg-neutral-07/50 w-full max-md:mr-2" />
                  ) : null}
                </div>
              ))}
            </div>
            <PaginationCustom
              className="mt-8"
              currentPage={page}
              updatePage={() => null}
              pageSize={10}
              total={10}
              setPage={setPage}
            />
          </div>
        </div>
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow p-6 w-full text-base font-semibold leading-6 whitespace-nowrap rounded-lg border border-solid shadow-2xl backdrop-blur-lg bg-zinc-900 bg-opacity-50 border-[color:var(--Stroke,rgba(255,255,255,0.10))] max-md:px-5 max-md:mt-4 max-md:max-w-full">
            <div className="flex gap-4 justify-between text-xl tracking-tight max-md:flex-wrap max-md:max-w-full">
              <div className="grow justify-center px-4 py-2 text-gray-300 rounded-lg bg-gray-300 bg-opacity-10">
                Top Coins Sold 24h
              </div>
              <div className="grow my-auto text-gray-500">Top Coins Outflow 24h</div>
            </div>
            <div className="mt-8">
              {DUMMY_TOP_BOUGHT?.map((item, index) => (
                <div key={index} className="flex flex-col w-full">
                  <div className="flex gap-2 mt-3 tracking-normal max-md:flex-wrap max-md:mr-2 max-md:max-w-full">
                    <div className="flex items-center justify-start w-full gap-3">
                      <div className="flex gap-3 text-gray-300 w-1/3">
                        <div>{item.id}</div>
                        <img
                          loading="lazy"
                          src="/assets/icons/token/usdt.svg"
                          className="w-6 h-6 aspect-square"
                        />
                        <div className="text-right">{item.symbol}</div>
                      </div>
                      <div className="w-2/3">
                        <div
                          className="h-6 bg-red-400 rounded-sm"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="grow text-right text-red-400">${nFormatter(item.value, 2)}</div>
                  </div>
                  {index < DUMMY_TOP_BOUGHT.length - 1 ? (
                    <div className="mt-3 max-w-full h-px rounded-sm bg-neutral-07/50 w-full max-md:mr-2" />
                  ) : null}
                </div>
              ))}
            </div>
            <PaginationCustom
              className="mt-8"
              currentPage={page}
              updatePage={() => null}
              pageSize={10}
              total={10}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
