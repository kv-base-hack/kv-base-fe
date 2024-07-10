'use client'

import { MessageHistory } from './message-history'
import { useAtom } from 'jotai'
import { messageAtom } from '@/atom/message'

export const ChatHistory = ({
  setCurrentMessage,
  setMessages,
  currentMessage,
  onCreateNewChat,
}: {
  setCurrentMessage: (v: number) => void
  setMessages: any
  currentMessage: number | undefined
  onCreateNewChat: () => void
}) => {
  const [messagesHistory] = useAtom<any[]>(messageAtom)

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
