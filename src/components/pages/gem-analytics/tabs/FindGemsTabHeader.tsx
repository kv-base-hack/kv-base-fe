import React from 'react'

import { ActiveTab, tabs } from './types'
import { cn } from '@/lib/utils'
import {
  DialogFilterSpecificToken,
  FilterValue,
} from '@/components/common/Dialog/DialogFilterSpecificToken'
import { useAtom } from 'jotai'
import { gemFilterAtom } from '@/atom/gemFilter'

interface FindGemsTabHeaderProps {
  activeTab: ActiveTab
  handleActiveTab: (value: ActiveTab) => void
}

export const FindGemsTabHeader: React.FC<FindGemsTabHeaderProps> = ({
  activeTab,
  handleActiveTab,
}) => {
  const [filter, setFilter] = useAtom(gemFilterAtom)
  const handleOk = (filter: FilterValue) => {
    setFilter(filter)
  }

  return (
    <div className="mt-4 flex flex-col px-2 text-base leading-6 tracking-normal">
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-4 self-stretch overflow-y-auto text-center font-medium tracking-tight text-neutral-03 max-md:flex-wrap max-md:pr-5">
          {tabs.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleActiveTab(item)}
                className={cn(
                  'cursor-pointer justify-center whitespace-nowrap px-4 py-2 !text-[15px] font-semibold not-italic transition-all duration-300',
                  activeTab === item
                    ? 'rounded-lg border border-solid bg-neutral-03 text-neutral-07'
                    : 'border border-solid border-transparent text-neutral-04',
                )}
              >
                {item}
              </div>
            )
          })}
        </div>
        <DialogFilterSpecificToken filterVal={filter} handleOk={handleOk}>
          <div className="my-auto flex h-10 w-auto cursor-pointer items-center whitespace-nowrap rounded-lg border border-solid border-neutral-03 px-4 text-base font-medium leading-6 tracking-normal text-neutral-07 backdrop-blur-[50px]">
            Add Filter
          </div>
        </DialogFilterSpecificToken>
      </div>
    </div>
  )
}
