function NewListingSellIcon({
  className,
  color = '#1A1D1F',
}: {
  className?: string
  color?: string
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clip-path="url(#clip0_8679_101171)">
        <path
          d="M14.6666 7.99967H11.9999M3.99992 7.99967H1.33325M7.99992 3.99967V1.33301M7.99992 14.6663V11.9997M13.3333 7.99967C13.3333 10.9452 10.9454 13.333 7.99992 13.333C5.0544 13.333 2.66659 10.9452 2.66659 7.99967C2.66659 5.05416 5.0544 2.66634 7.99992 2.66634C10.9454 2.66634 13.3333 5.05416 13.3333 7.99967Z"
          stroke="#DC6803"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_8679_101171">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default NewListingSellIcon
