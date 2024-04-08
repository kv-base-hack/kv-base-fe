import { useAtom } from 'jotai'

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { chainAtom } from '@/atom/chain'
import { cn } from '@/lib/utils'

const renderChain = (chain: string) => {
  switch (chain) {
    case 'solana':
      return {
        value: 'Solana',
        icon: '/assets/icons/chain/solana.svg',
      }
    case 'ethereum': {
      return {
        value: 'Ethereum',
        icon: '/assets/icons/chain/ethereum.svg',
      }
    }
    case 'sui': {
      return {
        value: 'Sui',
        icon: '/assets/icons/chain/sui.svg',
      }
    }
    default: {
      return {
        value: 'Solana',
        icon: '/assets/icons/chain/solana.svg',
      }
    }
  }
}

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
        <div className="flex gap-2 justify-between">
          <img
            loading="lazy"
            src={renderChain(chain).icon}
            className={cn('object-center aspect-square', size === 'lg' ? 'w-8' : 'w-6')}
          />
          {showName ? <div className="grow">{renderChain(chain).value}</div> : null}
        </div>
      </SelectTrigger>
      <SelectContent className="border-none bg-neutral-07 z-[9999]">
        <SelectItem value="solana">Solana</SelectItem>
        <SelectItem value="ethereum">Ethereum</SelectItem>
        <SelectItem value="sui">Sui</SelectItem>
      </SelectContent>
    </Select>
  )
}
