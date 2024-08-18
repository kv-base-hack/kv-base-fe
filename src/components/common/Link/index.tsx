import { ChevronRight } from '@/components/shared/icons/ChevronRight'
import Link from 'next/link'

export const LinkCustom = ({
  url,
  title,
  onClick,
}: {
  url: string
  title: string
  onClick?: () => void
}) => {
  return (
    <Link
      href={url}
      onClick={onClick}
      className="flex items-center gap-1 text-base font-bold text-[#0C68E9]"
    >
      {title}
      <ChevronRight />
    </Link>
  )
}
