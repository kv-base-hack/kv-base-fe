import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

type TooltipCustomProps = {
  children: React.ReactNode
  content: string
  className?: string
}
export const TooltipCustom: React.FC<TooltipCustomProps> = ({ children, content, className }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="!p-0 !m-0">{children}</Button>
        </TooltipTrigger>
        <TooltipContent datatype="bottom" className={cn(className, 'shadow-box')}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
