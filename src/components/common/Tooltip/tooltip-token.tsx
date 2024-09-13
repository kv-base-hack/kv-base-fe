import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { TooltipContent } from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { CardInfoTopToken } from '../Card/CardInfoTopToken'

export const TooltipToken = ({
  children,
  data,
  className,
  side = 'top',
  type = 'buy',
}: {
  children: ReactNode
  data: any
  className?: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  type?: 'buy' | 'hold'
}) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          className={cn('min-w-[240px] !border-none !p-0 z-[9999999]', className)}
          side={side}
        >
          <CardInfoTopToken view="token" token={data} type={type} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
