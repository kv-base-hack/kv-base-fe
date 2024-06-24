import React from 'react'
import { cn } from '@/lib/utils'
import { ActiveTab, tabsActivity } from '@/types/tabs/TabActivityHeader'

interface ActivityTabHeaderProps {
  activeTab: ActiveTab
  handleActiveTab: (value: ActiveTab) => void
}

export const ActivityTabHeader: React.FC<ActivityTabHeaderProps> = ({
  activeTab,
  handleActiveTab,
}) => {
  return (
    <div className="flex overflow-y-auto gap-4 self-stretch font-medium tracking-tight leading-8 text-center text-neutral-03 max-md:flex-wrap max-md:pr-5">
      {tabsActivity.map((item, index) => (
        <div
          key={index}
          onClick={() => handleActiveTab(item)}
          className={cn(
            'cursor-pointer whitespace-nowrap transition-all duration-300 justify-center px-4 py-2 rounded-lg text-[15px] not-italic font-semibold leading-8',
            activeTab === item
              ? 'bg-neutral-03 text-neutral-07 border border-solid rounded-lg'
              : 'text-neutral-04 border border-solid border-transparent',
          )}
        >
          {item}
        </div>
      ))}
    </div>
  )
}
