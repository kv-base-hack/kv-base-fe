import Close from '@/components/shared/icons/Close'
import SearchIcon from '@/components/shared/icons/SearchIcon'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useTokenListQuery } from '@/query/token-explorer/getListToken'
import { ChangeEvent, useState } from 'react'
import { useDebounce } from 'react-use'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { DATA_TOKEN } from '@/constant/token'
import { Link } from '@tanstack/react-router'

export function DialogSelectToken() {
  const [search, setSearch] = useState('')
  const [debounceSearch, setDebounceSearch] = useState('')
  const CHAIN = useAtomValue(chainAtom)

  const listTokenQuery = useTokenListQuery({ symbol_search: debounceSearch, chain: CHAIN })
  const listTokenData = listTokenQuery.data?.data?.tokens

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  useDebounce(
    () => {
      setDebounceSearch(search)
    },
    300,
    [search]
  )
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer flex flex-col mx-10 my-4 justify-center py-2 text-base font-semibold tracking-normal leading-6 text-gray-500 rounded-xl border border-solid shadow-2xl backdrop-blur-lg bg-gray-300 bg-opacity-10 border-white/10 max-w-[360px]">
          <div className="flex gap-3 justify-between px-2">
            <SearchIcon />
            <div className="flex-auto bg-transparent outline-none text-neutral-01">
              Search address
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="!p-0 z-[999999]">
        <div className="flex flex-col p-4 rounded-xl border border-solid bg-zinc-900 border-white/10 max-w-[510px]">
          <div className="flex gap-5 w-full justify-between text-xl font-bold tracking-tight leading-7 text-zinc-100 max-md:flex-wrap max-md:pl-5 max-md:max-w-full">
            <div></div>
            <div className="text-center">Select tokens</div>
            <DialogClose>
              <Close />
            </DialogClose>
          </div>
          <div className="flex flex-col justify-center mt-4 text-base tracking-tight leading-6 text-gray-500 bg-zinc-900 bg-opacity-30 max-md:max-w-full">
            <div className="flex gap-4 justify-start px-4 py-3.5 rounded-xl border border-solid backdrop-blur-[50px] bg-black bg-opacity-30 border-white/10 max-md:flex-wrap max-md:max-w-full">
              <SearchIcon />
              <input
                placeholder="Search token name or paste address"
                className="w-full h-6 bg-transparent outline-none focus:outline-none font-normal text-neutral-03"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="mt-4 h-px bg-white bg-opacity-10 max-md:max-w-full" />
          <div className="h-[500px] overflow-y-auto">
            {listTokenData?.slice(0, 10)?.map((token, index) =>
              token.tokenAddress ? (
                <Link
                  to="/smartmoney-onchain/token-explorer/$token/deep"
                  params={{
                    token: token.tokenAddress,
                  }}
                  key={index}
                  className="flex cursor-pointer justify-between p-4 mt-4 rounded-xl bg-zinc-800 max-md:flex-wrap max-md:max-w-full">
                  <div className="flex gap-4 justify-between whitespace-nowrap">
                    <img
                      loading="lazy"
                      srcSet={DATA_TOKEN?.find((el) => el.token === token.symbol)?.image_url}
                      className="my-auto w-8 aspect-square"
                    />
                    <div className="flex flex-col flex-1">
                      <div className="text-base font-bold tracking-normal leading-6 text-zinc-100">
                        {token.symbol}
                      </div>
                      <div className="text-sm tracking-normal leading-4 text-gray-300">
                        {token.chainId}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 justify-center items-end whitespace-nowrap">
                    <div className="self-end text-base font-bold tracking-normal leading-6 text-zinc-100">
                      Price
                    </div>
                    <div className="flex gap-2 justify-between text-sm tracking-normal leading-4">
                      <div className="grow text-gray-300">${token.usdPrice}</div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div
                  key={index}
                  className="flex cursor-not-allowed justify-between p-4 mt-4 rounded-xl bg-zinc-800 max-md:flex-wrap max-md:max-w-full">
                  <div className="flex gap-4 justify-between whitespace-nowrap">
                    <img
                      loading="lazy"
                      srcSet={DATA_TOKEN?.find((el) => el.token === token.symbol)?.image_url}
                      className="my-auto w-8 aspect-square"
                    />
                    <div className="flex flex-col flex-1">
                      <div className="text-base font-bold tracking-normal leading-6 text-zinc-100">
                        {token.symbol}
                      </div>
                      <div className="text-sm tracking-normal leading-4 text-gray-300">
                        {token.chainId}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 justify-center items-end whitespace-nowrap">
                    <div className="self-end text-base font-bold tracking-normal leading-6 text-zinc-100">
                      Price
                    </div>
                    <div className="flex gap-2 justify-between text-sm tracking-normal leading-4">
                      <div className="grow text-gray-300">${token.usdPrice}</div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
