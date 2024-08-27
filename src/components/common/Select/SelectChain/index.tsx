import { useAtom } from 'jotai'

import { Select, SelectTrigger } from '@/components/ui/select'
import { chainAtom } from '@/atom/chain'
import { cn } from '@/lib/utils'

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
          'my-auto flex w-auto cursor-pointer gap-2 whitespace-nowrap px-4 py-3 text-base font-semibold leading-6 tracking-normal text-gray-300',
          size === 'lg'
            ? 'border-none bg-transparent p-0 outline-none focus:ring-0 focus:ring-offset-0'
            : 'rounded-[360px] border border-solid border-white/10 bg-neutral-07/50 backdrop-blur-[50px]',
        )}
      >
        <div className="flex items-center justify-between gap-2">
          {showName ? <div className="grow">Solana</div> : null}
        </div>
      </SelectTrigger>
    </Select>
  )
}
