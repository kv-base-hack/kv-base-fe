import ArrowRightIcon from '@/components/shared/icons/ArrowRight'
import Copy from '@/components/shared/icons/social/Copy'
import Facebook from '@/components/shared/icons/social/Facebook'
import Telegram from '@/components/shared/icons/social/Telegram'
import Twitter from '@/components/shared/icons/social/Twitter'
import { cn } from '@/lib/utils'
import { useArticleDetailQuery } from '@/query/course/getArticleDetail'
import { Link, createFileRoute } from '@tanstack/react-router'
import Markdown from 'react-markdown'

export const Route = createFileRoute('/academy/articles/$articleId/deep')({
  component: ArticleDetail,
})

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

function ArticleDetail() {
  const params = Route.useParams()

  const courseQuery = useArticleDetailQuery({ id: params.articleId })
  const dataArticleDetail = courseQuery.data?.data

  const h2Titles = extractH2Titles(dataArticleDetail?.content)

  return (
    <div className="w-full h-full">
      <div className="flex flex-col self-stretch p-10 max-md:px-5">
        <div className="flex items-center gap-0 py-2 text-xl tracking-tight leading-8 max-md:flex-wrap max-md:max-w-full">
          <Link to="/academy/articles" className="text-gray-400">
            Articles
          </Link>
          <ArrowRightIcon />
          <div className="flex-auto text-gray-200 max-md:max-w-full">
            {dataArticleDetail?.title}
          </div>
        </div>
        <div className="mt-4 max-w-[1248px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
            <div className="flex flex-col w-9/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow text-xl text-gray-200 max-w-[792px] max-md:mt-8 max-md:max-w-full">
                <img
                  loading="lazy"
                  srcSet="/assets/images/article.jpeg"
                  className="w-full aspect-[1.79] rounded-2xl max-md:max-w-full"
                />
                <div className="mt-5 text-5xl text-gray-200 leading-[60px] max-md:max-w-full max-md:text-4xl max-md:leading-[56px]">
                  {dataArticleDetail?.title}
                </div>
                <div className="flex gap-4 items-center self-start mt-5 text-xs font-bold tracking-normal leading-4 text-gray-400">
                  <div
                    className={cn(
                      'flex items-center justify-start gap-2 self-stretch py-1.5 px-2 text-white whitespace-nowrap rounded-lg bg-opacity-30',
                      dataArticleDetail?.difficulty === 'Beginner'
                        ? 'bg-green-500'
                        : dataArticleDetail?.difficulty === 'Intermediate'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                    )}>
                    {dataArticleDetail?.difficulty}
                  </div>
                  <div className="self-stretch my-auto">Feb 25, 2024</div>
                  <div className="flex gap-1 self-stretch my-auto whitespace-nowrap">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/87958d82b6bb584f3f2873486f0f3405a187705d345fcdd72e633a940b40a3a6?"
                      className="w-4 aspect-square"
                    />
                    <div>{dataArticleDetail?.reading_time}m</div>
                  </div>
                </div>
                <div className="flex gap-2 self-start pr-14 mt-4 text-xs font-bold leading-3 text-white whitespace-nowrap max-md:pr-5">
                  {dataArticleDetail?.topics?.map((topic: string, index: number) => (
                    <div
                      key={index}
                      className="justify-center px-3 py-1.5 bg-white bg-opacity-10 rounded-[100px]">
                      {topic}
                    </div>
                  ))}
                </div>
                <div className="prose-neutral mt-4">
                  {dataArticleDetail?.content ? (
                    <Markdown>{dataArticleDetail?.content}</Markdown>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col self-stretch max-md:mt-8">
                <div className="text-xl leading-7 text-gray-200">Share Posts</div>
                <div className="flex gap-5 justify-between pr-7 mt-6 max-md:pr-5">
                  <Twitter />
                  <Facebook />
                  <Telegram />
                  <Copy />
                </div>
                <div className="mt-20">
                  {h2Titles.map((title: string, index: number) => (
                    <div
                      key={index}
                      className={cn(
                        index === 0 ? 'text-gray-200' : 'text-gray-400',
                        'flex gap-5 justify-between items-start px-3 text-base leading-6 max-md:mt-10'
                      )}>
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            index === 0 ? 'border-neutral-02' : 'border-neutral-04',
                            'w-[10px] h-[10px] rotate-45 border-2 rounded-[2px]'
                          )}></div>
                        {index < h2Titles.length - 1 ? (
                          <div className="w-1 h-14 bg-neutral-04" />
                        ) : null}
                      </div>
                      <div className="flex-auto -mt-1.5">{title}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-20 text-xl leading-7 text-gray-200 max-md:mt-10">
                  Related Articles
                </div>
                <img
                  loading="lazy"
                  srcSet="/assets/images/article.jpeg"
                  className="mt-6 w-full aspect-[1.79] rounded-2xl"
                />
                <div className="mt-2 text-base leading-6 text-gray-200">
                  Blockchain Advantages and
                  <br />
                  Disadvantages
                </div>
                <img
                  loading="lazy"
                  srcSet="/assets/images/article.jpeg"
                  className="mt-6 w-full aspect-[1.79] rounded-2xl"
                />
                <div className="mt-2 text-base leading-6 text-gray-200">
                  Delegated Proof of Stake
                  <br />
                  Explained
                </div>
                <img
                  loading="lazy"
                  srcSet="/assets/images/article.jpeg"
                  className="mt-6 w-full aspect-[1.79] rounded-2xl"
                />
                <div className="mt-2 text-base leading-6 text-gray-200">What Is PGP?</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
