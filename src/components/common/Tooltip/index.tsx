import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

type TooltipCustomProps = {
  children: React.ReactNode
  content: string
  className?: string
  side?: any
}
export const TooltipCustom: React.FC<TooltipCustomProps> = ({
  children,
  content,
  className,
  side,
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Button className="!p-0 !m-0">{children}</Button>
        </TooltipTrigger>
        <TooltipContent
          datatype="bottom"
          side={side}
          className={cn(
            className,
            'shadow-box bg-neutral-01 text-neutral-07 max-w-[240px]',
          )}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
