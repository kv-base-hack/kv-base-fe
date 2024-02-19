export const Header = () => {
  return (
    <div className="flex gap-0 justify-between items-stretch self-stretch px-10 py-6 border-b border-solid shadow-2xl backdrop-blur-lg bg-neutral-07/50 bg-opacity-50 border-b-white/10 max-md:flex-wrap max-md:px-5">
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
            <div className="flex gap-0.5 items-stretch">
              <div className="grow text-white">#1</div>
              <img
                loading="lazy"
                src="/assets/icons/up-trend.svg"
                className="object-center justify-center items-center w-6 aspect-square"
              />
              <div className="flex gap-1 justify-between items-stretch text-white">
                <div className="grow">MANTA</div>
                <img
                  loading="lazy"
                  src="/assets/icons/token/manta.svg"
                  className="object-center justify-center items-center my-auto w-4 aspect-square"
                />
              </div>
            </div>
            <div className="flex gap-0.5 justify-between items-stretch">
              <div className="grow font-medium text-white">#2</div>
              <div className="flex gap-1 justify-between items-stretch text-white">
                <div className="grow">EGG</div>
                <img
                  loading="lazy"
                  src="/assets/icons/token/usdt.svg"
                  className="object-center justify-center items-center my-auto w-4 aspect-square"
                />
              </div>
            </div>
            <div className="flex gap-0.5 items-stretch">
              <div className="grow text-white">#3</div>
              <img
                loading="lazy"
                src="/assets/icons/up-trend.svg"
                className="object-center justify-center items-center w-6 aspect-square"
              />
              <div className="flex gap-1 justify-between items-stretch text-white">
                <div className="grow">ALT</div>
                <img
                  loading="lazy"
                  src="/assets/icons/token/alt.svg"
                  className="object-center my-auto w-4 aspect-square"
                />
              </div>
            </div>
            <div className="flex gap-0.5 items-stretch">
              <div className="grow text-white">#4</div>
              <img
                loading="lazy"
                src="/assets/icons/up-trend.svg"
                className="object-center justify-center items-center w-6 aspect-square"
              />
              <div className="flex gap-1 justify-between items-stretch text-white">
                <div className="grow">MEMEAI</div>
                <img
                  loading="lazy"
                  src="/assets/icons/token/usdt.svg"
                  className="object-center justify-center items-center my-auto w-4 aspect-square"
                />
              </div>
            </div>
            <div className="flex gap-0.5 items-stretch">
              <div className="grow text-white">#5</div>
              <img
                loading="lazy"
                src="/assets/icons/up-trend.svg"
                className="object-center justify-center items-center w-6 aspect-square"
              />
              <div className="grow text-white">USDT</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-between items-stretch">
        <div className="cursor-pointer flex gap-2 justify-between items-stretch px-4 py-3 rounded-lg transition-all duration-150 hover:bg-white/10">
          <img
            loading="lazy"
            src="/assets/icons/chain/polygon.svg"
            className="object-center w-6 aspect-square fill-violet-600"
          />
          <img
            loading="lazy"
            src="/assets/icons/arrow-down.svg"
            className="object-center justify-center items-center my-auto w-5 aspect-square"
          />
        </div>
        <div className="flex flex-col flex-1 justify-center items-stretch text-base font-bold tracking-wide leading-6 uppercase whitespace-nowrap bg-yellow-200 rounded-xl text-zinc-800">
          <div
            id="connect-button"
            className="justify-center font-source-sans-pro items-stretch px-4 py-3 bg-white bg-opacity-10 rounded-[360px]">
            Connect Wallet
          </div>
        </div>
      </div>
    </div>
  )
}
