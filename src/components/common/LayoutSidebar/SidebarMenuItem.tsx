import ArrowRightIcon from '@/components/shared/icons/sidebar/ArrowRightIcon'
import ArrowUpIcon from '@/components/shared/icons/sidebar/ArrowUpIcon'
import { ISidebarMenu } from '@/constant'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import React, { useEffect } from 'react'

type SidebarMenuItemProps = {
  data: ISidebarMenu
}

const SidebarMenuChildItem: React.FC<SidebarMenuItemProps> = ({ data }) => {
  return (
    <div className="cursor-pointer flex justify-between items-stretch rounded-xl">
      {data.icon}
      <Link
        to={data.href || '/'}
        activeProps={{
          className: '!text-gray-100 bg-gray-300/10 shadow-sm',
        }}
        activeOptions={{ exact: true }}
        className="flex-auto h-full p-3 text-base font-semibold tracking-normal leading-6 transition-all duration-150 text-gray-500 rounded-xl hover:shadow-sm hover:rounded-xl hover:bg-gray-300 hover:text-gray-100 hover:bg-opacity-10">
        {data.title}
      </Link>
    </div>
  )
}
export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ data }) => {
  const [expanded, setExpanded] = React.useState(false)

  const isActive = document.location.pathname.includes(data?.href || '')

  useEffect(() => {
    setExpanded(isActive)
  }, [isActive])

  const expandedMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    setExpanded(!expanded)
  }

  return (
    <>
      {data.canNavigate ? (
        <Link
          to={data.href || '/'}
          activeProps={{
            className: '!text-gray-100 bg-gray-300/10 shadow-box',
          }}
          inactiveProps={{ className: 'text-gray-500' }}
          activeOptions={{ exact: true }}
          className={cn(
            'group cursor-pointer flex gap-3 justify-between items-stretch p-3 mt-5 rounded-xl transition-all duration-150 hover:shadow-sm hover:bg-gray-300 hover:bg-opacity-10'
          )}>
          <div className="flex gap-3 justify-between items-stretch">
            {data.icon}
            <div
              className={cn(
                'grow text-base font-semibold tracking-normal leading-6 group-hover:text-gray-100'
              )}>
              {data.title}
            </div>
          </div>
          {data?.children?.length > 0 ? (
            expanded ? (
              <ArrowUpIcon className="object-contain object-center shrink-0 w-6 aspect-square" />
            ) : (
              <ArrowRightIcon className="object-contain object-center shrink-0 w-6 aspect-square" />
            )
          ) : null}
        </Link>
      ) : (
        <div
          onClick={expandedMenu}
          className={cn(
            'group cursor-pointer flex justify-between items-stretch p-3 mt-5 rounded-xl transition-all duration-150 hover:shadow-sm hover:bg-gray-300 hover:bg-opacity-10',
            isActive ? 'shadow-box bg-gray-300 bg-opacity-10 text-gray-100' : ''
          )}>
          <div className="flex gap-3 justify-between items-stretch">
            {data.icon}
            <div
              className={cn(
                'grow text-[15px] tracking-[-0.15px] lett font-semibold leading-6 text-gray-500 group-hover:text-gray-100',
                isActive ? 'text-gray-100' : ''
              )}>
              {data.title}
            </div>
          </div>
          {data?.children?.length > 0 ? (
            expanded ? (
              <ArrowUpIcon className="object-contain object-center shrink-0 w-6 aspect-square" />
            ) : (
              <ArrowRightIcon className="object-contain object-center shrink-0 w-6 aspect-square" />
            )
          ) : null}
        </div>
      )}
      {expanded && data?.children?.length > 0 ? (
        <div className="mt-2">
          {data?.children?.map((child: ISidebarMenu, index: number) => (
            <SidebarMenuChildItem data={child} key={index} />
          ))}
        </div>
      ) : null}
    </>
  )
}
