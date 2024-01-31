import { Heading3 } from '@/components/shared/common/Typography'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/education')({
  component: Education,
})

function Education() {
  return (
    <div className="w-full h-full">
      <Heading3>Education</Heading3>
    </div>
  )
}
