import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/education')({
  component: () => <div>Hello /education!</div>
})