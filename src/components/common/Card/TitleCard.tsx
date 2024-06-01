import React, { ReactNode } from 'react'

export const TitleCard = ({
  iconFirst,
  title,
  iconSecond,
  children,
}: {
  iconFirst?: ReactNode
  title: string
  iconSecond?: ReactNode
  children?: ReactNode
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          {iconFirst}
          <p className="text-neutral-07 font-semibold text-lg">{title}</p>
        </div>
        {iconSecond}
      </div>
      {children}
    </div>
  )
}
