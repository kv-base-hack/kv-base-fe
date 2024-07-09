'use client'

import { MessageHistory } from './message-history'
import { useAtom } from 'jotai'
import { messageAtom } from '@/atom/message'
import { useState } from 'react'
import SearchIcon from '@/components/shared/icons/SearchIcon'

export const ChatHistory = ({
  messages,
  setMessages,
}: {
  messages: any[]
  setMessages: any
}) => {
  const [messagesHistory, setMessagesHistory] = useAtom<any[]>(messageAtom)
  const [currentMessage, setCurrentMessage] = useState<number>()

  const totalMessages = messagesHistory.length || 0

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
    if (totalMessages === 20) {
      setMessagesHistory(messagesHistory.shift())
    }
    handleCreateNewChat()
    setCurrentMessage(undefined)
  }

  return (
    <div className="h-full flex flex-col min-w-[300px] max-w-[340px] py-4 gap-3 border border-white/10 bg-neutral-01 rounded-2xl justify-between">
      <div className="border-b border-[#EFEFEF] px-4 pb-4 text-neutral-07 font-semibold text-[15px] leading-6">
        Chat History
      </div>

      <div className="flex flex-col items-start gap-2 px-4 h-full">
        {messagesHistory.map((msg, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setCurrentMessage(index)
                setMessages(msg)
              }}
              role="button"
            >
              <MessageHistory msg={msg} isActive={currentMessage === index} />
            </div>
          )
        })}
      </div>

      <div className="px-4">
        <button
          onClick={onCreateNewChat}
          className="bg-neutral-07 rounded-full w-full px-6 py-2"
        >
          New chat
        </button>
      </div>
    </div>
  )
}
