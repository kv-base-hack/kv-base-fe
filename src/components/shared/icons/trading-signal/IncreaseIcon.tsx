function IncreaseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="14"
      fill="none"
      viewBox="0 0 12 14">
      <g stroke="#83BF6E" strokeLinecap="round" strokeWidth="2">
        <path strokeLinejoin="round" d="M1 6l5-5 5 5"></path>
        <path d="M6 13V1"></path>
      </g>
    </svg>
  )
}

export default IncreaseIcon
