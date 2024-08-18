import { cn } from '@/lib/utils'
import { Article } from '@/types/article'
import Image from 'next/image'
import Link from 'next/link'

export const ArticleItem = ({ article }: { article: Article }) => {
  return (
    <div className="flex flex-col justify-start rounded-2xl border border-solid border-white/10 bg-neutral-07/50 font-bold shadow-md">
      <div className="relative flex w-full flex-col items-start overflow-hidden whitespace-nowrap pb-12 pl-6 pr-16 pt-6 text-xs leading-3 text-white">
        <Image
          loading="lazy"
          src={`https://cdn.kai.13thstation.xyz/article/${article.id}.webp`}
          alt={article.title}
          className="absolute inset-0 size-full rounded-2xl object-cover"
        />
        <div className="relative mb-20 flex gap-2">
          {article?.topics?.map((topic, index) =>
            index < 2 ? (
              <div
                key={index}
                className="justify-center rounded-[100px] bg-white bg-opacity-10 px-3 py-1.5"
              >
                {topic}
              </div>
            ) : null,
          )}
          <div className="aspect-[1.68] justify-center rounded-[100px] bg-white bg-opacity-10 px-3 py-1.5 text-xs leading-3">
            +1
          </div>
        </div>
      </div>
      <Link href={`/academy/articles/${article.id}`}>
        <div className="mt-2 self-start px-7 text-xl leading-8 tracking-tight text-gray-200">
          {article.title}
        </div>
      </Link>
      <div className="mt-6 flex items-center gap-4 px-7 pb-6 text-xs leading-4 tracking-normal text-gray-400">
        <div
          className={cn(
            'flex items-center justify-start gap-2 self-stretch whitespace-nowrap rounded-lg bg-opacity-30 px-2 py-1.5 text-white',
            article.difficulty === 'Beginner'
              ? 'bg-green-500'
              : article.difficulty === 'Intermediate'
                ? 'bg-yellow-500'
                : 'bg-red-500',
          )}
        >
          <div
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              article.difficulty === 'Beginner'
                ? 'bg-green-500'
                : article.difficulty === 'Intermediate'
                  ? 'bg-yellow-500'
                  : 'bg-red-500',
            )}
          />
          {article.difficulty}
        </div>
        <div>Feb 25, 2024</div>
        <div className="flex gap-1 whitespace-nowrap">
          <Image
            loading="lazy"
            alt="kai logo"
            src=""
            className="aspect-square w-4"
          />
          <div>{article.reading_time}m</div>
        </div>
      </div>
    </div>
  )
}
