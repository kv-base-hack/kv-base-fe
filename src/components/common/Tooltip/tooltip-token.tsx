import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { TooltipContent } from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'
import { CardInfoTopToken } from '../Card/CardInfoTopToken'
import { cn } from '@/lib/utils'

export const TooltipToken = ({
  children,
  data,
  className,
  side = 'top',
}: {
  children: ReactNode
  data: any
  className?: string
  side?: 'top' | 'bottom' | 'left' | 'right'
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className={cn('min-w-[220px]', className)} side={side}>
          <CardInfoTopToken view="token" token={data} type="buy" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
