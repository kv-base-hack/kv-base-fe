import ArrowRightIcon from '@/components/shared/icons/ArrowRight'
import FireIcon from '@/components/shared/icons/FireIcon'

type WrapTableTabProps = {
  children: React.ReactNode
}

export const WrapTableTab: React.FC<WrapTableTabProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center rounded-lg border border-solid border-white/10 bg-neutral-07/50 bg-opacity-50 p-6 font-semibold leading-[160%] shadow-2xl backdrop-blur-lg max-md:px-5">
      <div className="relative flex w-full justify-center pr-9 text-base font-semibold leading-6 tracking-normal text-gray-300 max-md:pr-5">
        <div className="flex w-[300px] flex-1 items-center gap-3 overflow-x-auto whitespace-nowrap">
          <div className="flex items-center justify-between gap-1.5 whitespace-nowrap rounded-[80px] bg-gray-300 bg-opacity-10 px-2 py-1">
            <FireIcon />
            <div className="grow">Trending Token</div>
          </div>
          <div className="flex items-center justify-between gap-1.5 whitespace-nowrap rounded-[80px] px-2 py-1">
            <FireIcon />
            <div className="grow">Top 100 Cap</div>
          </div>
          <div className="flex items-center justify-between gap-1.5 whitespace-nowrap rounded-[80px] px-2 py-1">
            <FireIcon />
            <div className="grow">Layer 1 / Layer 2</div>
          </div>
          <div className="gap-2">GameFi</div>
          <div className="gap-2">Telegram Bot</div>
          <div className="gap-2">Telegram Bot</div>
          <div className="gap-2">Telegram Bot</div>
          <div className="gap-2">Telegram Bot</div>
          <div className="gap-2">Telegram Bot</div>
          <div className="gap-2">Telegram Bot</div>
        </div>
        <div className="absolute right-0 top-0.5 my-auto cursor-pointer rounded-full border border-white/10">
          <div className="flex h-6 w-6 items-center justify-center">
            <ArrowRightIcon />
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
