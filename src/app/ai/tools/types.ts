import { CoreMessage } from 'ai'
import { ReactNode } from 'react'
import { z } from 'zod'

type Streamable = ReactNode | Promise<ReactNode>
type Renderer<T extends Array<any>> = (
  ...args: T
) =>
  | Streamable
  | Generator<Streamable, Streamable, void>
  | AsyncGenerator<Streamable, Streamable, void>

export type RenderTool<PARAMETERS extends z.ZodTypeAny = any> = {
  description?: string
  parameters: PARAMETERS
  generate?: Renderer<
    [
      z.infer<PARAMETERS>,
      {
        toolName: string
        toolCallId: string
      },
    ]
  >
}

type ValueOrUpdater<T> = T | ((current: T) => T)
export type MutableAIState<AIState> = {
  get: () => AIState
  update: (newState: ValueOrUpdater<AIState>) => void
  done: ((newState: AIState) => void) | (() => void)
}

export type Message = CoreMessage & {
  id: string
}

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export type CreateToolFunction = (
  aiState: MutableAIState<AIState>,
) => RenderTool
