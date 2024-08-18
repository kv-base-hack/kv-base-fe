export const SkeletonText = () => {
  return (
    <div className="flex h-[120px] w-[500px] flex-col gap-4">
      <div className="line-1 h-3 rounded-lg">
        <div className="background-gradient h-3 rounded-lg"></div>
      </div>
      <div className="line-2 h-3">
        <div className="background-gradient h-3"></div>
      </div>
      <div className="line-3 h-3">
        <div className="background-gradient h-3"></div>
      </div>
    </div>
  )
}
