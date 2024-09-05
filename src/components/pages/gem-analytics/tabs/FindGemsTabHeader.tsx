import React, { useEffect } from 'react'

import { tabToURLMapping, tabs } from './types'
import { cn } from '@/lib/utils'
import { TooltipCustom } from '@/components/common/Tooltip'
import InfoIcon from '@/components/shared/icons/dashboard/InfoIcon'
import { SelectDuration } from '@/components/common/Select/SelectDuration'
import { useQueryState } from 'nuqs'
import { SelectDurationLeaderboard } from '@/components/common/Select/SelectDuration/select-duration-leaderboard'
import { findGemsTabHint } from '@/constant/find-gems-tab-hint'

interface FindGemsTabHeaderProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export const FindGemsTabHeader: React.FC<FindGemsTabHeaderProps> = ({
  searchParams,
}) => {
  const currentCategory = searchParams?.category?.toString() || 'unusual-buying'
  const currentDuration =
    searchParams?.duration?.toString() ||
    (currentCategory === 'unusual-buying' ||
    currentCategory === 'st-first-time-buy' ||
    currentCategory === 'st-new-listing-buys'
      ? '24h'
      : '1d')

  const [, setDuration] = useQueryState('duration', {
    defaultValue: currentDuration,
    history: 'push',
    shallow: false,
  })

  const [, setCategory] = useQueryState('category', {
    defaultValue: currentCategory,
    history: 'push',
    shallow: false,
  })
  // run only first time if no have category
  useEffect(() => {
    if (currentCategory === 'unusual-buying') {
      setCategory(currentCategory)
    }
  }, [currentCategory, setCategory])

  const onChangeTab = (value: string) => () => {
    setDuration('')
    setCategory(value)
  }

  const renderDuration = (category: string) => {
    switch (category) {
      case 'unusual-buying':
      case 'st-first-time-buy':
      case 'st-new-listing-buys':
        return (
          <SelectDuration
            duration={currentDuration}
            setDuration={setDuration}
            type={currentCategory === 'unusual-buying' ? 'option4' : 'option2'}
          />
        )
      case 'st-top-buy':
        return (
          <SelectDurationLeaderboard
            duration={currentDuration}
            setDuration={setDuration}
            type="option3"
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="flex items-center justify-between text-base tracking-normal">
      <div className="hidden gap-4 self-stretch overflow-y-auto text-center font-medium leading-8 tracking-tight text-neutral-03 max-md:flex-wrap max-md:pr-5 lg:flex">
        {tabs.map((label, index) => {
          const value = tabToURLMapping[label]
          return (
            <div
              key={index}
              onClick={onChangeTab(value)}
              className={cn(
                'flex cursor-pointer items-center justify-center px-4 py-2 text-base font-medium not-italic leading-6 transition-all duration-300 hover:text-neutral-100',
                currentCategory === value
                  ? 'text-neutral-100'
                  : 'text-neutral-500',
              )}
            >
              <div className="flex flex-col items-center">
                <div className="flex h-auto w-auto items-center">
                  {label}

                  <TooltipCustom
                    className="w-[210px] border-white/10 bg-neutral-06 font-inter text-neutral-02 shadow-sm"
                    content={findGemsTabHint(value)}
                  >
                    <InfoIcon className="h-4 w-4 md:w-5 lg:w-5" />
                  </TooltipCustom>
                </div>
                <div
                  className={cn(
                    'mt-2 h-px w-full',
                    currentCategory === value ? 'bg-core' : 'bg-transparent',
                  )}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="depth-1 flex items-center justify-start overflow-x-auto p-4 text-lg font-medium leading-6 tracking-tight lg:hidden">
        {tabs.map((label, idx) => {
          const value = tabToURLMapping[label]
          return (
            <div
              className={cn(
                'cursor-pointer whitespace-nowrap',
                currentCategory === value
                  ? 'justify-center self-stretch rounded-3xl bg-neutral-01/10'
                  : 'my-auto self-stretch',
              )}
              key={idx}
              onClick={onChangeTab(value)}
            >
              <div className="flex gap-2 px-4 py-1">{label}</div>
            </div>
          )
        })}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="h-7 rounded-3xl bg-gradient-to-r from-[#9945FF] to-[#14F195] p-px shadow-lg backdrop-blur-[2px]">
            <div className="flex h-full cursor-pointer items-center justify-center whitespace-nowrap rounded-3xl bg-black px-4 text-sm leading-5 tracking-normal text-white">
              Add Filter
            </div>
          </div>
          {renderDuration(currentCategory)}
        </div>
        <div className="mt-2 h-px w-full bg-transparent"></div>
      </div>
    </div>
  )
}
