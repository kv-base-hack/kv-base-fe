export const IconChevronUp = ({
  className,
  color = '#32AE60',
}: {
  className?: string
  color?: string
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      className={className}
    >
      <path
        d="M7.29289 5.20711L1.70711 10.7929C1.07714 11.4229 1.52331 12.5 2.41421 12.5H13.5858C14.4767 12.5 14.9229 11.4229 14.2929 10.7929L8.70711 5.20711C8.31658 4.81658 7.68342 4.81658 7.29289 5.20711Z"
        fill={color}
      />
    </svg>
  )
}
