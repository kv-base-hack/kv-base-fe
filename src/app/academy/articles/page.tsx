'use client'

import { ArticleItem } from '@/components/common/ArticleItem'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import ArrowDown from '@/components/shared/icons/ArowDown'
import CheckIcon from '@/components/shared/icons/CheckIcon'
import PlusIcon from '@/components/shared/icons/PlusIcon'
import { useArticleQuery } from '@/query/course/useArticle'
import { useTopicQuery } from '@/query/course/useTopic'
import { Article } from '@/types/article'
import { useState } from 'react'

export default function Articles() {
  const [page, setPage] = useState(1)
  const articleQuery = useArticleQuery()
  const dataArticle = articleQuery.data?.data
  //
  const topicQuery = useTopicQuery()
  const dataTopic = topicQuery.data?.data
  return (
    <div className="h-full w-full">
      <div className="mb-10 flex flex-col">
        <div className="m-10 mb-4 flex gap-4 whitespace-nowrap text-neutral-300 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
          <div className="text-4xl font-semibold leading-10 tracking-tighter">
            Articles ({dataArticle?.length})
          </div>
          <div className="my-auto flex items-center gap-2 rounded-xl border-2 border-solid border-white/10 bg-neutral-07/50 px-4 py-2 text-base leading-6 tracking-normal">
            <div className="grow">Recently published</div>
            <ArrowDown />
          </div>
        </div>
        <div className="mx-10 mt-4 flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex w-1/2 flex-col max-md:ml-0 max-md:w-full">
            <div className="flex grow flex-col items-start self-stretch whitespace-nowrap text-xs leading-3 tracking-normal text-neutral-02 max-md:mt-4 max-md:max-w-full">
              <div className="self-stretch text-base leading-6 tracking-normal max-md:max-w-full">
                Topics
              </div>
              <div className="flex flex-wrap gap-2">
                {dataTopic?.map((topic: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-1 rounded-[100px] bg-gray-800 px-3 py-1"
                  >
                    <div className="grow">{topic}</div>
                    <PlusIcon />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="ml-5 flex w-1/2 flex-col max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch px-5 pb-12 max-md:mt-4 max-md:max-w-full">
              <div className="text-base leading-6 tracking-normal text-gray-200 max-md:max-w-full">
                Difficulty
              </div>
              <div className="mt-4 flex gap-2 whitespace-nowrap pr-20 text-base leading-6 tracking-tight text-white max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                <div className="flex items-center justify-start gap-2 rounded-lg bg-emerald-400 bg-opacity-30 px-2.5 py-0.5 max-md:pl-5">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  <div>Beginner</div>
                  <CheckIcon />
                </div>
                <div className="flex items-center justify-start gap-2 rounded-lg bg-yellow-500 bg-opacity-30 px-2.5 py-0.5 max-md:pl-5">
                  <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                  <div className="grow">Intermediate</div>
                  <CheckIcon />
                </div>
                <div className="flex items-center justify-start gap-2 rounded-lg bg-rose-600 bg-opacity-30 px-2.5 py-0.5 max-md:pl-5">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  <div className="grow">Advanced</div>
                  <CheckIcon />
                </div>
              </div>
              <div className="mt-6 text-base leading-6 tracking-normal text-gray-200 max-md:max-w-full">
                Reading time
              </div>
              <div className="mt-1.5 flex w-full justify-between gap-5 pb-1 pt-2.5 max-md:max-w-full max-md:flex-wrap">
                Slider
              </div>
            </div>
          </div>
        </div>
        <div className="m-10 grid grid-cols-3 gap-4">
          {dataArticle?.map((article: Article, index: number) => (
            <ArticleItem key={index} article={article} />
          ))}
        </div>
        <PaginationTable
          className="my-4"
          currentPage={page}
          pageSize={10}
          total={10}
          setPage={setPage}
        />
      </div>
    </div>
  )
}
