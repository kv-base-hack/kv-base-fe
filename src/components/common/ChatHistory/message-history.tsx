import { cn } from '@/lib/utils'

export const MessageHistory = ({
  msg,
  isActive,
}: {
  msg: any[]
  isActive: boolean
}) => {
  return (
    <div
      className={cn(
        'group flex flex-col gap-2 rounded-xl p-3 text-neutral-07 hover:bg-white/5',
        isActive ? 'bg-white/5' : 'bg-transparent',
      )}
    >
      <p className="line-clamp-2 text-sm font-medium text-neutral-07 group-hover:underline">
        {msg[0]?.display?.props?.children}
      </p>
    </div>
  )
}
