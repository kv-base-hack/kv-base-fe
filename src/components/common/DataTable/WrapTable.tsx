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
        'flex flex-col justify-center self-stretch rounded-lg border border-solid bg-neutral-01 p-6 font-semibold leading-[160%] shadow-2xl max-md:px-5',
        className,
      )}
    >
      <div className="flex w-full justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
        <div className="my-auto flex items-center gap-4 text-xl tracking-tight text-neutral-07">
          {icon ? (
            icon
          ) : colorHeader ? (
            <div className={cn('h-8 w-4 rounded', colorHeader)} />
          ) : null}
          <div className="flex items-center gap-2">
            <div className="grow">{title}</div>
            {info ? (
              <TooltipCustom
                className="z-999 w-[320px] border-white/10 bg-neutral-06 text-neutral-02 shadow-sm"
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
