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
        fill="#6C7275"
        d="M14.707 5.293a1 1 0 10-1.414 1.414L17.586 11H4a1 1 0 100 2h13.586l-4.293 4.293a1 1 0 001.414 1.414l6-6a1 1 0 000-1.414l-6-6z"
      ></path>
    </svg>
  )
}

export default ArrowRightIcon
