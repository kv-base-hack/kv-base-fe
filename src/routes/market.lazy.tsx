import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/market')({
  component: () => <div>Hello /market!</div>
})