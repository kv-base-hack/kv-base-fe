import { TooltipCustom } from '@/components/common/Tooltip'
import InfoIcon from '@/components/shared/icons/dashboard/InfoIcon'
import { cn } from '@/lib/utils'

type WrapTableProps = {
  title: React.ReactNode | string
  icon?: React.ReactNode
  children: React.ReactNode
  childHeader?: React.ReactNode
  colorHeader?: string
  className?: string
  info?: string
}

export const WrapTable: React.FC<WrapTableProps> = ({
  title,
  children,
  childHeader,
  colorHeader,
  className,
  info,
  icon,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col justify-center self-stretch p-6 font-semibold rounded-lg border border-solid shadow-2xl bg-neutral-01 leading-[160%] max-md:px-5',
        className,
      )}
    >
      <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
        <div className="flex items-center gap-4 my-auto text-xl tracking-tight text-neutral-07">
          {icon ? (
            icon
          ) : colorHeader ? (
            <div className={cn('w-4 h-8 rounded', colorHeader)} />
          ) : null}
          <div className="flex items-center gap-2">
            <div className="grow">{title}</div>
            {info ? (
              <TooltipCustom
                className="w-[320px] z-999 bg-neutral-06 text-neutral-02 shadow-sm border-white/10"
                content={info}
              >
                <InfoIcon />
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
