import React from 'react'

const CircularProgress = ({
  percentage,
  size = 100,
  lineWidth = 1,
  color = '#32AE60',
  colorInactive = '#32ae604d',
  fontSize = 12,
  isText = true,
}: {
  percentage: number
  size?: number
  lineWidth?: number
  color?: string
  colorInactive?: string
  fontSize?: number
  isText?: boolean
}) => {
  const radius = size / 2 - lineWidth / 2
  const circumference = 2 * Math.PI * radius
  const progressLength = (percentage / 100) * circumference

  return (
    <svg width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={colorInactive}
        strokeWidth={lineWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={lineWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progressLength}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      {isText && (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize={fontSize}
          fill="#BDBDBD"
        >
          {percentage}
        </text>
      )}
    </svg>
  )
}

export default CircularProgress
