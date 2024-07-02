import { nFormatter } from './nFormatter'
import numeral from 'numeral'

function formatNumber(number: number) {
  const absNumber = Math.abs(number) // Handle both positive and negative numbers

  if (absNumber < 1) {
    // Handle very small numbers with scientific notation (e-notation)
    const exponent = Math.floor(Math.log10(absNumber) * -1) // Calculate exponent
    const significantDigits = absNumber
      .toExponential(2)
      .slice(0, 3)
      .replace('.', '') // Get 2 significant digits
    return (number < 0 ? '-' : '') + significantDigits + 'e-' + exponent
  } else {
    // Handle larger numbers with suffixes (K, M, B, etc.)
    const suffixes = ['', 'K', 'M', 'B', 'T', 'P', 'E']
    const suffixIndex = Math.min(
      Math.floor(Math.log10(absNumber) / 3),
      suffixes.length - 1,
    )
    const formattedNumber = (absNumber / Math.pow(10, 3 * suffixIndex)).toFixed(
      1,
    ) // Display 1 decimal place

    return (number < 0 ? '-' : '') + formattedNumber + suffixes[suffixIndex]
  }
}

export const formatPriceNumber = (value: number | undefined) => {
  if (!value) return '-'
  if (value > 10000 || value < -10000) {
    return `$${nFormatter(value)}`
  }
  if (value < 0.00001) {
    return formatNumber(value)
  }
  if (value < 0.0001) {
    return numeral(value).format('$0,0.[000000]')
  }
  if (value < 0.001) {
    return numeral(value).format('$0,0.[00000]')
  }
  if (value < 0.01) {
    return numeral(value).format('$0,0.[0000]')
  }
  return numeral(value).format('$0,0.[000]')
}
