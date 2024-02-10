import ArrowRightIcon from '@/components/shared/icons/ArrowRight'
import FireIcon from '@/components/shared/icons/FireIcon'

type WrapTableTabProps = {
  children: React.ReactNode
}

export const WrapTableTab: React.FC<WrapTableTabProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center p-6 font-semibold rounded-lg border border-solid shadow-2xl backdrop-blur-lg bg-neutral-07/50 bg-opacity-50 border-white/10 leading-[160%] max-md:px-5">
      <div className="w-full relative flex justify-center pr-9 text-base font-semibold tracking-normal leading-6 text-gray-300 max-md:pr-5">
        <div className="flex flex-1 overflow-x-auto whitespace-nowrap w-[300px] gap-3 items-center">
          <div className="flex items-center gap-1.5 justify-between px-2 py-1 whitespace-nowrap bg-gray-300 bg-opacity-10 rounded-[80px]">
            <FireIcon />
            <div className="grow">Trending Token</div>
          </div>
          <div className="flex items-center gap-1.5 justify-between px-2 py-1 whitespace-nowrap rounded-[80px]">
            <FireIcon />
            <div className="grow">Top 100 Cap</div>
          </div>
          <div className="flex items-center gap-1.5 justify-between px-2 py-1 whitespace-nowrap rounded-[80px]">
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
        <div className="cursor-pointer absolute my-auto right-0 top-0.5 rounded-full border border-white/10">
          <div className="w-6 h-6 flex items-center justify-center">
            <ArrowRightIcon />
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
