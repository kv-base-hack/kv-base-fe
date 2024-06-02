'use client'

import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { useActions, useUIState } from 'ai/rsc'
import { useEffect, useRef, useState } from 'react'
import { AI } from './action'
import { ChatList } from '@/components/chat-list'
import { EmptyScreen } from '@/components/empty-screen'
import { UserMessage } from '@/components/common/message'
import { ChatScrollAnchor } from '@/lib/hooks/chat-scroll-anchor'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Textarea } from '@/components/ui/textarea'
import { FooterText } from '@/components/footer'
import { IconSend } from '@/components/shared/icons/IconSend'
import { ListToken } from '@/components/common/ListToken'
import { ChatHistory } from '@/components/common/ChatHistory'
import { useAtom } from 'jotai'
import { heightHeaderAtom } from '@/atom/header'

export default function Home() {
  const [messages, setMessages] = useUIState<typeof AI>()
  const [heightHeader] = useAtom(heightHeaderAtom)
  const { submitUserMessage } = useActions()
  const [inputValue, setInputValue] = useState('')
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [chatHeight, setChatHeight] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        if (
          e.target &&
          ['INPUT', 'TEXTAREA'].includes((e.target as any).nodeName)
        ) {
          return
        }
        e.preventDefault()
        e.stopPropagation()
        if (inputRef?.current) {
          inputRef.current.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [inputRef])

  useEffect(() => {
    const updateSize = () => {
      if (inputRef.current) {
        setChatHeight(
          window.innerHeight -
            heightHeader -
            inputRef.current.clientHeight -
            160,
        )
      }
    }

    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [heightHeader])

  return (
    <div className="p-4 xl:p-10 flex tems-stretch gap-5">
      <div>
        <ChatHistory messages={messages} setMessages={setMessages} />
      </div>
      <div className="w-full">
        <div className="flex flex-col">
          {messages.length ? (
            <div
              style={{ height: `${chatHeight}px` }}
              className="w-full p-4 md:p-8 bg-gradient-linear-1 rounded-t-xl backdrop-blur shadow-chat-ai overflow-x-auto"
            >
              <ChatList messages={messages} />
            </div>
          ) : (
            <div style={{ height: `${chatHeight}px` }}>
              <EmptyScreen
                submitMessage={async (message) => {
                  // Add user message UI
                  setMessages((currentMessages: any[]) => [
                    ...currentMessages,
                    {
                      id: Date.now(),
                      display: <UserMessage>{message}</UserMessage>,
                      history: message,
                    },
                  ])

                  // Submit and get response message
                  const responseMessage = await submitUserMessage(message)
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    responseMessage,
                  ])
                }}
              />
            </div>
          )}
          <ChatScrollAnchor trackVisibility={true} />
        </div>

        <div className="mx-auto mt-4">
          <div>
            <form
              ref={formRef}
              onSubmit={async (e: any) => {
                e.preventDefault()

                // Blur focus on mobile
                if (window.innerWidth < 600) {
                  e.target['message']?.blur()
                }

                const value = inputValue.trim()
                setInputValue('')
                if (!value) return

                // Add user message UI
                setMessages((currentMessages: any[]) => [
                  ...currentMessages,
                  {
                    id: Date.now(),
                    display: <UserMessage>{value}</UserMessage>,
                  },
                ])

                try {
                  // Submit and get response message
                  const responseMessage = await submitUserMessage(value)
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    responseMessage,
                  ])
                } catch (error) {
                  // You may want to show a toast or trigger an error state.
                  console.error(error)
                }
              }}
            >
              <div>
                <div className="relative">
                  <Textarea
                    ref={inputRef}
                    tabIndex={0}
                    onKeyDown={onKeyDown}
                    placeholder="Message BOL AI..."
                    className="w-full min-h-[56px] p-4 resize-none focus-within:outline-none text-base placeholder:text-base bg-[#D6D9DC0D]/5 backdrop-blur rounded-xl border border-white/10 placeholder:text-[#6F767E]/80"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    name="message"
                    rows={1}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <div className="absolute right-4 top-[18px] sm:right-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="submit" disabled={inputValue === ''}>
                          <IconSend />
                          <span className="sr-only">Send message</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Send message</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </form>
            <FooterText className="hidden sm:block" />
          </div>
        </div>
      </div>
      <div>
        <ListToken />
      </div>
    </div>
  )
}
