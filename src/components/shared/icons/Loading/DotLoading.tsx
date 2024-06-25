export const DotLoading = () => {
  return (
    <div className="flex space-x-1 justify-center items-center p-6">
      <span className="sr-only">Loading...</span>
      <div className="h-1.5 w-1.5 bg-neutral-07 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-1.5 w-1.5 bg-neutral-07 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-1.5 w-1.5 bg-neutral-07 rounded-full animate-bounce"></div>
    </div>
  )
}
