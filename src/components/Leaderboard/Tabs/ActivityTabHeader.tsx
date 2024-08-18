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
    <div className="flex gap-4 self-stretch overflow-y-auto text-center font-medium leading-8 tracking-tight text-neutral-03 max-md:flex-wrap max-md:pr-5">
      {tabsActivity.map((item, index) => (
        <div
          key={index}
          onClick={() => handleActiveTab(item)}
          className={cn(
            'cursor-pointer justify-center whitespace-nowrap rounded-lg px-4 py-2 text-[15px] font-semibold not-italic leading-8 transition-all duration-300',
            activeTab === item
              ? 'rounded-lg border border-solid bg-neutral-03 text-neutral-07'
              : 'border border-solid border-transparent text-neutral-04',
          )}
        >
          {item}
        </div>
      ))}
    </div>
  )
}
