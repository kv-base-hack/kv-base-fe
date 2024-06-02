export const ArrowRightDown = ({
  className,
  color,
}: {
  className?: string
  color?: string
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.10225 4.10225C4.32192 3.88258 4.67808 3.88258 4.89775 4.10225L12.9375 12.142L12.9375 6.75C12.9375 6.43934 13.1893 6.1875 13.5 6.1875C13.8107 6.1875 14.0625 6.43934 14.0625 6.75L14.0625 13.5C14.0625 13.8107 13.8107 14.0625 13.5 14.0625L6.75 14.0625C6.43934 14.0625 6.1875 13.8107 6.1875 13.5C6.1875 13.1893 6.43934 12.9375 6.75 12.9375L12.142 12.9375L4.10225 4.89775C3.88258 4.67808 3.88258 4.32192 4.10225 4.10225Z"
        fill={color}
      />
    </svg>
  )
}
