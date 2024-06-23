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
    <div className="rounded-xl p-px bg-gradient-to-r from-[#9945FF] to-[#14F195] shadow-lg backdrop-blur-[2px]">
      <div className="bg-neutral-01 cursor-pointer rounded-xl flex items-center justify-center px-4 py-2 gap-1 h-full text-sm tracking-normal leading-5 text-neutral-07">
        <ImageToken imgUrl={token?.imageUrl} symbol={token?.symbol} />
        <div>{token.symbol}</div>
        <Close onclick={onClick} />
      </div>
    </div>
  )
}
