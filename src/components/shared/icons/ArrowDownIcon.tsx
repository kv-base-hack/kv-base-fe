function ArrowDownIcon({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <svg
      className={className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none">
      <path
        d="M4 6L8 10L12 6"
        stroke="#6F767E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ArrowDownIcon
