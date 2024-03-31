import { SidebarMenuItem } from '@/components/common/LayoutSidebar/SidebarMenuItem'
import FeedbackIcon from '@/components/shared/icons/sidebar/FeedbackIcon'
import { ISidebarMenu, SIDEBAR_MENU } from '@/constant'

export const LayoutSidebar = () => {
  return (
    <div className="scrollbar-hide h-screen fixed overflow-y-auto flex flex-col justify-between items-start px-6 py-8 border-r border-solid shadow-2xl backdrop-blur-lg bg-neutral-07/50 bg-opacity-50 border-r-white/10 w-[300px] 2xl:w-[330px]">
      {/* header */}
      <div className="flex gap-4 justify-between items-stretch">
        <img
          loading="lazy"
          srcSet="/assets/images/logo.svg"
          className="object-contain object-center shrink-0 w-12 aspect-square"
        />
        <div className="flex-auto my-auto text-3xl font-bold tracking-tight leading-6 text-white">
          KAIVEST
        </div>
      </div>
      {/* content */}
      <div className="flex flex-col h-full items-stretch max-w-full">
        {SIDEBAR_MENU().map((item: ISidebarMenu, index) => (
          <SidebarMenuItem data={item} key={index} />
        ))}
      </div>
      {/* footer */}
      <div className="flex flex-col shrink-0 mt-36 h-0.5 rounded-sm bg-white bg-opacity-10" />
      <div className="flex gap-3 items-stretch self-start mt-7 ml-3">
        <FeedbackIcon className="object-contain object-center shrink-0 w-6 aspect-square" />
        <div className="text-base font-semibold tracking-normal leading-6 text-gray-500">
          Feedback
        </div>
      </div>
    </div>
  )
}
