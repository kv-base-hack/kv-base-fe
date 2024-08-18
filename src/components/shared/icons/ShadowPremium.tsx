function ShadowPremiumIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="111"
      height="30"
      fill="none"
      viewBox="0 0 111 30"
    >
      <g filter="url(#filter0_f_5769_26098)" opacity="0.2">
        <ellipse cx="55.788" cy="15.305" fill="#fff" rx="45" ry="4.5"></ellipse>
      </g>
      <defs>
        <filter
          id="filter0_f_5769_26098"
          width="110"
          height="29"
          x="0.788"
          y="0.805"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            result="effect1_foregroundBlur_5769_26098"
            stdDeviation="5"
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  )
}

export default ShadowPremiumIcon
