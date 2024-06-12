/* eslint-disable @next/next/no-img-element */
import { DATA_TOKEN } from '@/constant/token'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export const ImageToken = ({
  imgUrl,
  symbol,
  className,
}: {
  imgUrl?: string
  symbol?: string
  className?: string
}) => {
  if (imgUrl) {
    return (
      <Image
        loading="lazy"
        src={imgUrl}
        className={cn('my-auto aspect-square rounded-full', className)}
        alt={`${symbol} icon`}
        width={24}
        height={24}
      />
    )
  }
  if (!symbol)
    return (
      <div
        className={cn(
          'w-6 h-6 aspect-square rounded-full bg-neutral-400',
          className,
        )}
      />
    )
  const src = DATA_TOKEN?.find((el) => el.token === symbol)?.image_url
  if (!src) {
    return (
      <div
        className={cn(
          'flex justify-center aspect-square items-center w-6 h-6 bg-neutral-400 rounded-full shrink-0',
          className,
        )}
      >
        <span className="uppercase text-sm font-medium text-neutral-08">
          {symbol.charAt(0)}
        </span>
      </div>
    )
  }
  return (
    <Image
      loading="lazy"
      src={src}
      className={cn('my-auto aspect-square rounded-full shrink-0', className)}
      alt={`${symbol} icon`}
      width={24}
      height={24}
    />
  )
}
