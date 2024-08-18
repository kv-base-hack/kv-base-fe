'use client'

import ArrowRightIcon from '@/components/shared/icons/ArrowRight'
import Copy from '@/components/shared/icons/social/Copy'
import Facebook from '@/components/shared/icons/social/Facebook'
import Telegram from '@/components/shared/icons/social/Telegram'
import Twitter from '@/components/shared/icons/social/Twitter'
import { cn } from '@/lib/utils'
import { useArticleDetailQuery } from '@/query/course/getArticleDetail'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Markdown from 'react-markdown'

function extractH2Titles(markdownContent: string) {
  if (!markdownContent) return []
  const regex = /^##\s(?!#)(.*)/gm
  let matches
  const titles = []

  while ((matches = regex.exec(markdownContent)) !== null) {
    titles.push(matches[1])
  }

  return titles
}

export default function ArticleDetail() {
  const router = useRouter()
  const { articleId } = router.query

  const courseQuery = useArticleDetailQuery({ id: articleId?.toString() || '' })
  const dataArticleDetail = courseQuery.data?.data

  const h2Titles = extractH2Titles(dataArticleDetail?.content)

  return (
    <div className="h-full w-full">
      <div className="flex flex-col self-stretch p-10 max-md:px-5">
        <div className="flex items-center gap-0 py-2 text-xl leading-8 tracking-tight max-md:max-w-full max-md:flex-wrap">
          <Link href="/academy/articles" className="text-gray-400">
            Articles
          </Link>
          <ArrowRightIcon />
          <div className="flex-auto text-gray-200 max-md:max-w-full">
            {dataArticleDetail?.title}
          </div>
        </div>
        <div className="mt-4 max-w-[1248px] max-md:max-w-full">
          <div className="max-md: flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex w-9/12 flex-col max-md:ml-0 max-md:w-full">
              <div className="flex max-w-[792px] grow flex-col text-xl text-gray-200 max-md:mt-8 max-md:max-w-full">
                <Image
                  loading="lazy"
                  src="/assets/images/article.jpeg"
                  alt="article"
                  className="aspect-[1.79] w-full rounded-2xl max-md:max-w-full"
                />
                <div className="mt-5 text-5xl leading-[60px] text-gray-200 max-md:max-w-full max-md:text-4xl max-md:leading-[56px]">
                  {dataArticleDetail?.title}
                </div>
                <div className="mt-5 flex items-center gap-4 self-start text-xs font-bold leading-4 tracking-normal text-gray-400">
                  <div
                    className={cn(
                      'flex items-center justify-start gap-2 self-stretch whitespace-nowrap rounded-lg bg-opacity-30 px-2 py-1.5 text-white',
                      dataArticleDetail?.difficulty === 'Beginner'
                        ? 'bg-green-500'
                        : dataArticleDetail?.difficulty === 'Intermediate'
                          ? 'bg-yellow-500'
                          : 'bg-red-500',
                    )}
                  >
                    {dataArticleDetail?.difficulty}
                  </div>
                  <div className="my-auto self-stretch">Feb 25, 2024</div>
                  <div className="my-auto flex gap-1 self-stretch whitespace-nowrap">
                    <Image
                      loading="lazy"
                      src="/assets/images/article.jpeg"
                      className="aspect-square w-4"
                      alt="logo"
                    />
                    <div>{dataArticleDetail?.reading_time}m</div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2 self-start whitespace-nowrap pr-14 text-xs font-bold leading-3 text-white max-md:pr-5">
                  {dataArticleDetail?.topics?.map(
                    (topic: string, index: number) => (
                      <div
                        key={index}
                        className="justify-center rounded-[100px] bg-white bg-opacity-10 px-3 py-1.5"
                      >
                        {topic}
                      </div>
                    ),
                  )}
                </div>
                <div className="prose-neutral mt-4">
                  {dataArticleDetail?.content ? (
                    <Markdown>{dataArticleDetail?.content}</Markdown>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="ml-5 flex w-3/12 flex-col max-md:ml-0 max-md:w-full">
              <div className="flex flex-col self-stretch max-md:mt-8">
                <div className="text-xl leading-7 text-gray-200">
                  Share Posts
                </div>
                <div className="mt-6 flex justify-between gap-5 pr-7 max-md:pr-5">
                  <Twitter />
                  <Facebook />
                  <Telegram />
                  <Copy />
                </div>
                <div className="mt-20">
                  {h2Titles?.map((title: string, index: number) => (
                    <div
                      key={index}
                      className={cn(
                        index === 0 ? 'text-gray-200' : 'text-gray-400',
                        'flex items-start justify-between gap-5 px-3 text-base leading-6 max-md:mt-10',
                      )}
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            index === 0
                              ? 'border-neutral-02'
                              : 'border-neutral-04',
                            'h-[10px] w-[10px] rotate-45 rounded-[2px] border-2',
                          )}
                        ></div>
                        {index < h2Titles.length - 1 ? (
                          <div className="h-14 w-1 bg-neutral-04" />
                        ) : null}
                      </div>
                      <div className="-mt-1.5 flex-auto">{title}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-20 text-xl leading-7 text-gray-200 max-md:mt-10">
                  Related Articles
                </div>
                <Image
                  loading="lazy"
                  src="/assets/images/article.jpeg"
                  alt="article"
                  className="mt-6 aspect-[1.79] w-full rounded-2xl"
                />
                <div className="mt-2 text-base leading-6 text-gray-200">
                  Blockchain Advantages and
                  <br />
                  Disadvantages
                </div>
                <Image
                  loading="lazy"
                  alt="article"
                  src="/assets/images/article.jpeg"
                  className="mt-6 aspect-[1.79] w-full rounded-2xl"
                />
                <div className="mt-2 text-base leading-6 text-gray-200">
                  Delegated Proof of Stake
                  <br />
                  Explained
                </div>
                <Image
                  loading="lazy"
                  src="/assets/images/article.jpeg"
                  alt="article"
                  className="mt-6 aspect-[1.79] w-full rounded-2xl"
                />
                <div className="mt-2 text-base leading-6 text-gray-200">
                  What Is PGP?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
