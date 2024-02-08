import { cn } from '@/lib/utils'

type WrapTableProps = {
  title: string
  children: React.ReactNode
  childHeader?: React.ReactNode
  className?: string
}

export const WrapTable: React.FC<WrapTableProps> = ({
  title,
  children,
  childHeader,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col justify-center self-stretch p-6 font-semibold rounded-lg border border-solid shadow-2xl backdrop-blur-lg bg-neutral-07/50 bg-opacity-50 border-white/10 leading-[160%] max-md:px-5',
        className
      )}>
      <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-4 my-auto text-xl tracking-tight text-zinc-100">
          <div className="w-4 h-8 bg-yellow-200 rounded" />
          <div className="grow">{title}</div>
        </div>
        {childHeader}
      </div>
      {children}
    </div>
  )
}
