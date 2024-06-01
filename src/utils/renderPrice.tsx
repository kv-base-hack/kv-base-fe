import { formatPriceNumber } from './formatPriceNumber'
import { isExponential } from './isExponential'
import { renderSubNumber } from './renderSubNumber'

export const renderPrice = (price: number) => {
  return (
    <div>
      {isExponential(price) ? renderSubNumber(price) : formatPriceNumber(price)}
    </div>
  )
}
