import ArrowRightIcon from '@/components/shared/icons/sidebar/ArrowRightIcon'
import ArrowUpIcon from '@/components/shared/icons/sidebar/ArrowUpIcon'
import { ISidebarMenu } from '@/constant'
import { cn } from '@/lib/utils'
import { Link, useNavigate } from '@tanstack/react-router'
import React from 'react'

type SidebarMenuItemProps = {
  data: ISidebarMenu
}

const SidebarMenuChildItem: React.FC<SidebarMenuItemProps> = ({ data }) => {
  const isActive = document.location.pathname === data.href
  return (
    <Link
      to={data.href || '/'}
      className="cursor-pointer flex justify-between items-stretch rounded-xl">
      {data.icon}
      <div
        className={cn(
          'flex-auto h-full p-3 text-base font-semibold tracking-normal leading-6 transition-all duration-150 text-gray-500 rounded-xl hover:shadow-sm hover:rounded-xl hover:bg-gray-300 hover:text-gray-100 hover:bg-opacity-10',
          isActive ? 'text-gray-100 bg-gray-300 bg-opacity-10 shadow-sm' : ''
        )}>
        {data.title}
      </div>
    </Link>
  )
}
export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ data }) => {
  const [expanded, setExpanded] = React.useState(false)
  const navigate = useNavigate()
  const isActive = document.location.pathname === data.href

  const navigateRoute = (href: string | null) => (e: React.MouseEvent) => {
    e.stopPropagation()
    setExpanded(!expanded)
    if (href) {
      navigate({ to: href })
    }
  }

  return (
    <>
      <div
        onClick={navigateRoute(data.href)}
        className={cn(
          'group cursor-pointer flex gap-3 justify-between items-stretch p-3 mt-5 rounded-xl transition-all duration-150 hover:shadow-sm hover:bg-gray-300 hover:bg-opacity-10',
          isActive ? 'shadow-sm bg-gray-300 bg-opacity-10 text-gray-100' : ''
        )}>
        <div className="flex gap-3 justify-between items-stretch">
          {data.icon}
          <div
            className={cn(
              'grow text-base font-semibold tracking-normal leading-6 text-gray-500 group-hover:text-gray-100',
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
      {expanded
        ? data?.children?.map((child: ISidebarMenu, index: number) => (
            <SidebarMenuChildItem data={child} key={index} />
          ))
        : null}
    </>
  )
}
