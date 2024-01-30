import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/my-portfolio')({
  component: () => <div>Hello /my-portfolio!</div>
})