import { Link } from '@tanstack/react-router'

export const ArticleItem = () => {
  return (
    <div className="flex flex-col justify-center font-bold rounded-2xl border border-solid shadow-md bg-neutral-07/50 border-white/10">
      <div className="flex overflow-hidden relative flex-col items-start pt-6 pr-16 pb-12 pl-6 w-full text-xs leading-3 text-white whitespace-nowrap aspect-[1.56]">
        <img
          loading="lazy"
          srcSet="/assets/images/article.jpeg"
          className="object-cover rounded-2xl absolute inset-0 size-full"
        />
        <div className="flex relative gap-2 mb-20">
          <div className="justify-center px-3 py-1.5 aspect-[2.86] bg-white bg-opacity-10 rounded-[100px]">
            Bitcoin
          </div>
          <div className="grow justify-center px-3 py-1.5 bg-white bg-opacity-10 rounded-[100px]">
            Blockchain
          </div>
          <div className="justify-center px-3 py-1.5 text-xs leading-3 aspect-[1.68] bg-white bg-opacity-10 rounded-[100px]">
            +1
          </div>
        </div>
      </div>
      <Link
        to="/academy/articles/$articleId/deep"
        params={{
          articleId: '1',
        }}>
        <div className="self-start px-7 mt-2 text-xl tracking-tight leading-8 text-gray-200">
          What Are Bitcoin Layer 2 Networks?
        </div>
      </Link>
      <div className="flex gap-4 items-center px-7 pb-6 mt-6 text-xs tracking-normal leading-4 text-gray-400">
        <div className="flex items-center justify-start gap-2 self-stretch py-1.5 px-2 text-white whitespace-nowrap rounded-lg bg-yellow-500 bg-opacity-30">
          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
          Intermediate
        </div>
        <div>Feb 16, 2024</div>
        <div className="flex gap-1 whitespace-nowrap">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/dd48fd75c48006aa1a880f998e31a3a201bd3aa75979258f9b2edf70b2cefb8a?"
            className="w-4 aspect-square"
          />
          <div>6m</div>
        </div>
      </div>
    </div>
  )
}
