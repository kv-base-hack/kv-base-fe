import { WrapTable } from '@/components/common/DataTable/WrapTable'
import ArrowDownIcon from '@/components/shared/icons/ArrowDownIcon'
import LDOIcon from '@/components/shared/icons/LDOIcon'
import Image from 'next/image'

const RightGroup = () => {
  return (
    <div className="flex gap-4 justify-between px-3 text-gray-500 rounded-lg">
      <div className="flex items-center gap-2 justify-between px-4 py-2 rounded-xl border-2 border-solid border-white/10">
        <div className="grow">Technical Types</div>
        <ArrowDownIcon />
      </div>
      <div className="flex items-center gap-2 justify-between px-4 py-2 rounded-xl border-2 border-solid border-white/10">
        <div className="grow">Timeframes: 15m</div>
        <ArrowDownIcon />
      </div>
    </div>
  )
}

export const Technical = () => {
  return (
    <WrapTable title="Technicals" colorHeader="bg-secondary-2" childHeader={<RightGroup />}>
      <div className="flex items-center gap-4 mt-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col p-6 rounded-lg border border-solid bg-gray-300 bg-opacity-10 border-white/10 w-1/3">
            <div className="flex gap-4 justify-between">
              <Image
                loading="lazy"
                alt="ldo"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/722f1ba48df602c8ef003c59c6253430a70087751c8e74b194ff990d0d2ba4cc?"
                className="my-auto w-10 aspect-square fill-blue-950"
                width={40}
                height={40}
              />
              <div className="flex flex-col flex-1 pr-9">
                <div className="flex gap-1.5 justify-between text-lg tracking-tight leading-8 whitespace-nowrap text-neutral-01">
                  <div>LDO</div>
                  <div className="grow">RSI Overbought</div>
                </div>
                <div className="mt-1 text-sm font-bold tracking-normal leading-4 text-gray-500">
                  <span className="text-gray-500">15 min ago</span>{' '}
                </div>
              </div>
            </div>
            <div className="flex gap-2 pr-20 mt-4 text-xs font-bold tracking-normal leading-4 text-gray-500 whitespace-nowrap">
              <div className="justify-center p-1 bg-red-300 rounded aspect-[2.25] text-neutral-700">
                Bearish
              </div>
              <div className="justify-center p-1 rounded aspect-[1.21] bg-neutral-700">RSI</div>
              <div className="justify-center p-1 rounded aspect-[1.38] bg-neutral-700">15m</div>
              <div className="justify-center p-1 rounded aspect-[3.04] bg-neutral-700">
                LDO/USDT
              </div>
            </div>
            <div className="flex gap-5 justify-between mt-8 w-full whitespace-nowrap">
              <div className="text-base font-semibold tracking-normal leading-6 text-gray-500">
                Price
              </div>
              <div className="flex gap-1 justify-between">
                <div className="grow text-base font-semibold tracking-normal leading-6 text-gray-300">
                  $14.87
                </div>
                <div className="flex gap-1 justify-between p-1 text-xs font-bold tracking-normal leading-4 text-gray-500 rounded bg-neutral-700">
                  <LDOIcon />
                  <div className="grow text-primary-2">
                    7.8% <span className="text-gray-500">in 4 hour</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-5 justify-between mt-4 text-base font-semibold tracking-normal leading-6">
              <div className="text-gray-500">Date</div>
              <div className="text-gray-300">20 Nov 2023, 11:00</div>
            </div>
            <div className="flex gap-5 justify-between mt-4 text-base font-semibold tracking-normal">
              <div className="self-start text-gray-500 leading-[160%]">Description</div>
              <div className="leading-6 text-right text-gray-300">
                LDO 15m RSI crossed up 70, the last time this happened was 5 days ago
              </div>
            </div>
          </div>
        ))}
      </div>
    </WrapTable>
  )
}
