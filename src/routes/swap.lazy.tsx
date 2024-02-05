import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/swap')({
  component: () => <div>Hello /swap!</div>
})