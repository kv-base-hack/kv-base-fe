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
        'flex flex-col gap-2 rounded-xl p-3 hover:bg-white/5 group text-neutral-07',
        isActive ? 'bg-white/5' : 'bg-transparent',
      )}
    >
      <p className="text-neutral-07 text-sm font-medium line-clamp-2 group-hover:underline">
        {msg[0]?.display?.props?.children}
      </p>
    </div>
  )
}
