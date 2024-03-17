import { ButtonConnectWallet } from '@/components/common/ConnectWallet'
import { DATA_TOKEN } from '@/constant/token'
import { useTrendingTokenQuery } from '@/query/wallet-explorer/getTrendingToken'

export const Header = () => {
  const listTokenQuery = useTrendingTokenQuery()
  const listTokenData = listTokenQuery.data?.data?.trending_tokens
  return (
    <div className="z-[9999] fixed w-[calc(100%_-300px)] flex gap-0 justify-between items-stretch self-stretch px-10 py-6 border-b border-solid shadow-2xl backdrop-blur-lg bg-neutral-07/50 bg-opacity-50 border-b-white/10 max-md:flex-wrap max-md:px-5">
      <div className="flex gap-0 justify-between items-stretch text-base leading-6 whitespace-nowrap w-[70%]">
        <div className="flex flex-col justify-center items-stretch px-4 py-3 font-semibold tracking-normal rounded-s-lg border-t border-b border-l border-solid bg-neutral-07/50 bg-opacity-30 border-b-white/10 border-l-white/10 border-t-white/10 text-white text-opacity-90">
          <div className="flex gap-1 justify-between items-stretch">
            <img
              loading="lazy"
              src="/assets/icons/trending.svg"
              className="object-center w-6 aspect-square"
            />
            <div className="grow">Trending</div>
          </div>
        </div>
        <div className="overflow-hidden flex flex-col flex-1 justify-center items-stretch px-4 py-3 rounded-e-lg tracking-tight rounded-none border-t border-r border-b border-solid bg-gray-300 bg-opacity-10 border-b-white/10 border-r-white/10 border-t-white/10 max-md:max-w-full">
          <div
            id="scroll-text"
            className="flex gap-5 justify-between items-stretch max-md:flex-wrap max-md:max-w-full">
            {listTokenData?.slice(0, 6)?.map((token, index) => (
              <div key={index} className="flex gap-0.5 justify-between items-stretch">
                <div className="grow font-medium text-white">#{index + 1}</div>
                <div className="flex gap-1 justify-between items-stretch text-white">
                  <div className="grow">{token.symbol}</div>
                  <img
                    loading="lazy"
                    src={
                      token?.image_url
                        ? token.image_url
                        : token?.thumb
                          ? token?.thumb
                          : DATA_TOKEN?.find((item) => item.token === token.symbol)?.image_url
                    }
                    className="object-center justify-center items-center my-auto w-4 aspect-square"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-between items-stretch">
        <div className="cursor-pointer flex gap-2 justify-between items-stretch px-4 py-3 rounded-lg transition-all duration-150 hover:bg-white/10">
          <img
            loading="lazy"
            src="/assets/icons/chain/polygon.svg"
            className="object-center w-8 aspect-square"
          />
          <img
            loading="lazy"
            src="/assets/icons/arrow-down.svg"
            className="object-center justify-center items-center my-auto w-5 aspect-square"
          />
        </div>
        <ButtonConnectWallet />
      </div>
    </div>
  )
}
