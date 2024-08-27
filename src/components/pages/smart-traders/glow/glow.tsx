import { cn } from '@/lib/utils'
import Image from 'next/image'

export const Glow = ({
  size,
  classNameText = 'left-9 top-[40px]',
  text,
  className,
}: {
  size: number
  classNameText?: string
  text: string
  className?: string
}) => {
  return (
    <div className={className}>
      <div className="relative z-10 h-[140] w-[140]">
        <Image
          src="/images/glow.png"
          alt=""
          width={size}
          height={size}
          className="absolute top-0"
        />
        <p
          className={cn(
            'absolute text-sm font-normal text-[#BDBDBD]',
            classNameText,
          )}
        >
          {text}
        </p>
      </div>
    </div>
  )
}
