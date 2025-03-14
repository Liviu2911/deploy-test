import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$deckId/study/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$deckId/study/"!</div>
}
