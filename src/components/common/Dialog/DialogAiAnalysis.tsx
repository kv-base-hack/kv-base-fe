import { IconAiAnalysis } from "@/components/shared/icons/trading-signal/AIAnalysis";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DexTradingSignalInfo } from "@/types/trading-signal/dexTradingSignal";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { ImageToken } from "../Image/ImageToken";
import { MemoizedReactMarkdown } from "../Markdown";

export const DialogAiAnalysis = ({ item }: { item: DexTradingSignalInfo }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full rounded-[20px] bg-white/10 from-[#9945FF] to-[#14F195] p-px transition-all duration-300 ease-in-out hover:bg-gradient-to-r">
          <button className="w-full rounded-[20px] border border-transparent bg-black py-2 text-base backdrop-blur-[32px]">
            AI Analysis
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="top-[450px] max-h-[70%] max-w-[1000px] overflow-auto">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1">
            <IconAiAnalysis />
            <p className="text-xl font-medium text-neutral-200">
              AI Analysis of
            </p>
            <ImageToken
              imgUrl={item?.image_url}
              symbol={item?.symbol}
              className="h-[32px] w-[32px]"
            />
            <div className="flex items-center gap-1 text-xl font-bold text-neutral-400">
              <p className="text-neutral-200">{item?.symbol}</p>{' '}
              <p>{item.name}</p>
            </div>
          </div>

          <div>
            <MemoizedReactMarkdown
              className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words"
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
  );
};
