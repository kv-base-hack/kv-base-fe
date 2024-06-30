export const renderSubNumber = (number: number) => {
  const convertNumber =
    number < 0.0001 && number !== 0 ? number?.toExponential() : number

  const strPrice = convertNumber.toString()
  const countSubZero = Number(strPrice.split('-')[1])
  const priceNumber = strPrice.split('-')[0]?.replace('.', '').slice(0, 2)

  return (
    <div className="flex items-center">
      $0.0
      <sub>{countSubZero}</sub>
      {priceNumber}
    </div>
  )
}
