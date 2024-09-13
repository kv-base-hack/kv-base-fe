import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Markdown from 'react-markdown'
import { IconAiAnalysis } from '@/components/shared/icons/trading-signal/AIAnalysis'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { SkeletonText } from '@/components/common/Skeleton/SkeletonText'
import { tokenDetail } from '@/services/api-signal'

interface DialogTokenAnalysis {
  tokenAddress: string
  image_url: string
  symbol: string
  name: string
}

export const DialogTokenAnalysis = ({
  tokenAddress,
  image_url,
  symbol,
  name,
}: DialogTokenAnalysis) => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await tokenDetail({
        tokenAddress,
      })
      setResult(res.data.data)
    } catch (error) {
      setResult('Sorry, I cannot analyze this token')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchData()
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="h-7 rounded-3xl bg-gradient-to-r from-[#9945FF] to-[#14F195] p-px shadow-lg backdrop-blur-[2px]">
          <div className="flex h-full cursor-pointer items-center justify-center whitespace-nowrap rounded-3xl bg-black px-3 text-sm leading-5 tracking-normal text-white">
            Ask Kai Chat
          </div>
        </div>
      </DialogTrigger>
      <DialogContent
        className="max-h-[68vh] min-h-[20vh] overflow-y-auto overflow-x-hidden border-none focus:outline-none"
      >
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-1">
              <IconAiAnalysis />
              <p className="text-xl font-medium text-neutral-200">
                AI Analysis of
              </p>
              <ImageToken
                imgUrl={image_url}
                symbol={symbol}
                className="h-[32px] w-[32px]"
              />
              <div className="flex items-center gap-1 text-xl font-bold text-neutral-400">
                <p className="text-neutral-200">{symbol}</p> <p>{name}</p>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        {loading ? (
          <SkeletonText />
        ) : (
          <Markdown>{result}</Markdown>
        )}
      </DialogContent>
    </Dialog>
  )
}
