function LeafTreeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="37"
      height="48"
      fill="none"
      viewBox="0 0 37 48"
    >
      <path fill="#33383F" d="M23 1a1 1 0 112 0v47h-2V1z"></path>
      <path
        stroke="#33383F"
        strokeLinecap="round"
        strokeWidth="2"
        d="M24 12v4a8 8 0 008 8h4"
      ></path>
    </svg>
  )
}

export default LeafTreeIcon
