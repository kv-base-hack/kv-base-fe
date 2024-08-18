function AcademyIcon({ className }: { className?: string }) {
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
        stroke="#6F767E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 10v6.01c0 .36 0 .54.055.698a1 1 0 00.23.373c.118.12.278.2.6.36l5.4 2.7c.262.132.393.198.53.223a.998.998 0 00.37 0c.137-.025.268-.091.53-.222l5.4-2.7c.322-.16.482-.241.6-.36a1 1 0 00.23-.374c.055-.159.055-.338.055-.697V10M2 8.5l9.642-4.822c.131-.065.197-.098.266-.11a.5.5 0 01.184 0c.069.012.135.045.266.11L22 8.5l-9.642 4.82a1.087 1.087 0 01-.266.112.501.501 0 01-.184 0c-.069-.013-.135-.046-.266-.111L2 8.5z"
      ></path>
    </svg>
  )
}

export default AcademyIcon
