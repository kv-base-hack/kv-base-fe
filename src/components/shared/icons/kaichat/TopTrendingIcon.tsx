function TopTrendingIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24">
      <path
        fill="#000"
        d="M15 8.6c0-.56 0-.84-.109-1.054a1 1 0 00-.437-.437C14.24 7 13.96 7 13.4 7h-2.8c-.56 0-.84 0-1.054.109a1 1 0 00-.437.437C9 7.76 9 8.04 9 8.6V21h6V8.6z"
        opacity="0.12"></path>
      <path
        stroke="#E7F177"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12H4.6c-.56 0-.84 0-1.054.109a1 1 0 00-.437.437C3 12.76 3 13.04 3 13.6v5.8c0 .56 0 .84.109 1.054a1 1 0 00.437.437C3.76 21 4.04 21 4.6 21H9m0 0h6m-6 0V8.6c0-.56 0-.84.109-1.054a1 1 0 01.437-.437C9.76 7 10.04 7 10.6 7h2.8c.56 0 .84 0 1.054.109a1 1 0 01.437.437C15 7.76 15 8.04 15 8.6V21m0 0h4.4c.56 0 .84 0 1.054-.109a1 1 0 00.437-.437C21 20.24 21 19.96 21 19.4V4.6c0-.56 0-.84-.109-1.054a1 1 0 00-.437-.437C20.24 3 19.96 3 19.4 3h-2.8c-.56 0-.84 0-1.054.109a1 1 0 00-.437.437C15 3.76 15 4.04 15 4.6V8"></path>
    </svg>
  )
}

export default TopTrendingIcon
