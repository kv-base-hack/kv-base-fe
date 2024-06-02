import { isExponential } from './isExponential'
import { renderSubNumber } from './renderSubNumber'
import { formatPriceNumber } from './formatPriceNumber'

export const renderPrice = (price: number) => {
  return (
    <div>
      {isExponential(price) ? renderSubNumber(price) : formatPriceNumber(price)}
    </div>
  )
}
