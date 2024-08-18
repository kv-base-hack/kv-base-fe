import { TokenList } from '@/types/tokenList'
import { ImageToken } from '../Image/ImageToken'
import Close from '@/components/shared/icons/Close'

export const TokenFilter = ({
  token,
  onClick,
}: {
  token: TokenList
  onClick: (value: TokenList) => void
}) => {
  return (
    <div className="rounded-xl bg-gradient-to-r from-[#9945FF] to-[#14F195] p-px shadow-lg backdrop-blur-[2px]">
      <div className="flex h-full cursor-pointer items-center justify-center gap-1 rounded-xl bg-neutral-01 px-4 py-2 text-sm leading-5 tracking-normal text-neutral-07">
        <ImageToken imgUrl={token?.imageUrl} symbol={token?.symbol} />
        <div>{token.symbol}</div>
        <Close onclick={onClick} />
      </div>
    </div>
  )
}
