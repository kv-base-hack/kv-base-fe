import { IconAiAnalysis } from '@/components/shared/icons/trading-signal/AIAnalysis'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { DexTradingSignalInfo } from '@/types/trading-signal/dexTradingSignal'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { ImageToken } from '../Image/ImageToken'
import { MemoizedReactMarkdown } from '../Markdown'

export const DialogAiAnalysis = ({ item }: { item: DexTradingSignalInfo }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full rounded-[48px] border border-transparent bg-[#D8F0FF] py-2 text-base font-semibold text-neutral-07 backdrop-blur-[32px]">
          <div className="transition-all duration-300 hover:scale-110">
            AI Analysis
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="top-[450px] max-h-[70%] max-w-[1000px] overflow-auto bg-neutral-01">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1">
            <IconAiAnalysis />
            <p className="text-xl font-medium text-neutral-07">
              AI Analysis of
            </p>
            <ImageToken
              imgUrl={item?.image_url}
              symbol={item?.symbol}
              className="h-[32px] w-[32px]"
            />
            <div className="flex items-center gap-1 text-xl font-bold text-neutral-04">
              <p className="text-neutral-07">{item?.symbol}</p>{' '}
              <p>{item.name}</p>
            </div>
          </div>

          <div>
            <MemoizedReactMarkdown
              className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words text-neutral-07"
              remarkPlugins={[remarkGfm, remarkMath]}
              components={{
                p({ children }) {
                  // @ts-ignore
                  return <p className="mb-2 last:mb-0">{children}</p>
                },
              }}
            >
              {item.content}
            </MemoizedReactMarkdown>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
