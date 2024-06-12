import InfoIcon from '@/components/shared/icons/dashboard/InfoIcon'
import { TooltipCustom } from '.'

const renderContent = (type: string) => {
  switch (type) {
    case 'balanceChange':
      return 'Change in balance for the token over a specified period.'
    case 'avgPrice':
      return 'Average entry price at which smart money bought the token.'
    case 'numberOfSMBuy':
      return 'Number of smart money entities that bought the token.'
    case 'mostProfitable':
      return 'The tokens that have generated the highest profits for smart money in the last 3 days.'
    default:
      return ''
  }
}

export const TooltipTable = ({ type }: { type: string }) => {
  return (
    <TooltipCustom
      className="max-w-[210px] z-[99999] bg-neutral-06 text-neutral-02 shadow-sm border-white/10 font-inter flex flex-wrap"
      content={renderContent(type)}
    >
      <InfoIcon className="w-4 h-4 md:w-5 lg:w-5" />
    </TooltipCustom>
  )
}
