function PortfolioIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24">
      <path
        fill="#6F767E"
        fillRule="evenodd"
        d="M9 8.084A6 6 0 1015.916 15H10a1 1 0 01-1-1V8.084zm-3.445-.736A8 8 0 0110 6a1 1 0 011 1v6h6a1 1 0 011 1A8 8 0 115.555 7.348z"
        clipRule="evenodd"></path>
      <path
        fill="#6F767E"
        fillRule="evenodd"
        d="M13.293 2.293A1 1 0 0114 2a8 8 0 018 8 1 1 0 01-1 1h-7a1 1 0 01-1-1V3a1 1 0 01.293-.707zM15 4.083V9h4.916A6 6 0 0015 4.084z"
        clipRule="evenodd"></path>
    </svg>
  )
}

export default PortfolioIcon
