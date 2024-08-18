function SolanaIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
      className={className}
    >
      <rect width="32" height="32" fill="#1A1A1A" rx="16"></rect>
      <path
        fill="url(#paint0_linear_5541_3350)"
        d="M8.8 20.214a.713.713 0 01.492-.195h17.026c.31 0 .465.36.246.569l-3.365 3.217a.712.712 0 01-.492.195H5.682c-.31 0-.466-.359-.246-.569L8.8 20.214z"
      ></path>
      <path
        fill="url(#paint1_linear_5541_3350)"
        d="M8.8 8.195A.712.712 0 019.292 8h17.026c.31 0 .465.359.246.569l-3.365 3.217a.713.713 0 01-.492.195H5.682c-.31 0-.466-.36-.246-.569L8.8 8.195z"
      ></path>
      <path
        fill="url(#paint2_linear_5541_3350)"
        d="M23.2 14.166a.713.713 0 00-.493-.195H5.682c-.31 0-.466.36-.246.569L8.8 17.757c.13.125.307.195.492.195h17.026c.31 0 .465-.359.246-.569l-3.365-3.217z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_5541_3350"
          x1="19.756"
          x2="8.765"
          y1="3.611"
          y2="25.607"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3"></stop>
          <stop offset="1" stopColor="#DC1FFF"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_5541_3350"
          x1="19.756"
          x2="8.765"
          y1="3.611"
          y2="25.607"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3"></stop>
          <stop offset="1" stopColor="#DC1FFF"></stop>
        </linearGradient>
        <linearGradient
          id="paint2_linear_5541_3350"
          x1="19.756"
          x2="8.765"
          y1="3.611"
          y2="25.607"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3"></stop>
          <stop offset="1" stopColor="#DC1FFF"></stop>
        </linearGradient>
      </defs>
    </svg>
  )
}

export default SolanaIcon
