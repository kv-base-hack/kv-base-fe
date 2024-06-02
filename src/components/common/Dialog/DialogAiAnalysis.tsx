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
        <div className="p-px hover:bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-white/10 rounded-[20px] w-full transition-all duration-300 ease-in-out">
          <button className="py-2 w-full border border-transparent rounded-[20px] backdrop-blur-[32px] text-base bg-[#1e1e1e]">
            AI Analysis
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[70%] max-w-[1000px] overflow-auto top-[450px]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1">
            <IconAiAnalysis />
            <p className="text-neutral-200 text-xl font-medium">
              AI Analysis of
            </p>
            <ImageToken
              imgUrl={item?.image_url}
              symbol={item?.symbol}
              className="w-[32px] h-[32px]"
            />
            <div className="font-bold text-xl text-neutral-400 flex items-center gap-1">
              <p className="text-neutral-200">{item?.symbol}</p>{' '}
              <p>{item.name}</p>
            </div>
          </div>

          <div>
            <MemoizedReactMarkdown
              className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
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
