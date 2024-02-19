import { TooltipCustom } from '@/components/common/Tooltip'
import Info from '@/components/shared/icons/Info'
import { cn } from '@/lib/utils'

type WrapTableProps = {
  title: string
  children: React.ReactNode
  childHeader?: React.ReactNode
  className?: string
  colorHeader?: string
  info?: string
}

export const WrapTable: React.FC<WrapTableProps> = ({
  title,
  children,
  childHeader,
  className,
  colorHeader = 'bg-yellow-200',
  info,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col justify-center self-stretch p-6 font-semibold rounded-lg border border-solid shadow-2xl backdrop-blur-lg bg-neutral-07/50 bg-opacity-50 border-white/10 leading-[160%] max-md:px-5',
        className
      )}>
      <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-4 my-auto text-xl tracking-tight text-neutral-02">
          <div className={cn('w-4 h-8 rounded', colorHeader)} />
          <div className="flex items-center gap-2">
            <div className="grow">{title}</div>
            {info ? (
              <TooltipCustom
                className="w-[320px] z-999 bg-neutral-06 text-neutral-02 shadow-sm border-white/10"
                content={info}>
                <Info />
              </TooltipCustom>
            ) : null}
          </div>
        </div>
        {childHeader}
      </div>
      {children}
    </div>
  )
}
