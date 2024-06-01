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
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Iconly/Dark/Sharp/Arrow - Right 2">
        <path
          id="Stroke 50"
          d="M6.16699 3.33366L10.8337 8.00033L6.16699 12.667"
          stroke="#1A1D1F"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </g>
    </svg>
  )
}

export default ArrowRightIcon
