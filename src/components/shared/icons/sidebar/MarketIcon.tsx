function MarketIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M3 2a1 1 0 011 1v16a1 1 0 001 1h16a1 1 0 110 2H5a3 3 0 01-3-3V3a1 1 0 011-1z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7 8a1 1 0 011 1v8a1 1 0 11-2 0V9a1 1 0 011-1zM11 14a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM15 4a1 1 0 011 1v12a1 1 0 11-2 0V5a1 1 0 011-1zM19 10a1 1 0 011 1v6a1 1 0 11-2 0v-6a1 1 0 011-1z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

export default MarketIcon
