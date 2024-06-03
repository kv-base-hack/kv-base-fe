import { OpenAIStream } from 'ai'
import type { OpenAI } from 'openai'
import { ChatCompletionStream } from 'openai/lib/ChatCompletionStream'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { customAlphabet } from 'nanoid'

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7,
) // 7-character random string

const consumeStream = async (stream: ReadableStream) => {
  const reader = stream.getReader()
  while (true) {
    const { done } = await reader.read()
    if (done) break
  }
}

export function runAICompletion(content: string) {
  let text = ''
  const abortController = new AbortController()

  let onTextContent: (text: string, isFinal: boolean) => void = () => {}

  ;(async () => {
    const res = await fetch(`${process.env.BOLAI_API!}/ask`, {
      method: 'POST',
      body: JSON.stringify({
        prompt: content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      signal: abortController.signal,
    })

    if (!res.ok || !res.body) {
      throw res.statusText
    }

    const reader = res.body.getReader()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const decoder = new TextDecoder()
      const decodedValue = decoder.decode(value)

      text += decodedValue
      if (text.startsWith('{')) return
      onTextContent(text, false)
    }
  })()

  return {
    onTextContent: (
      callback: (text: string, isFinal: boolean) => void | Promise<void>,
    ) => {
      onTextContent = callback
    },
  }
}

interface FunctionCallData {
  content: string
  data: any
}

export function runBolAICompletion(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
) {
  let text = ''
  let hasFunction = false

  let onTextContent: (text: string, isFinal: boolean) => void = () => {}

  let onFunctionCall = {} as any

  ;(async () => {
    consumeStream(
      OpenAIStream(
        (await fetch(`${process.env.BOLAI_API!}/ai`, {
          method: 'POST',
          body: JSON.stringify({
            messages,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          const runner = ChatCompletionStream.fromReadableStream(res.body!)
          return runner
        })) as any,
        {
          async experimental_onFunctionCall(functionCallPayload) {
            hasFunction = true

            if (!onFunctionCall[functionCallPayload.name]) {
              return
            }
            onFunctionCall[functionCallPayload.name]?.(functionCallPayload)
          },
          onToken(token) {
            text += token
            if (text.startsWith('{')) return
            onTextContent(text, false)
          },
          onFinal() {
            if (hasFunction) return
            onTextContent(text, true)
          },
        },
      ),
    )
  })()

  return {
    onTextContent: (
      callback: (text: string, isFinal: boolean) => void | Promise<void>,
    ) => {
      onTextContent = callback
    },
    onFunctionCall: (
      name: string,
      callback: (data: FunctionCallData) => void | Promise<void>,
    ) => {
      onFunctionCall[name] = callback
    },
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)

export const runAsyncFnWithoutBlocking = (
  fn: (...args: any) => Promise<any>,
) => {
  fn()
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

// Fake data
export function getStockPrice(name: string) {
  let total = 0
  for (let i = 0; i < name.length; i++) {
    total = (total + name.charCodeAt(i) * 9999121) % 9999
  }
  return total / 100
}
