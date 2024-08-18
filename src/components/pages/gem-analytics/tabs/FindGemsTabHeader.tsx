import React from 'react'

import { cn } from '@/lib/utils'
import { TooltipCustom } from '@/components/common/Tooltip'
import InfoIcon from '@/components/shared/icons/dashboard/InfoIcon'

import { SelectDuration } from '@/components/common/Select/SelectDuration'
import { useQueryState } from 'nuqs'
import { findGemsTabHint } from '@/constant/find-gems-tab-hint'
import { ActiveTab, tabs } from '@/types/find-gems'

interface FindGemsTabHeaderProps {
  activeTab: ActiveTab
  handleActiveTab: (value: ActiveTab) => void
  searchParams?: { [key: string]: string | string[] | undefined }
}

export const FindGemsTabHeader: React.FC<FindGemsTabHeaderProps> = ({
  activeTab,
  handleActiveTab,
  searchParams,
}) => {
  const currentDuration = searchParams?.ub_duration?.toString() || '24h'

  const [, setDuration] = useQueryState('duration', {
    defaultValue: currentDuration,
    history: 'push',
    shallow: false,
  })

  return (
    <div className="flex items-center justify-between text-base tracking-normal">
      <div className="hidden gap-4 self-stretch overflow-y-auto text-center font-medium leading-8 tracking-tight text-neutral-03 max-md:flex-wrap max-md:pr-5 lg:flex">
        {tabs.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => handleActiveTab(item)}
              className={cn(
                'flex cursor-pointer items-center justify-center px-4 py-2 text-base font-medium not-italic leading-6 transition-all duration-300 hover:text-neutral-100',
                activeTab === item ? 'text-neutral-100' : 'text-neutral-500',
              )}
            >
              <div className="flex flex-col items-center">
                <div className="flex h-auto w-auto items-center">
                  {item}

                  <TooltipCustom
                    className="z-[999] w-[210px] border-white/10 bg-neutral-06 font-inter text-neutral-02 shadow-sm"
                    content={findGemsTabHint(item)}
                  >
                    <InfoIcon className="h-4 w-4 md:w-5 lg:w-5" />
                  </TooltipCustom>
                </div>
                <div
                  className={cn(
                    'mt-2 h-px w-full',
                    activeTab === item ? 'bg-core' : 'bg-transparent',
                  )}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="depth-1 flex items-center justify-start overflow-x-auto p-4 text-lg font-medium leading-6 tracking-tight lg:hidden">
        {tabs.map((item, idx) => (
          <div
            className={cn(
              'cursor-pointer whitespace-nowrap',
              activeTab === item
                ? 'justify-center self-stretch rounded-3xl bg-neutral-01/10'
                : 'my-auto self-stretch',
            )}
            key={idx}
            onClick={() => handleActiveTab(item)}
          >
            <div className="flex gap-2 px-4 py-1">{item}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="h-7 rounded-3xl bg-gradient-to-r from-[#9945FF] to-[#14F195] p-px shadow-lg backdrop-blur-[2px]">
          <div className="flex h-full cursor-pointer items-center justify-center whitespace-nowrap rounded-3xl bg-black px-4 text-sm leading-5 tracking-normal text-white">
            Add Filter
          </div>
        </div>

        <SelectDuration duration={currentDuration} setDuration={setDuration} />
      </div>
    </div>
  )
}
