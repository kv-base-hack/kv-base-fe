import React from 'react'

const CircularChartScore = ({
  size = 100,
  dotSize = 5,
  numberOfDots = 40,
  color = '#8338EC',
  colorInactive = '#8338EC4D',
  numberOfDots2 = 40,
  color2 = '#15FFAB',
  colorInactive2 = '#15FFAB4D',
  fontSize = 12,
  isText = true,
  totalScore,
  technicalScore,
  onchainScore,
}: {
  size?: number
  dotSize?: number
  color?: string
  numberOfDots?: number
  colorInactive?: string
  color2?: string
  numberOfDots2?: number
  colorInactive2?: string
  fontSize?: number
  isText?: boolean
  totalScore: number
  technicalScore: number
  onchainScore: number
}) => {
  const radius = size / 2 - dotSize
  const filledDots = Math.floor((40 / 100) * numberOfDots)
  const filledDotsOnChain = Math.floor((onchainScore / 100) * numberOfDots)
  const filledDotsTechnical = Math.floor((technicalScore / 100) * numberOfDots)

  const renderDotsOnchain = () => {
    const dots = []
    for (let i = 0; i < numberOfDots; i++) {
      // Điều chỉnh góc để bắt đầu từ vị trí 12 giờ và đi theo chiều kim đồng hồ
      const angle = ((i - numberOfDots / 4) / numberOfDots) * 360
      const x = size / 2 + radius * Math.cos((angle * Math.PI) / 180)
      const y = size / 2 + radius * Math.sin((angle * Math.PI) / 180)

      dots.push(
        <circle
          key={i}
          cx={x}
          cy={y}
          r={dotSize / 2}
          fill={i < filledDotsOnChain ? color : colorInactive}
          filter={i < filledDotsOnChain ? 'url(#glow)' : ''}
          style={{
            animation: `fillDots 0.005s ease-out forwards`,
            animationDelay: `${i * 0.02}s`,
            opacity: 0,
          }}
        />,
      )
    }
    return dots
  }

  const renderDotsTechnical = () => {
    const dots = []
    for (let i = 0; i < numberOfDots2; i++) {
      // Điều chỉnh góc để bắt đầu từ vị trí 12 giờ và đi theo chiều kim đồng hồ
      const angle = ((i - numberOfDots2 / 4) / numberOfDots2) * 360
      const x = size / 2 + (radius - 25) * Math.cos((angle * Math.PI) / 180)
      const y = size / 2 + (radius - 25) * Math.sin((angle * Math.PI) / 180)

      dots.push(
        <circle
          key={i}
          cx={x}
          cy={y}
          r={dotSize / 2}
          fill={i < filledDotsTechnical ? color2 : colorInactive2}
          filter={i < filledDotsTechnical ? 'url(#glow)' : ''}
          rotate={25.714}
          style={{
            animation: `fillDots 0.005s ease-out forwards`,
            animationDelay: `${i * 0.02}s`,
            opacity: 0,
          }}
        />,
      )
    }
    return dots
  }

  return (
    <svg width={size} height={size}>
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" result="coloredBlur" />
          <feOffset dx="0" dy="0" result="offsetblur" />
          <feFlood floodColor="rgba(50, 255, 145, 0.30)" result="color" />
          <feComposite in2="offsetblur" operator="in" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {renderDotsOnchain()}
      {renderDotsTechnical()}
      <circle cx="50%" cy={100} r="16" fill="#182317" />
      <path
        d="M16.5 7.375L19.5 13L25.125 16L19.5 19L16.5 24.625L13.5 19L7.875 16L13.5 13L16.5 7.375Z"
        fill="#77FF60"
        transform={`translate(${size / 2 - 16.5}, ${100 - 16})`}
      />
      <text
        x="50%"
        y="47%"
        textAnchor="middle"
        style={{
          fontFamily: 'Inter',
          fontSize: '12px',
          fill: '#D0D0DA',
          fontWeight: 600,
        }}
        dy="8"
      >
        OVERALL SCORE
      </text>
      <text
        x={size / 2 - 25}
        y="60%"
        textAnchor="middle"
        style={{
          fontSize: '28px',
          fill: '#16FFAB',
          fontFamily: 'Inter',
        }}
        dy="8"
      >
        {totalScore}
      </text>
      <text
        x={size / 2 - 25}
        y="60%"
        textAnchor="middle"
        style={{
          fontSize: '28px',
          fill: '#ffffff',
          fontFamily: 'Inter',
        }}
        dy="8"
        dx="45"
      >
        /100
      </text>
    </svg>
  )
}

export default CircularChartScore
