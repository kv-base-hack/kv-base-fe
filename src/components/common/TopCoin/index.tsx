import { WrapTable } from '@/components/common/DataTable/WrapTable'
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
    symbol: 'USDC',
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

const DateGroup = () => {
  return (
    <div className="flex gap-5 justify-between items-center text-base tracking-normal text-gray-500">
      <div className="justify-center self-stretch px-4 py-2 text-gray-300 rounded-lg aspect-[1.6] bg-gray-300 bg-opacity-10">
        1H
      </div>{' '}
      <div className="self-stretch my-auto">4H</div>
      <div className="self-stretch my-auto">1D</div>
      <div className="grow self-stretch my-auto">3D</div>
    </div>
  )
}

export const TopCoin: React.FC<TopCoinProps> = ({ className }) => {
  const [page, setPage] = useState(1)

  return (
    <div className={cn('self-stretch', className)}>
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
        <div className="flex flex-col w-1/2 max-md:ml-0 max-md:w-full">
          <WrapTable title="Top Coin Inflow" colorHeader="bg-green-400" childHeader={<DateGroup />}>
            <div className="mt-8">
              {DUMMY_TOP_BOUGHT?.map((item, index) => (
                <div key={index} className="flex flex-col w-full">
                  <div className="flex gap-2 mt-3 tracking-normal max-md:flex-wrap max-md:mr-2 max-md:max-w-full">
                    <div className="flex items-center justify-start w-3/4 gap-3">
                      <div className="flex gap-3 text-gray-300 w-1/3">
                        <span className="w-3 flex justify-center">{item.id}</span>
                        <img
                          loading="lazy"
                          src="/assets/icons/token/usdt.svg"
                          className="w-6 h-6 aspect-square"
                        />
                        <div className="text-right">{item.symbol}</div>
                      </div>
                      <div className="w-2/3 flex justify-start">
                        <div
                          className="h-6 bg-green-200 rounded-sm"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="grow text-right text-green-200 w-1/4">
                      ${nFormatter(item.value, 2)}
                    </div>
                  </div>
                  {index < DUMMY_TOP_BOUGHT.length - 1 ? (
                    <div className="mt-3 max-w-full h-px rounded-sm bg-neutral-06 w-full max-md:mr-2" />
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
          </WrapTable>
        </div>
        <div className="flex flex-col w-1/2 max-md:ml-0 max-md:w-full">
          <WrapTable title="Top Coin Inflow" colorHeader="bg-red-400" childHeader={<DateGroup />}>
            <div className="mt-8">
              {DUMMY_TOP_BOUGHT?.map((item, index) => (
                <div key={index} className="flex flex-col w-full">
                  <div className="flex gap-2 mt-3 tracking-normal max-md:flex-wrap max-md:mr-2 max-md:max-w-full">
                    <div className="flex items-center justify-start w-3/4 gap-3">
                      <div className="flex gap-3 text-gray-300 w-1/3">
                        <span className="w-3 flex justify-center">{item.id}</span>
                        <img
                          loading="lazy"
                          src="/assets/icons/token/usdt.svg"
                          className="w-6 h-6 aspect-square"
                        />
                        <div className="text-right">{item.symbol}</div>
                      </div>
                      <div className="w-2/3 flex justify-start">
                        <div
                          className="h-6 bg-red-400 rounded-sm"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="grow text-right text-red-400 w-1/4">
                      ${nFormatter(item.value, 2)}
                    </div>
                  </div>
                  {index < DUMMY_TOP_BOUGHT.length - 1 ? (
                    <div className="mt-3 max-w-full h-px rounded-sm bg-neutral-06 w-full max-md:mr-2" />
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
          </WrapTable>
        </div>
      </div>
    </div>
  )
}
