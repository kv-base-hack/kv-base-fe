import { CustomInputFilter } from '@/components/common/Input/CustomInputFilter'
import ArrowDownIcon from '@/components/shared/icons/ArrowDownIcon'
import Close from '@/components/shared/icons/Close'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
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
      <DialogContent className="z-[999999] !p-0">
        <div className="flex max-w-[600px] flex-col rounded-xl bg-white p-6 max-md:px-5">
          <div className="flex justify-between gap-2 whitespace-nowrap text-xl font-medium leading-8 tracking-tight text-neutral-07 max-md:max-w-full max-md:flex-wrap">
            <div>Filter</div>
            <DialogClose className="border-none outline-none focus:outline-none">
              <Close />
            </DialogClose>
          </div>
          <div className="mt-2 text-base leading-6 tracking-normal text-neutral-07 max-md:max-w-full">
            Choose up to 7 metrics. You can apply filters based on the selected
            metrics (optional).
          </div>
          <div className="mt-8 flex gap-4 text-sm leading-5 text-neutral-07 max-md:flex-wrap">
            <div className="my-auto w-1/4 text-base font-medium leading-6 tracking-normal text-neutral-07">
              24h Price %
            </div>
            <div className="flex flex-1 justify-between gap-5 whitespace-nowrap rounded-xl border border-solid border-white border-opacity-10 bg-white bg-opacity-10">
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
            <div className="flex flex-1 justify-between gap-5 whitespace-nowrap rounded-xl border border-solid border-white border-opacity-10 bg-white bg-opacity-10">
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
          <div className="mt-4 flex gap-4 text-sm leading-5 text-neutral-07 max-md:flex-wrap">
            <div className="my-auto w-1/4 text-base font-medium leading-6 tracking-normal text-neutral-07">
              Market Cap
            </div>
            <div className="flex flex-1 justify-between gap-5 whitespace-nowrap rounded-xl border border-solid border-white border-opacity-10 bg-white bg-opacity-10">
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
            <div className="flex flex-1 justify-between gap-5 whitespace-nowrap rounded-xl border border-solid border-white border-opacity-10 bg-white bg-opacity-10">
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
          <div className="mt-4 flex gap-4 whitespace-nowrap text-sm leading-5 text-neutral-07 max-md:flex-wrap">
            <div className="my-auto w-1/4 text-base font-medium leading-6 tracking-normal text-neutral-07">
              TVL
            </div>
            <div className="flex flex-1 justify-between gap-5 rounded-xl border border-solid border-white border-opacity-10 bg-white bg-opacity-10">
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
            <div className="flex flex-1 justify-between gap-5 rounded-xl border border-solid border-white border-opacity-10 bg-white bg-opacity-10">
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
          <div className="mt-4 flex gap-4 whitespace-nowrap text-sm leading-5 text-neutral-07 max-md:flex-wrap">
            <div className="my-auto w-1/4 text-base font-medium leading-6 tracking-normal text-neutral-07">
              FDV
            </div>
            <div className="flex flex-1 justify-between gap-5 rounded-xl border border-solid border-white border-opacity-10 bg-white bg-opacity-10">
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
            <div className="flex flex-1 justify-between gap-5 rounded-xl border border-solid border-white border-opacity-10 bg-white bg-opacity-10">
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
          <div className="mt-4 flex gap-4 text-sm leading-5 text-neutral-07 max-md:flex-wrap">
            <div className="my-auto w-1/4 text-base font-medium leading-6 tracking-normal text-neutral-07">
              24H Volume
            </div>
            <div className="flex flex-1 justify-between gap-5 whitespace-nowrap rounded-xl border border-solid border-white border-opacity-10 bg-white bg-opacity-10">
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
            <div className="flex flex-1 justify-between gap-5 whitespace-nowrap rounded-xl border border-solid border-white border-opacity-10 bg-white bg-opacity-10">
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
          <div className="mt-4 flex gap-4 text-sm leading-5 text-neutral-07 max-md:flex-wrap">
            <div className="my-auto w-1/4 text-base font-medium leading-6 tracking-normal text-neutral-07">
              CEX Netflow
            </div>
            <div className="flex flex-1 justify-between gap-5 whitespace-nowrap rounded-xl border border-solid border-white border-opacity-10 bg-white bg-opacity-10">
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
            <div className="flex flex-1 justify-between gap-5 whitespace-nowrap rounded-xl border border-solid border-white border-opacity-10 bg-white bg-opacity-10">
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
          <div className="mt-4 flex items-center gap-4 max-md:max-w-full max-md:flex-wrap">
            <div className="my-auto w-1/4 self-stretch text-base font-medium leading-6 tracking-normal text-neutral-07">
              Category
            </div>
            <div className="flex flex-1 rounded-xl border border-solid border-white/10 bg-white/10 text-sm leading-6 text-neutral-07">
              <div className="flex w-full items-center px-3 py-2">
                <div className="flex-1">Select Category</div>
                <ArrowDownIcon />
              </div>
            </div>
            <div className="flex w-full flex-1 gap-2">
              <div className="flex flex-col justify-center">
                <Switch className="bg-neutral-09" />
              </div>
              <div className="my-auto text-sm font-medium leading-4 text-neutral-07">
                Only tokens on CEX
              </div>
            </div>
          </div>
          <div className="mt-8 flex gap-2 whitespace-nowrap font-medium max-md:max-w-full max-md:flex-wrap">
            <div
              onClick={() => handleReset()}
              className="flex flex-1 cursor-pointer items-center justify-center rounded-3xl border border-solid border-white/10 px-4 py-2 text-sm leading-6 text-neutral-07"
            >
              Reset
            </div>
            <DialogClose className="button-apply flex flex-1 cursor-pointer items-center justify-center rounded-3xl px-4 py-2 text-base leading-6 text-white">
              <div onClick={() => handleOk(filter)}> Apply</div>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
