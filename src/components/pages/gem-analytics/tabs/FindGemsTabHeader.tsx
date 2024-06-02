import React from 'react'
import {
  DialogFilterSpecificToken,
  FilterValue,
} from '@/components/common/Dialog/DialogFilterSpecificToken'

import { ActiveTab, tabs } from './types'
import { cn } from '@/lib/utils'
import { FindGemsTabHint } from './FindGemsTabHint'

interface FindGemsTabHeaderProps {
  activeTab: ActiveTab
  handleActiveTab: (value: ActiveTab) => void
}

export const FindGemsTabHeader: React.FC<FindGemsTabHeaderProps> = ({
  activeTab,
  handleActiveTab,
}) => {
  return (
    <div className="flex px-2 md:px-10 mt-4 flex-col text-base tracking-normal leading-6">
      <div className="flex overflow-y-auto gap-4 self-stretch font-medium tracking-tight leading-8 text-center text-neutral-03 max-md:flex-wrap max-md:pr-5">
        {tabs.map((item, index) => (
          <div
            key={index}
            onClick={() => handleActiveTab(item)}
            className={cn(
              'cursor-pointer whitespace-nowrap transition-all duration-300 justify-center px-4 py-2 rounded-[20px] !text-xl not-italic font-medium leading-8',
              activeTab === item
                ? 'tab-find-gems text-white border border-solid border-white/10'
                : 'bg-neutral-09/70 text-neutral-400 border border-solid border-transparent',
            )}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-4 text-neutral-01 max-md:flex-wrap">
        <div className="my-auto max-md:max-w-full">
          <FindGemsTabHint activeTab={activeTab} />
        </div>
      </div>
    </div>
  )
}
