function ArrowRightIcon({
  className,
  onClick,
}: {
  className?: string
  onClick?: () => void
}) {
  return (
    <svg
      className={className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="#6F767E"
        fillRule="evenodd"
        d="M8.043 19.207a1 1 0 010-1.414L13.836 12 8.043 6.207a1 1 0 011.414-1.414l5.793 5.793a2 2 0 010 2.828l-5.793 5.793a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

export default ArrowRightIcon
