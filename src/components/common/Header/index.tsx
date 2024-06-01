import { SelectChain } from '@/components/common/SelectChain'
import SearchIcon from '@/components/shared/icons/SearchIcon'

export const Header = () => {
  return (
    <div className="z-[9999] fixed w-full flex gap-0 justify-between items-stretch self-stretch px-10 py-6 border-b border-solid shadow-2xl backdrop-blur-lg bg-neutral-07/50 bg-opacity-50 border-b-white/10 max-md:flex-wrap max-md:px-5">
      <div className="flex gap-0 justify-between items-stretch text-base leading-6 whitespace-nowrap w-[70%]">
        <div className="flex flex-col justify-center py-2 text-base font-semibold tracking-normal leading-6 text-neutral-04 rounded-xl border border-solid shadow-lg backdrop-blur-lg bg-white/5 bg-opacity-10 border-white/10 min-w-[380px]">
          <div className="flex gap-3 px-5">
            <SearchIcon />
            <input
              className="flex flex-1 bg-transparent w-full border-none outline-none text-neutral-01"
              placeholder="Search wallets, tokens or contract ..."
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-between items-stretch">
        <SelectChain size="lg" showName={false} />
      </div>
    </div>
  )
}
