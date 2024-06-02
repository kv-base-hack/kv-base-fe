import { CustomInputFilter } from '@/components/common/Input/CustomInputFilter'
import ArrowDownIcon from '@/components/shared/icons/ArrowDownIcon'
import Close from '@/components/shared/icons/Close'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'

export type FilterValue = {
  min24hPrice: number
  max24hPrice: number
  minMarketcap: number
  maxMarketcap: number
  minTVL: number
  maxTVL: number
  minFDV: number
  maxFDV: number
  min24hVolumn: number
  max24hVolumn: number
  minCexNetflow: number
  maxCexNetflow: number
}

export const DialogFilterSpecificToken = ({
  children,
  filterVal,
  handleOk,
}: {
  children: React.ReactNode
  filterVal: FilterValue
  handleOk: (filter: FilterValue) => void
}) => {
  const [filter, setFilter] = useState(filterVal)

  const handleReset = () => {
    setFilter({
      min24hPrice: 0,
      max24hPrice: 0,
      minMarketcap: 0,
      maxMarketcap: 0,
      minTVL: 0,
      maxTVL: 0,
      minFDV: 0,
      maxFDV: 0,
      min24hVolumn: 0,
      max24hVolumn: 0,
      minCexNetflow: 0,
      maxCexNetflow: 0,
    })
    handleOk({
      min24hPrice: 0,
      max24hPrice: 0,
      minMarketcap: 0,
      maxMarketcap: 0,
      minTVL: 0,
      maxTVL: 0,
      minFDV: 0,
      maxFDV: 0,
      min24hVolumn: 0,
      max24hVolumn: 0,
      minCexNetflow: 0,
      maxCexNetflow: 0,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!p-0 z-[999999]">
        <div className="flex flex-col p-6 rounded-xl bg-zinc-900 bg-opacity-40 max-w-[600px] max-md:px-5">
          <div className="flex gap-2 justify-between text-xl font-medium tracking-tight leading-8 whitespace-nowrap text-stone-300 max-md:flex-wrap max-md:max-w-full">
            <div>Filter</div>
            <DialogClose className="border-none focus:outline-none outline-none">
              <Close />
            </DialogClose>
          </div>
          <div className="mt-2 text-base tracking-normal leading-6 text-neutral-03 max-md:max-w-full">
            Choose up to 7 metrics. You can apply filters based on the selected metrics (optional).
          </div>
          <div className="flex gap-4 mt-8 text-sm leading-5 text-neutral-04 max-md:flex-wrap">
            <div className="w-1/4 my-auto text-base font-medium tracking-normal leading-6 text-neutral-03">
              24h Price %
            </div>
            <div className="flex flex-1 gap-5 justify-between whitespace-nowrap rounded-xl border border-solid bg-white bg-opacity-10 border-white border-opacity-10">
              <CustomInputFilter
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    min24hPrice: parseFloat(e.target.value),
                  })
                }
                type="number"
                step="0.01"
                value={filter.min24hPrice}
                placeholder="Min"
                icon={<div>%</div>}
              />
            </div>
            <div className="flex flex-1 gap-5 justify-between whitespace-nowrap rounded-xl border border-solid bg-white bg-opacity-10 border-white border-opacity-10">
              <CustomInputFilter
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    max24hPrice: parseFloat(e.target.value),
                  })
                }
                type="number"
                step="0.01"
                value={filter.max24hPrice}
                placeholder="Max"
                icon={<div>%</div>}
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4 text-sm leading-5 text-neutral-04 max-md:flex-wrap">
            <div className="w-1/4 my-auto text-base font-medium tracking-normal leading-6 text-neutral-03">
              Market Cap
            </div>
            <div className="flex flex-1 gap-5 justify-between whitespace-nowrap rounded-xl border border-solid bg-white bg-opacity-10 border-white border-opacity-10">
              <CustomInputFilter
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    minMarketcap: parseFloat(e.target.value),
                  })
                }
                step="0.01"
                type="number"
                value={filter.minMarketcap}
                placeholder="Min"
                icon={<div>$</div>}
              />
            </div>
            <div className="flex flex-1 gap-5 justify-between whitespace-nowrap rounded-xl border border-solid bg-white bg-opacity-10 border-white border-opacity-10">
              <CustomInputFilter
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    maxMarketcap: parseFloat(e.target.value),
                  })
                }
                step="0.01"
                type="number"
                value={filter.maxMarketcap}
                placeholder="Max"
                icon={<div>$</div>}
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4 text-sm leading-5 whitespace-nowrap text-neutral-04 max-md:flex-wrap">
            <div className="w-1/4 my-auto text-base font-medium tracking-normal leading-6 text-neutral-03">
              TVL
            </div>
            <div className="flex flex-1 gap-5 justify-between rounded-xl border border-solid bg-white bg-opacity-10 border-white border-opacity-10">
              <CustomInputFilter
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    minTVL: parseFloat(e.target.value),
                  })
                }
                step="0.01"
                type="number"
                value={filter.minTVL}
                placeholder="Min"
                icon={<div>$</div>}
              />
            </div>
            <div className="flex flex-1 gap-5 justify-between rounded-xl border border-solid bg-white bg-opacity-10 border-white border-opacity-10">
              <CustomInputFilter
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    maxTVL: parseFloat(e.target.value),
                  })
                }
                step="0.01"
                type="number"
                value={filter.maxTVL}
                placeholder="Max"
                icon={<div>$</div>}
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4 text-sm leading-5 whitespace-nowrap text-neutral-04 max-md:flex-wrap">
            <div className="w-1/4 my-auto text-base font-medium tracking-normal leading-6 text-neutral-03">
              FDV
            </div>
            <div className="flex flex-1 gap-5 justify-between rounded-xl border border-solid bg-white bg-opacity-10 border-white border-opacity-10">
              <CustomInputFilter
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    minFDV: parseFloat(e.target.value),
                  })
                }
                step="0.01"
                type="number"
                value={filter.minFDV}
                placeholder="Min"
                icon={<div>$</div>}
              />
            </div>
            <div className="flex flex-1 gap-5 justify-between rounded-xl border border-solid bg-white bg-opacity-10 border-white border-opacity-10">
              <CustomInputFilter
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    maxFDV: parseFloat(e.target.value),
                  })
                }
                step="0.01"
                type="number"
                value={filter.maxFDV}
                placeholder="Max"
                icon={<div>$</div>}
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4 text-sm leading-5 text-neutral-04 max-md:flex-wrap">
            <div className="w-1/4 my-auto text-base font-medium tracking-normal leading-6 text-neutral-03">
              24H Volume
            </div>
            <div className="flex flex-1 gap-5 justify-between whitespace-nowrap rounded-xl border border-solid bg-white bg-opacity-10 border-white border-opacity-10">
              <CustomInputFilter
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    min24hVolumn: parseFloat(e.target.value),
                  })
                }
                step="0.01"
                type="number"
                value={filter.min24hVolumn}
                placeholder="Min"
                icon={<div>$</div>}
              />
            </div>
            <div className="flex flex-1 gap-5 justify-between whitespace-nowrap rounded-xl border border-solid bg-white bg-opacity-10 border-white border-opacity-10">
              <CustomInputFilter
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    max24hVolumn: parseFloat(e.target.value),
                  })
                }
                step="0.01"
                type="number"
                value={filter.max24hVolumn}
                placeholder="Max"
                icon={<div>$</div>}
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4 text-sm leading-5 text-neutral-04 max-md:flex-wrap">
            <div className="w-1/4 my-auto text-base font-medium tracking-normal leading-6 text-neutral-03">
              CEX Netflow
            </div>
            <div className="flex flex-1 gap-5 justify-between whitespace-nowrap rounded-xl border border-solid bg-white bg-opacity-10 border-white border-opacity-10">
              <CustomInputFilter
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    minCexNetflow: parseFloat(e.target.value),
                  })
                }
                step="0.01"
                value={filter.minCexNetflow}
                placeholder="Min"
                icon={<div>$</div>}
              />
            </div>
            <div className="flex flex-1 gap-5 justify-between whitespace-nowrap rounded-xl border border-solid bg-white bg-opacity-10 border-white border-opacity-10">
              <CustomInputFilter
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    maxCexNetflow: parseFloat(e.target.value),
                  })
                }
                step="0.01"
                value={filter.maxCexNetflow}
                placeholder="Max"
                icon={<div>$</div>}
              />
            </div>
          </div>
          <div className="flex gap-4 items-center mt-4 max-md:flex-wrap max-md:max-w-full">
            <div className="w-1/4 self-stretch my-auto text-base font-medium tracking-normal leading-6 text-neutral-03">
              Category
            </div>
            <div className="flex flex-1 text-sm leading-6 rounded-xl border border-solid bg-white/10 border-white/10 text-neutral-04">
              <div className="flex items-center px-3 py-2 w-full">
                <div className="flex-1">Select Category</div>
                <ArrowDownIcon />
              </div>
            </div>
            <div className="flex flex-1 gap-2 w-full">
              <div className="flex flex-col justify-center">
                <Switch className="bg-neutral-09" />
              </div>
              <div className="my-auto text-sm font-medium leading-4 text-stone-300">
                Only tokens on CEX
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-8 font-medium whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
            <div
              onClick={() => handleReset()}
              className="flex cursor-pointer flex-1 justify-center items-center px-4 py-2 text-sm leading-6 rounded-3xl border border-solid border-white/10 text-neutral-03">
              Reset
            </div>
            <DialogClose className="flex cursor-pointer button-apply flex-1 justify-center items-center px-4 py-2 text-base leading-6 text-white rounded-3xl">
              <div onClick={() => handleOk(filter)}> Apply</div>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
