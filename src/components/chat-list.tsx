'use client'

import { useEffect, useRef } from 'react'

export function ChatList({ messages }: { messages: any[] }) {
  const refDiv = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (refDiv.current) {
      refDiv.current.lastElementChild?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [messages])

  if (!messages.length) {
    return null
  }

  return (
    <div className="relative p-4 flex flex-col">
      {messages.map((message, index) => (
        <div key={index} ref={refDiv} className="text-neutral-07">
          {message.display}
        </div>
      ))}
    </div>
  )
}
