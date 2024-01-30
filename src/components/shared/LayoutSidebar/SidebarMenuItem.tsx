import ArrowRightIcon from '@/components/shared/icons/sidebar/ArrowRightIcon'
import ArrowUpIcon from '@/components/shared/icons/sidebar/ArrowUpIcon'
import { ISidebarMenu } from '@/constant'
import { Link, useNavigate } from '@tanstack/react-router'
import React from 'react'

type SidebarMenuItemProps = {
  data: ISidebarMenu
}

const SidebarMenuChildItem: React.FC<SidebarMenuItemProps> = ({ data }) => {
  return (
    <Link
      to={data.href || '/'}
      className="cursor-pointer flex justify-between items-stretch rounded-xl">
      {data.icon}
      <div className="flex-auto h-full p-3 text-base font-semibold tracking-normal leading-6 text-gray-500 hover:shadow-sm hover:rounded-xl hover:bg-gray-300 hover:text-gray-100 hover:bg-opacity-10">
        {data.title}
      </div>
    </Link>
  )
}
export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ data }) => {
  const [expanded, setExpanded] = React.useState(false)
  const navigate = useNavigate()

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
        className="group cursor-pointer flex gap-3 justify-between items-stretch p-3 mt-5 rounded-xl hover:shadow-sm hover:bg-gray-300 hover:bg-opacity-10">
        <div className="flex gap-3 justify-between items-stretch">
          {data.icon}
          <div className="grow text-base font-semibold tracking-normal leading-6 text-gray-500 group-hover:text-gray-100">
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
