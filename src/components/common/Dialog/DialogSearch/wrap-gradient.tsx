import { cn } from '@/lib/utils'

export const WrapGradient = ({
  children,
  props,
  onClick,
  className,
}: {
  children: React.ReactNode
  props?: any
  onClick?: () => void
  className?: string
}) => {
  return (
    <div
      role="button"
      className={cn(
        'group relative bg-white/10 transition-all duration-150 p-px border border-white/10 hover:border-transparent',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-xl hover:bg-white/5 group-hover:-z-[1] group-hover:bg-gradient-to-r group-hover:from-[#9945FF] group-hover:to-[#14F195]"></div>
      <div className=" group-hover:bg-neutral-06 rounded-xl">{children}</div>
    </div>
  )
}
