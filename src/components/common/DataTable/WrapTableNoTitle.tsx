import ArrowDownIcon from '@/components/shared/icons/ArrowDownIcon'

type WrapTableNoTitleProps = {
  children: React.ReactNode
}

export const WrapTableNoTitle: React.FC<WrapTableNoTitleProps> = ({
  children,
}) => {
  return (
    <div className="flex flex-col justify-center self-stretch rounded-lg border border-solid p-6 font-semibold leading-[160%] shadow-2xl max-md:px-5">
      <div className="flex justify-between gap-0 self-stretch whitespace-nowrap text-base leading-6 tracking-normal max-md:flex-wrap">
        <div className="flex justify-between gap-2 pr-20 font-semibold max-md:max-w-full max-md:flex-wrap">
          <div className="grow justify-center rounded-lg bg-neutral-06 px-4 py-2 text-gray-300">
            Smart Money Ranking
          </div>
          <div className="grow justify-center rounded-lg bg-neutral-07 px-4 py-2 text-gray-500">
            Insider Trade Ranking
          </div>
        </div>
        <div className="flex justify-between gap-4 rounded-lg px-3 text-gray-500">
          <div className="flex items-center justify-between gap-2 rounded-xl border-2 border-solid border-white/10 px-4 py-2">
            <div className="grow">Filter by Token</div>
            <ArrowDownIcon />
          </div>
          <div className="flex items-center justify-between gap-2 rounded-xl border-2 border-solid border-white/10 px-4 py-2">
            <div className="grow">Filter by Badge</div>
            <ArrowDownIcon />
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
