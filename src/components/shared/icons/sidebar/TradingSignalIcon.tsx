function TradingSignalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24">
      <g fill="#6F767E" fillRule="evenodd" clipRule="evenodd">
        <path d="M9 21a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z"></path>
        <path d="M14 14.745a2 2 0 01.856-1.64 5 5 0 10-5.712 0 2 2 0 01.856 1.64V16a1 1 0 001 1h2a1 1 0 001-1v-1.255zm-6 0a7 7 0 118 0V16a3 3 0 01-3 3h-2a3 3 0 01-3-3v-1.255z"></path>
      </g>
    </svg>
  )
}

export default TradingSignalIcon
