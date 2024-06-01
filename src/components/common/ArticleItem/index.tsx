import { cn } from '@/lib/utils'
import { Article } from '@/types/article'
import Image from 'next/image'
import Link from 'next/link'

export const ArticleItem = ({ article }: { article: Article }) => {
  return (
    <div className="flex flex-col justify-start font-bold rounded-2xl border border-solid shadow-md bg-neutral-07/50 border-white/10">
      <div className="flex overflow-hidden relative flex-col items-start pt-6 pr-16 pb-12 pl-6 w-full text-xs leading-3 text-white whitespace-nowrap">
        <Image
          loading="lazy"
          src={`https://cdn.kai.13thstation.xyz/article/${article.id}.webp`}
          alt={article.title}
          className="object-cover rounded-2xl absolute inset-0 size-full"
        />
        <div className="flex relative gap-2 mb-20">
          {article?.topics?.map((topic, index) =>
            index < 2 ? (
              <div
                key={index}
                className="justify-center px-3 py-1.5 bg-white bg-opacity-10 rounded-[100px]">
                {topic}
              </div>
            ) : null
          )}
          <div className="justify-center px-3 py-1.5 text-xs leading-3 aspect-[1.68] bg-white bg-opacity-10 rounded-[100px]">
            +1
          </div>
        </div>
      </div>
      <Link href={`/academy/articles/${article.id}`}>
        <div className="self-start px-7 mt-2 text-xl tracking-tight leading-8 text-gray-200">
          {article.title}
        </div>
      </Link>
      <div className="flex gap-4 items-center px-7 pb-6 mt-6 text-xs tracking-normal leading-4 text-gray-400">
        <div
          className={cn(
            'flex items-center justify-start gap-2 self-stretch py-1.5 px-2 text-white whitespace-nowrap rounded-lg bg-opacity-30',
            article.difficulty === 'Beginner'
              ? 'bg-green-500'
              : article.difficulty === 'Intermediate'
                ? 'bg-yellow-500'
                : 'bg-red-500'
          )}>
          <div
            className={cn(
              'w-1.5 h-1.5 rounded-full',
              article.difficulty === 'Beginner'
                ? 'bg-green-500'
                : article.difficulty === 'Intermediate'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
            )}
          />
          {article.difficulty}
        </div>
        <div>Feb 25, 2024</div>
        <div className="flex gap-1 whitespace-nowrap">
          <Image loading="lazy" alt="kai logo" src="" className="w-4 aspect-square" />
          <div>{article.reading_time}m</div>
        </div>
      </div>
    </div>
  )
}
