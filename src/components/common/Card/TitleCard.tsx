import React, { ReactNode } from 'react'
import { TooltipCustom } from '../Tooltip'
import Info from '@/components/shared/icons/Info'

export const TitleCard = ({
  iconFirst,
  title,
  iconSecond,
  children,
  content,
}: {
  iconFirst?: ReactNode
  title: string
  iconSecond?: ReactNode
  children?: ReactNode
  content?: string
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-1 lg:gap-2">
          {iconFirst}
          <p className="font-inter text-lg font-semibold text-neutral-07">
            {title}
          </p>
        </div>
        {content && (
          <TooltipCustom content={content as string} side="bottom">
            <Info className="h-5 w-5" />
          </TooltipCustom>
        )}
      </div>
      {children}
    </div>
  )
}
