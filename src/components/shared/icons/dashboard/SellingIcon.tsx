function SellingIcon({
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
      <path
        d="M3 5.73333L14 11.3333M14 4.66667L3 10.2667M4 2C5.10457 2 6 2.89543 6 4C6 5.10457 5.10457 6 4 6C2.89543 6 2 5.10457 2 4C2 2.89543 2.89543 2 4 2ZM4 10C5.10457 10 6 10.8954 6 12C6 13.1046 5.10457 14 4 14C2.89543 14 2 13.1046 2 12C2 10.8954 2.89543 10 4 10Z"
        stroke="#F04D1A"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SellingIcon
