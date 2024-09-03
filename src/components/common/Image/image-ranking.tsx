import Image from 'next/image'

export const ImageRanking = ({
  ranking,
  size,
}: {
  ranking: string | undefined
  size: number
}) => {
  const typeRank = ranking === "nothing" || ranking === "" ? 'expert_trader' : ranking || ''

  return (
    <Image
      src={`/images/ranking/${typeRank}.png`}
      width={size}
      height={size}
      alt={typeRank}
    />
  )
}

export const ImageBadge = ({
  badge,
  size,
}: {
  badge: string
  size?: number
}) => {
  return (
    <Image
      src={`/images/badges/${badge}.png`}
      width={size}
      height={size}
      alt={badge}
    />
  )
}
