import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/academy/courses')({
  component: Courses,
})

function Courses() {
  return (
    <div className="w-full h-full">
      <div className="p-10">Course</div>
    </div>
  )
}
