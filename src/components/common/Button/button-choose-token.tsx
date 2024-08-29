import { TokenList } from '@/types/tokenList'
import { DialogSelectToken } from '../Dialog/DialogSelectToken'

export const ButtonChooseToken = ({
  listToken,
  setListToken,
}: {
  listToken: TokenList[]
  setListToken: (value: TokenList[]) => void
}) => {
  return (
    <DialogSelectToken listToken={listToken} setListToken={setListToken}>
      <div className="h-7 rounded-3xl bg-gradient-to-r from-[#9945FF] to-[#14F195] p-px shadow-lg">
        <div className="flex h-full cursor-pointer items-center justify-center rounded-3xl bg-neutral-07 px-4 text-xs leading-5 tracking-normal text-white">
          Choose Token
        </div>
      </div>
    </DialogSelectToken>
  )
}
