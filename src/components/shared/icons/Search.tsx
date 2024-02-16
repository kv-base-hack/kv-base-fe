export const SearchIcon = ({ props, onClick, className }: any) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      onClick={onClick}
      {...props}
    >
      <circle
        cx="11.767"
        cy="11.766"
        r="8.989"
        stroke="#F7F7F8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      ></circle>
      <path
        stroke="#F7F7F8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M18.018 18.485L21.542 22"
      ></path>
    </svg>
  )
}
