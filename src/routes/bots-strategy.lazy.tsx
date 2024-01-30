import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/bots-strategy')({
  component: () => <div>Hello /bots-strategy!</div>
})