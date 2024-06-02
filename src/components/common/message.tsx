'use client'

import { IconAI } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { MemoizedReactMarkdown } from './Markdown'
import { useStreamableText } from '@/lib/hooks/use-streamable-text'
import { StreamableValue } from 'ai/rsc'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

// Different types of message bubbles.

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-start p-6 text-xs xl:text-base font-normal text-neutral-01 rounded-[20px] bg-[#D6D9DC]/5">
      {children}
    </div>
  )
}

export function BotMessage({
  content,
  className,
}: {
  content: string | StreamableValue<string>
  className?: string
}) {
  const text = useStreamableText(content)
  return (
    <div
      className={cn(
        'group relative flex flex-col items-start justify-start text-xs xl:text-base p-6 bg-[#1a1d1f] rounded-[20px]',
        className,
      )}
    >
      <MemoizedReactMarkdown
        className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
          p({ children }) {
            // @ts-ignore
            return <p className="mb-2 last:mb-0">{children}</p>
          },
        }}
      >
        {text}
      </MemoizedReactMarkdown>
    </div>
  )
}

export function BotCard({
  children,
  showAvatar = true,
}: {
  children: React.ReactNode
  showAvatar?: boolean
}) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-primary text-primary-foreground',
          !showAvatar && 'invisible',
        )}
      >
        <IconAI />
      </div>
      <div className="ml-4 flex-1 px-1">{children}</div>
    </div>
  )
}

export function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        'mt-2 flex items-center justify-center gap-2 text-xs text-gray-500'
      }
    >
      <div className={'max-w-[600px] flex-initial px-2 py-2'}>{children}</div>
    </div>
  )
}
