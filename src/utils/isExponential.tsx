export function isExponential(number: number) {
  const convertNumber =
    number < 0.0001 && number !== 0 ? number?.toExponential() : number
  const str = convertNumber?.toString()
  return str?.includes('e')
}
