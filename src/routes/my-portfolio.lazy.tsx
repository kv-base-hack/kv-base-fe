import { Heading3 } from '@/components/common/Typography'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/my-portfolio')({
  component: MyPortfolio,
})

function MyPortfolio() {
  return (
    <div className="w-full h-full">
      <Heading3>My Portfolio</Heading3>
    </div>
  )
}
