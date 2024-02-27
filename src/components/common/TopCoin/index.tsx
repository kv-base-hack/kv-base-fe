import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { DateGroup } from '@/components/common/DateGroup'
import { DATA_TOKEN } from '@/constant/token'
import { cn } from '@/lib/utils'
import { useCexInQuery } from '@/query/onchain-signal/getCexIn'
import { useCexOutQuery } from '@/query/onchain-signal/getCexOut'
import { nFormatter } from '@/utils/nFormatter'
import { useState } from 'react'

type TopCoinProps = {
  className?: string
}

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
    value: '168h',
    label: '3D',
  },
]

export const TopCoin: React.FC<TopCoinProps> = ({ className }) => {
  const [cexOutTab, setCexOutTab] = useState('24h')
  const [cexInTab, setCexInTab] = useState('24h')

  const cexInQuery = useCexInQuery({
    limitTopNetCexIn: 8,
    duration: cexInTab,
  })
  const dataCexIn = cexInQuery.data?.data.topCexIn || []
  const sumCexIn = dataCexIn.reduce((acc: number, cur) => acc + cur.value, 0)
  //
  const cexOutQuery = useCexOutQuery({
    limitTopNetCexOut: 8,
    duration: cexOutTab,
  })
  const dataCexOut = cexOutQuery.data?.data.topCexOut || []
  const sumCexOut = dataCexOut.reduce((acc: number, cur) => acc + cur.value, 0)
  //

  return (
    <div className={cn('self-stretch', className)}>
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
        <div className="flex flex-col w-1/2 max-md:ml-0 max-md:w-full">
          <WrapTable
            title="CEX Withdraw"
            info="A list of Tokens ranked by net withdrawals to Centralized exchanges. Net deposits are calculated as Withdrawals minus Deposits."
            colorHeader="bg-green-400"
            childHeader={
              <DateGroup dataSource={DATA_DATE} active={cexOutTab} handleActive={setCexOutTab} />
            }>
            <div className="mt-8">
              {dataCexOut?.map((item, index) => (
                <div key={index} className="flex flex-col w-full">
                  <div className="flex gap-2 mt-3 tracking-normal max-md:flex-wrap max-md:mr-2 max-md:max-w-full">
                    <div className="flex items-center justify-start w-3/4 gap-3">
                      <div className="flex gap-3 text-gray-300 w-[140px]">
                        <span className="w-3 flex justify-center">{index + 1}</span>
                        <img
                          loading="lazy"
                          src={DATA_TOKEN?.find((el) => el.token === item.symbol)?.image_url}
                          className="w-6 h-6 aspect-square"
                        />
                        <div className="text-right">{item.symbol}</div>
                      </div>
                      <div className="w-2/3 flex justify-start">
                        <div
                          className="h-6 bg-green-200 rounded-sm"
                          style={{ width: `${(item.value / sumCexOut) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="grow text-right text-green-200 w-1/4">
                      ${nFormatter(item.value, 2)}
                    </div>
                  </div>
                  {index < dataCexOut.length - 1 ? (
                    <div className="mt-3 max-w-full h-px rounded-sm bg-neutral-06 w-full max-md:mr-2" />
                  ) : null}
                </div>
              ))}
            </div>
          </WrapTable>
        </div>
        <div className="flex flex-col w-1/2 max-md:ml-0 max-md:w-full">
          <WrapTable
            title="CEX Deposit"
            info="A list of Tokens ranked by net deposits to Centralized exchanges. Net deposits are calculated as Deposits minus Withdrawals."
            colorHeader="bg-red-400"
            childHeader={
              <DateGroup dataSource={DATA_DATE} active={cexInTab} handleActive={setCexInTab} />
            }>
            <div className="mt-8">
              {dataCexIn?.map((item, index) => (
                <div key={index} className="flex flex-col w-full">
                  <div className="flex gap-2 mt-3 tracking-normal max-md:flex-wrap max-md:mr-2 max-md:max-w-full">
                    <div className="flex items-center justify-start w-3/4 gap-3">
                      <div className="flex gap-3 text-gray-300 w-[140px]">
                        <span className="w-3 flex justify-center">{index + 1}</span>
                        <img
                          loading="lazy"
                          src={DATA_TOKEN?.find((el) => el.token === item.symbol)?.image_url}
                          className="w-6 h-6 aspect-square"
                        />
                        <div className="text-right">{item.symbol}</div>
                      </div>
                      <div className="w-2/3 flex justify-start">
                        <div
                          className="h-6 bg-red-400 rounded-sm"
                          style={{ width: `${(item.value / sumCexIn) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="grow text-right text-red-400 w-1/4">
                      ${nFormatter(item.value, 2)}
                    </div>
                  </div>
                  {index < dataCexIn.length - 1 ? (
                    <div className="mt-3 max-w-full h-px rounded-sm bg-neutral-06 w-full max-md:mr-2" />
                  ) : null}
                </div>
              ))}
            </div>
          </WrapTable>
        </div>
      </div>
    </div>
  )
}
