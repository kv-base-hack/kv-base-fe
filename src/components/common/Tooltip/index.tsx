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
}
export const TooltipCustom: React.FC<TooltipCustomProps> = ({
  children,
  content,
  className,
}) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className={cn(className, 'z-[100000] shadow-box')}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
