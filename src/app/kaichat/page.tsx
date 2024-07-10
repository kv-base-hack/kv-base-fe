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
import { ChatHistory } from '@/components/common/ChatHistory'
import { useAtom } from 'jotai'
import { heightHeaderAtom } from '@/atom/header'
import { IconArrow } from '@/components/shared/icons/IconArrow'
import { LogoChat } from '@/components/shared/icons/LogoChat'
import { messageAtom } from '@/atom/message'
import { cn } from '@/lib/utils'

export default function Home() {
  const [messages, setMessages] = useUIState<typeof AI>()
  const [heightHeader] = useAtom(heightHeaderAtom)
  const { submitUserMessage } = useActions()
  const [inputValue, setInputValue] = useState('')
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [chatHeight, setChatHeight] = useState(0)
  const [messagesHistory, setMessagesHistory] = useAtom<any[]>(messageAtom)
  const [currentMessage, setCurrentMessage] = useState<number>()

  const updateMessageHistory = (index: number, newContent: any) => {
    const oldMessage = [...messagesHistory]

    if (oldMessage[index]) {
      oldMessage[index] = messages
    }

    setMessagesHistory(oldMessage)
  }

  const handleCreateNewChat = () => {
    if (typeof currentMessage !== 'undefined') {
      updateMessageHistory(currentMessage, messages)
    } else {
      const newMessages = [...messagesHistory, messages]
      setMessagesHistory(newMessages)
    }

    setCurrentMessage(undefined)
    setMessages([])
  }

  const onCreateNewChat = () => {
    if (messages.length === 0) return
    handleCreateNewChat()
    setCurrentMessage(undefined)
  }

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
    <div className="flex items-stretch gap-2">
      <div className="w-full">
        <div className="flex flex-col p-6 bg-neutral-01  rounded-2xl">
          {messages.length ? (
            <div
              style={{ height: `${chatHeight}px` }}
              className="overflow-auto scroll-smooth no-scrollbar"
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
        <div className="mx-auto mt-4 w-full">
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
              <div className="flex items-center gap-2">
                <div className="relative w-full">
                  <LogoChat className="absolute top-4 left-4 z-10" />
                  <Textarea
                    ref={inputRef}
                    tabIndex={0}
                    onKeyDown={onKeyDown}
                    placeholder="Ask Kaichat anything..."
                    className="w-full min-h-[48px] pl-12 pr-4 py-4 resize-none focus-within:outline-none text-neutral-07 text-base placeholder:text-base bg-[#F4F4F4] backdrop-blur rounded-[48px] border border-white/10 placeholder:text-[#6F767E]/80"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    name="message"
                    rows={1}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <div className="absolute right-0 top-2 sm:right-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="submit"
                          disabled={inputValue === ''}
                          className="bg-[#0C68E9] w-10 h-10 rounded-full flex items-center justify-center"
                        >
                          <IconArrow className="text-white" />
                          <span className="sr-only">Send message</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Send message</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <button
                  className={cn(
                    'text-neutral-07 whitespace-nowrap bg-neutral-01 p-4 rounded-[48px]',
                    messagesHistory.length === 0 ? 'visible' : 'hidden',
                  )}
                  onClick={onCreateNewChat}
                >
                  New Chat
                </button>
              </div>
            </form>
            <FooterText className="hidden sm:block" />
          </div>
        </div>
      </div>
      <div className={messagesHistory.length > 0 ? 'visible' : 'hidden'}>
        <ChatHistory
          onCreateNewChat={onCreateNewChat}
          setMessages={setMessages}
          setCurrentMessage={setCurrentMessage}
          currentMessage={currentMessage}
        />
      </div>
    </div>
  )
}
