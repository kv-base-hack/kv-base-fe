import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/subcriptions')({
  component: () => <div>Hello /subcriptions!</div>
})