import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: OnchainSignals,
})

function OnchainSignals() {
  return (
    <div className="p-2 text-red-500">
      <h3>Welcome OnchainSignals!</h3>
    </div>
  )
}
