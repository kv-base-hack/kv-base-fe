'use client'

import { IconAI } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { MemoizedReactMarkdown } from './Markdown'
import { useStreamableText } from '@/lib/hooks/use-streamable-text'
import { StreamableValue } from 'ai/rsc'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { LogoChat } from '../shared/icons/LogoChat'
import Image from 'next/image'

// Different types of message bubbles.

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <Image
        src={'/images/user-avatar.png'}
        alt="user"
        width={32}
        height={32}
        className="rounded-full bg-[#BBCEC5]"
      />
      <div className="flex-start flex text-xs font-normal text-neutral-07 xl:text-base">
        {children}
      </div>
    </div>
  )
}

export function BotMessage({
  content,
  className,
  isLogo = true,
}: {
  content: string | StreamableValue<string>
  className?: string
  isLogo?: boolean
}) {
  const text = useStreamableText(content)
  return (
    <div className="my-8 flex items-start gap-4">
      {isLogo && <LogoChat className="h-8 w-8 shrink-0" />}
      <div
        className={cn(
          'group relative flex flex-col items-start justify-start rounded-[20px] bg-neutral-01 text-xs text-neutral-07 xl:text-base',
          className,
        )}
      >
        <MemoizedReactMarkdown
          className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words"
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
          'bg-primary text-primary-foreground flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm',
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
