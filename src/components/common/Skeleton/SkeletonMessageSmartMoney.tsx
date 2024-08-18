import SkeletonCell from './SkeletonCell'

export const SkeletonMessageSmartMoney = (props: any) => {
  return (
    <div className="mb-10 mt-4 w-full rounded-2xl border bg-neutral-01 px-8 py-4 shadow-chat-ai backdrop-blur-[32px]">
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
