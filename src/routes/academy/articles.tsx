import { ArticleItem } from '@/components/common/ArticleItem'
import { PaginationCustom } from '@/components/common/Pagination'
import ArrowDown from '@/components/shared/icons/ArowDown'
import CheckIcon from '@/components/shared/icons/CheckIcon'
import PlusIcon from '@/components/shared/icons/PlusIcon'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/academy/articles')({
  component: Articles,
})

function Articles() {
  const [page, setPage] = useState(1)

  return (
    <div className="w-full h-full">
      <div className="flex flex-col mb-10">
        <div className="flex m-10 mb-4 gap-4 text-neutral-300 whitespace-nowrap max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
          <div className="text-4xl font-semibold tracking-tighter leading-10">Articles (457)</div>
          <div className="flex items-center gap-2 px-4 py-2 my-auto text-base tracking-normal leading-6 rounded-xl border-2 border-solid bg-neutral-07/50 border-white/10">
            <div className="grow">Recently published</div>
            <ArrowDown />
          </div>
        </div>
        <div className="mt-4 mx-10 flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-1/2 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-start self-stretch text-xs tracking-normal leading-3 text-neutral-02 whitespace-nowrap max-md:mt-4 max-md:max-w-full">
              <div className="self-stretch text-base tracking-normal leading-6 max-md:max-w-full">
                Topics
              </div>
              <div className="flex gap-1 mt-4 max-md:flex-wrap max-md:max-w-full">
                <div className="flex items-center gap-1 justify-between px-3 py-1 bg-gray-800 rounded-[100px]">
                  <div className="grow">Altcoin</div>
                  <PlusIcon />
                </div>
                <div className="flex items-center gap-1 justify-between px-3 py-1 bg-gray-800 rounded-[100px]">
                  <div className="grow">Binance</div>
                  <PlusIcon />
                </div>
                <div className="flex items-center gap-1 justify-between px-3 py-1 bg-gray-800 rounded-[100px]">
                  <div className="grow">Bitcoin</div>
                  <PlusIcon />
                </div>
                <div className="flex items-center gap-1 justify-between px-3 py-1 bg-gray-800 rounded-[100px]">
                  <div className="grow">Blockchain</div>
                  <PlusIcon />
                </div>
                <div className="flex items-center gap-1 justify-between px-3 py-1 bg-gray-800 rounded-[100px]">
                  <div className="grow">Community</div>
                  <PlusIcon />
                </div>
              </div>
              <div className="flex gap-px mt-2 max-md:flex-wrap max-md:max-w-full">
                <div className="flex items-center gap-1 justify-between px-4 py-1 bg-gray-800 rounded-[100px]">
                  <div className="grow">Consensus</div>
                  <PlusIcon />
                </div>
                <div className="flex items-center gap-1 justify-between px-4 py-1 bg-gray-800 rounded-[100px]">
                  <div className="grow">Cryptography</div>
                  <PlusIcon />
                </div>
                <div className="flex items-center gap-1 justify-between px-4 py-1 bg-gray-800 rounded-[100px]">
                  <div className="grow">DeFi</div>
                  <PlusIcon />
                </div>
                <div className="flex items-center gap-1 justify-between px-4 py-1 bg-gray-800 rounded-[100px]">
                  <div className="grow">Economics</div>
                  <PlusIcon />
                </div>
              </div>
              <div className="flex gap-1 mt-2 max-md:flex-wrap max-md:max-w-full">
                <div className="flex items-center gap-1 justify-between px-5 py-1 bg-gray-800 rounded-[100px]">
                  <div className="grow">Ethereum</div>
                  <PlusIcon />
                </div>
                <div className="flex items-center gap-1 justify-between px-5 py-1 bg-gray-800 rounded-[100px]">
                  <div className="grow">History</div>
                  <PlusIcon />
                </div>
                <div className="flex items-center gap-1 justify-between px-5 py-1 bg-gray-800 rounded-[100px]">
                  <div className="grow">Metaverse</div>
                  <PlusIcon />
                </div>
                <div className="flex items-center gap-1 justify-between px-5 py-1 bg-gray-800 rounded-[100px]">
                  <div className="grow">Mining</div>
                  <PlusIcon />
                </div>
              </div>
              <div className="flex gap-1 mt-2 max-md:flex-wrap max-md:max-w-full">
                <div className="flex items-center gap-1 justify-between px-4 py-1 bg-gray-800 rounded-[100px]">
                  <div className="grow">Personal Finance</div>
                  <PlusIcon />
                </div>
                <div className="flex items-center gap-1 justify-between px-4 py-1 bg-gray-800 rounded-[100px]">
                  <div className="grow">Privacy</div>
                  <PlusIcon />
                </div>
                <div className="flex items-center gap-1 justify-between px-4 py-1 bg-gray-800 rounded-[100px]">
                  <div className="grow">Security</div>
                  <PlusIcon />
                </div>
                <div className="flex items-center gap-1 justify-between px-4 py-1 bg-gray-800 rounded-[100px]">
                  <div className="grow">Tech</div>
                  <PlusIcon />
                </div>
              </div>
              <div className="flex gap-0.5 mt-2 max-md:flex-wrap max-md:max-w-full">
                <div className="flex items-center gap-1 justify-between px-3.5 py-1 bg-gray-800 rounded-[100px]">
                  <div className="grow">Technical Analysis</div>
                  <PlusIcon />
                </div>
                <div className="flex items-center gap-1 justify-between px-3.5 py-1 bg-gray-800 rounded-[100px]">
                  <div className="grow">Trading</div>
                  <PlusIcon />
                </div>
                <div className="flex items-center gap-1 justify-between px-4 py-1 bg-gray-800 rounded-[100px]">
                  <div className="grow">Tutorials</div>
                  <PlusIcon />
                </div>
                <div className="flex items-center gap-1 justify-between px-3.5 py-1 bg-gray-800 rounded-[100px]">
                  <div className="grow">Use Cases</div>
                  <PlusIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-1/2 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch px-5 pb-12 max-md:mt-4 max-md:max-w-full">
              <div className="text-base tracking-normal leading-6 text-gray-200 max-md:max-w-full">
                Difficulty
              </div>
              <div className="flex gap-2 pr-20 mt-4 text-base tracking-tight leading-6 text-white whitespace-nowrap max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                <div className="flex items-center gap-2 justify-start py-0.5 px-2.5 rounded-lg bg-emerald-400 bg-opacity-30 max-md:pl-5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <div>Beginner</div>
                  <CheckIcon />
                </div>
                <div className="flex items-center gap-2 justify-start py-0.5 px-2.5 rounded-lg bg-yellow-500 bg-opacity-30 max-md:pl-5">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                  <div className="grow">Intermediate</div>
                  <CheckIcon />
                </div>
                <div className="flex items-center gap-2 justify-start py-0.5 px-2.5 rounded-lg bg-rose-600 bg-opacity-30 max-md:pl-5">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  <div className="grow">Advanced</div>
                  <CheckIcon />
                </div>
              </div>
              <div className="mt-6 text-base tracking-normal leading-6 text-gray-200 max-md:max-w-full">
                Reading time
              </div>
              <div className="flex gap-5 justify-between pt-2.5 pb-1 mt-1.5 w-full max-md:flex-wrap max-md:max-w-full">
                Slider
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 m-10">
          {[...Array(10)].map((_, index) => (
            <ArticleItem key={index} />
          ))}
        </div>
        <PaginationCustom
          className="my-4"
          currentPage={page}
          updatePage={() => null}
          pageSize={10}
          total={10}
          setPage={setPage}
        />
      </div>
    </div>
  )
}
