import { ChevronRight } from '@/components/shared/icons/ChevronRight'
import Link from 'next/link'

export const LinkCustom = ({ url, title }: { url: string; title: string }) => {
  return (
    <Link
      href={url}
      className="text-base text-primary-1 font-bold flex items-center gap-1"
    >
      {title}
      <ChevronRight />
    </Link>
  )
}
