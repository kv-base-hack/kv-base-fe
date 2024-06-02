import { useAtom } from 'jotai'

import { Select, SelectTrigger } from '@/components/ui/select'
import { chainAtom } from '@/atom/chain'
import { cn } from '@/lib/utils'
import SolanaIcon from '@/components/shared/icons/token/solana'

export const SelectChain = ({
  showName = true,
  size = 'md',
}: {
  showName?: boolean
  size?: 'md' | 'lg'
}) => {
  const [chain, setChain] = useAtom(chainAtom)

  return (
    <Select value={chain} onValueChange={(val: string) => setChain(val)}>
      <SelectTrigger
        className={cn(
          'flex w-auto cursor-pointer gap-2 px-4 py-3 my-auto text-base font-semibold tracking-normal leading-6 text-gray-300 whitespace-nowrap',
          size === 'lg'
            ? 'bg-transparent border-none outline-none focus:ring-0 focus:ring-offset-0 p-0'
            : 'border border-solid backdrop-blur-[50px] bg-neutral-07/50 border-white/10 rounded-[360px]'
        )}>
        <div className="flex items-center gap-2 justify-between">
          <SolanaIcon
            className={cn('object-center aspect-square', size === 'lg' ? 'w-10 h-10' : 'w-8 h-8')}
          />
          {showName ? <div className="grow">Solana</div> : null}
        </div>
      </SelectTrigger>
      {/* <SelectContent className="border-none bg-neutral-07 z-[9999]">
        <SelectItem value="solana">Solana</SelectItem>
      </SelectContent> */}
    </Select>
  )
}
