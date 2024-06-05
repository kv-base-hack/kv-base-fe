import ArrowDownIcon from '@/components/shared/icons/ArrowDownIcon'

type WrapTableNoTitleProps = {
  children: React.ReactNode
}

export const WrapTableNoTitle: React.FC<WrapTableNoTitleProps> = ({
  children,
}) => {
  return (
    <div className="flex flex-col justify-center self-stretch p-6 font-semibold rounded-lg border border-solid shadow-2xl leading-[160%] max-md:px-5">
      <div className="flex gap-0 justify-between self-stretch text-base tracking-normal leading-6 whitespace-nowrap max-md:flex-wrap">
        <div className="flex gap-2 justify-between pr-20 font-semibold max-md:flex-wrap max-md:max-w-full">
          <div className="grow justify-center px-4 py-2 text-gray-300 rounded-lg bg-neutral-06">
            Smart Money Ranking
          </div>
          <div className="grow justify-center px-4 py-2 text-gray-500 rounded-lg bg-neutral-07">
            Insider Trade Ranking
          </div>
        </div>
        <div className="flex gap-4 justify-between px-3 text-gray-500 rounded-lg">
          <div className="flex items-center gap-2 justify-between px-4 py-2 rounded-xl border-2 border-solid border-white/10">
            <div className="grow">Filter by Token</div>
            <ArrowDownIcon />
          </div>
          <div className="flex items-center gap-2 justify-between px-4 py-2 rounded-xl border-2 border-solid border-white/10">
            <div className="grow">Filter by Badge</div>
            <ArrowDownIcon />
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
