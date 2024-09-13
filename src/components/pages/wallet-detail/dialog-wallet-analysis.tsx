import { MemoizedReactMarkdown } from '@/components/common/Markdown'
import { SkeletonText } from '@/components/common/Skeleton/SkeletonText'
import { IconAiAnalysis } from '@/components/shared/icons/trading-signal/AIAnalysis'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { walletDetail } from '@/services/api-signal'
import { useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown'

export const DialogWalletAnalysis = ({ address }: { address: string }) => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await walletDetail({ walletAddress: address })
      setResult(res.data.data)
    } catch (error) {
      setResult('Sorry, I cannot analyze this wallet')
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
        ref={contentRef}
      >
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-1">
              <IconAiAnalysis />
              <p className="text-xl font-medium text-neutral-200">
                AI Analysis for {address.slice(0, 6)}...{address.slice(-4)}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>
        {loading ? <SkeletonText /> : <Markdown>{result}</Markdown>}
      </DialogContent>
    </Dialog>
  )
}
