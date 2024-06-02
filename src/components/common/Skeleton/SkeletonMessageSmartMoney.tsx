import SkeletonCell from './SkeletonCell'

export const SkeletonMessageSmartMoney = (props: any) => {
  return (
    <div className="bg-[#1A1D1F]/50 border border-white/10 px-8 py-4 backdrop-blur-[32px] shadow-chat-ai rounded-2xl mb-10 w-full">
      <div className="flex flex-col gap-4">
        <RowSkeleton />
        <RowSkeleton />
        <RowSkeleton />
        <RowSkeleton />
        <RowSkeleton />
        <RowSkeleton />
      </div>
    </div>
  )
}

const RowSkeleton = () => {
  return (
    <div className="grid grid-cols-5">
      <SkeletonCell />
      <SkeletonCell />
      <SkeletonCell />
      <SkeletonCell />
      <SkeletonCell />
    </div>
  )
}
