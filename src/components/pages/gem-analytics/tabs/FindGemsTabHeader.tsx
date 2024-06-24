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
    <div className="flex px-2 mt-4 flex-col text-base tracking-normal leading-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex overflow-y-auto gap-4 self-stretch font-medium tracking-tight text-center text-neutral-03 max-md:flex-wrap max-md:pr-5">
          {tabs.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleActiveTab(item)}
                className={cn(
                  'cursor-pointer whitespace-nowrap transition-all duration-300 justify-center px-4 py-2 !text-[15px] not-italic font-semibold',
                  activeTab === item
                    ? 'bg-neutral-03 text-neutral-07 border border-solid rounded-lg'
                    : 'text-neutral-04 border border-solid border-transparent',
                )}
              >
                {item}
              </div>
            )
          })}
        </div>
        <DialogFilterSpecificToken filterVal={filter} handleOk={handleOk}>
          <div className="flex items-center h-10 w-auto cursor-pointer px-4 my-auto text-base font-medium tracking-normal leading-6 text-neutral-07 whitespace-nowrap border border-solid backdrop-blur-[50px] border-neutral-03 rounded-lg">
            Add Filter
          </div>
        </DialogFilterSpecificToken>
      </div>
    </div>
  )
}
