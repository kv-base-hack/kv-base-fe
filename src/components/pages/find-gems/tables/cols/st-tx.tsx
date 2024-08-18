export const StTx = ({
  tx_buy,
  tx_sell,
}: {
  tx_buy: number
  tx_sell: number
}) => {
  return (
    <div>
      <span className="text-core">{tx_buy}</span>/
      <span className="text-[#F04D1A]">{tx_sell}</span>
    </div>
  )
}
