import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/trading-terminal')({
  component: () => <div>Hello /trading-terminal!</div>
})