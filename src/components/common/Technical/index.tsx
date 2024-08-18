import { WrapTable } from '@/components/common/DataTable/WrapTable'
import ArrowDownIcon from '@/components/shared/icons/ArrowDownIcon'
import LDOIcon from '@/components/shared/icons/LDOIcon'
import Image from 'next/image'

const RightGroup = () => {
  return (
    <div className="flex justify-between gap-4 rounded-lg px-3 text-gray-500">
      <div className="flex items-center justify-between gap-2 rounded-xl border-2 border-solid border-white/10 px-4 py-2">
        <div className="grow">Technical Types</div>
        <ArrowDownIcon />
      </div>
      <div className="flex items-center justify-between gap-2 rounded-xl border-2 border-solid border-white/10 px-4 py-2">
        <div className="grow">Timeframes: 15m</div>
        <ArrowDownIcon />
      </div>
    </div>
  )
}

export const Technical = () => {
  return (
    <WrapTable
      title="Technicals"
      colorHeader="bg-secondary-2"
      childHeader={<RightGroup />}
    >
      <div className="mt-4 flex items-center gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex w-1/3 flex-col rounded-lg border border-solid border-white/10 bg-gray-300 bg-opacity-10 p-6"
          >
            <div className="flex justify-between gap-4">
              <Image
                loading="lazy"
                alt="ldo"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/722f1ba48df602c8ef003c59c6253430a70087751c8e74b194ff990d0d2ba4cc?"
                className="my-auto aspect-square w-10 fill-blue-950"
                width={40}
                height={40}
              />
              <div className="flex flex-1 flex-col pr-9">
                <div className="flex justify-between gap-1.5 whitespace-nowrap text-lg leading-8 tracking-tight text-neutral-01">
                  <div>LDO</div>
                  <div className="grow">RSI Overbought</div>
                </div>
                <div className="mt-1 text-sm font-bold leading-4 tracking-normal text-gray-500">
                  <span className="text-gray-500">15 min ago</span>{' '}
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2 whitespace-nowrap pr-20 text-xs font-bold leading-4 tracking-normal text-gray-500">
              <div className="aspect-[2.25] justify-center rounded bg-red-300 p-1 text-neutral-700">
                Bearish
              </div>
              <div className="aspect-[1.21] justify-center rounded bg-neutral-700 p-1">
                RSI
              </div>
              <div className="aspect-[1.38] justify-center rounded bg-neutral-700 p-1">
                15m
              </div>
              <div className="aspect-[3.04] justify-center rounded bg-neutral-700 p-1">
                LDO/USDT
              </div>
            </div>
            <div className="mt-8 flex w-full justify-between gap-5 whitespace-nowrap">
              <div className="text-base font-semibold leading-6 tracking-normal text-gray-500">
                Price
              </div>
              <div className="flex justify-between gap-1">
                <div className="grow text-base font-semibold leading-6 tracking-normal text-gray-300">
                  $14.87
                </div>
                <div className="flex justify-between gap-1 rounded bg-neutral-700 p-1 text-xs font-bold leading-4 tracking-normal text-gray-500">
                  <LDOIcon />
                  <div className="grow text-primary-2">
                    7.8% <span className="text-gray-500">in 4 hour</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-between gap-5 text-base font-semibold leading-6 tracking-normal">
              <div className="text-gray-500">Date</div>
              <div className="text-gray-300">20 Nov 2023, 11:00</div>
            </div>
            <div className="mt-4 flex justify-between gap-5 text-base font-semibold tracking-normal">
              <div className="self-start leading-[160%] text-gray-500">
                Description
              </div>
              <div className="text-right leading-6 text-gray-300">
                LDO 15m RSI crossed up 70, the last time this happened was 5
                days ago
              </div>
            </div>
          </div>
        ))}
      </div>
    </WrapTable>
  )
}
