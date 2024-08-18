function InfoIcon({ className }: { className?: string }) {
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
        fill="#6F767E"
        fillRule="evenodd"
        d="M12 20a8 8 0 100-16 8 8 0 000 16zm0 2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
        clipRule="evenodd"
      ></path>
      <circle cx="12" cy="18" r="1" fill="#6F767E"></circle>
      <path
        fill="#6F767E"
        fillRule="evenodd"
        d="M12 8c-.869 0-1.611.555-1.886 1.333a1 1 0 11-1.886-.666 4.001 4.001 0 114.773 5.207V15a1 1 0 01-2 0v-2a1 1 0 011-1 2 2 0 000-4z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

export default InfoIcon
