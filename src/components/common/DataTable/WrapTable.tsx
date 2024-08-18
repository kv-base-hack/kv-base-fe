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
  moreInfo?: React.ReactNode
}

export const WrapTable: React.FC<WrapTableProps> = ({
  title,
  children,
  childHeader,
  colorHeader,
  className,
  info,
  moreInfo,
  icon,
}) => {
  return (
    <div
      className={cn(
        'flex h-full flex-col justify-start self-stretch rounded-2xl border border-solid border-white/10 bg-black bg-opacity-50 p-4 font-semibold leading-[160%] shadow-2xl backdrop-blur-lg max-md:px-5',
        className,
      )}
    >
      <div className="flex w-full flex-wrap justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
        <div className="my-auto flex items-center gap-4 text-xl tracking-tight text-neutral-02">
          {icon ? (
            icon
          ) : colorHeader ? (
            <div className={cn('h-4 w-2 rounded lg:h-8 lg:w-4', colorHeader)} />
          ) : null}
          <div className="flex items-center gap-2">
            {title ? (
              <div className="grow text-[15px] font-medium md:text-lg">
                {title}
              </div>
            ) : null}
            {info ? (
              <TooltipCustom
                className="z-[999] w-[210px] border-white/10 bg-neutral-06 font-inter text-neutral-02 shadow-sm"
                content={info}
              >
                <InfoIcon className="h-4 w-4 md:w-5 lg:w-5" />
              </TooltipCustom>
            ) : null}
            {moreInfo}
          </div>
        </div>
        {childHeader}
      </div>
      {children}
    </div>
  )
}
