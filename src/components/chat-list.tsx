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
    <div className="relative p-4 flex flex-col gap-2.5 md:gap-10">
      {messages.map((message, index) => (
        <div key={index} ref={refDiv}>
          {message.display}
        </div>
      ))}
    </div>
  )
}
