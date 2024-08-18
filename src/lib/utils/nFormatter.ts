import numeral from 'numeral'

export function nFormatter(number: number) {
  const isNegative = number < 0
  if (number >= 0 && number < 1) {
    return numeral(number).format('0,0.[000000]')
  }
  const absoluteNumber = Math.abs(number)

  if (absoluteNumber < 1000) {
    return (isNegative ? '-' : '') + absoluteNumber.toFixed(0)
  }

  const suffixes = ['', 'K', 'M', 'B', 'T', 'P', 'E']
  const suffixIndex = Math.min(
    Math.floor(Math.log10(absoluteNumber) / 3),
    suffixes.length - 1,
  )
  const formattedNumber = (
    absoluteNumber / Math.pow(10, 3 * suffixIndex)
  ).toFixed(1)

  return (isNegative ? '-' : '') + formattedNumber + suffixes[suffixIndex]
}
