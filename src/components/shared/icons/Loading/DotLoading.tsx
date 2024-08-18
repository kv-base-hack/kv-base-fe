export const DotLoading = () => {
  return (
    <div className="flex items-center justify-center space-x-1 p-6">
      <span className="sr-only">Loading...</span>
      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-07 [animation-delay:-0.3s]"></div>
      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-07 [animation-delay:-0.15s]"></div>
      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-07"></div>
    </div>
  )
}
