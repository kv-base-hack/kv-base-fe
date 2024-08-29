import Link from 'next/link'

export const LinkFindGems = ({
  url,
  title,
}: {
  url: string
  title: string
}) => {
  return (
    <Link href={url} passHref legacyBehavior>
      <a
        target="_blank"
        className="flex items-center gap-1 text-sm font-medium text-core underline"
      >
        {title}
      </a>
    </Link>
  )
}
