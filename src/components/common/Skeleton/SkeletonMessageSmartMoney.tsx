import SkeletonCell from './SkeletonCell'

export const SkeletonMessageSmartMoney = (props: any) => {
  return (
    <div className="bg-neutral-01 border px-8 py-4 backdrop-blur-[32px] shadow-chat-ai rounded-2xl mb-10 w-full mt-4">
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
