import { GroupHeader } from '@/components/common/GroupHeader'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/kaichat-ai-assistant')({
  component: KaichatAIAssistant,
})

function KaichatAIAssistant() {
  return (
    <div className="w-full h-full pt-2">
      <GroupHeader className="mt-4 mx-10" title="Kaichat AI Assistant"></GroupHeader>
    </div>
  )
}
