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
    <div className="flex h-full min-w-[300px] max-w-[340px] flex-col justify-between gap-3 rounded-2xl border border-white/10 bg-neutral-01 py-4">
      <div className="border-b border-[#EFEFEF] px-4 pb-4 text-[15px] font-semibold leading-6 text-neutral-07">
        Chat History
      </div>

      <div className="flex h-full flex-col items-start gap-2 px-4">
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
          className="w-full rounded-full bg-neutral-07 px-6 py-2"
        >
          New chat
        </button>
      </div>
    </div>
  )
}
