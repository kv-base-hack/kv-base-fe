export const SkeletonText = () => {
  return (
    <div className="w-[500px] h-[120px] flex flex-col gap-4">
      <div className="h-3 line-1 rounded-lg">
        <div className="h-3 background-gradient rounded-lg"></div>
      </div>
      <div className="h-3 line-2">
        <div className="h-3 background-gradient"></div>
      </div>
      <div className="h-3 line-3">
        <div className="h-3 background-gradient"></div>
      </div>
    </div>
  )
}
