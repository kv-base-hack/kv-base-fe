'use client'
/* eslint-disable @next/next/no-img-element */
import { DATA_TOKEN } from '@/constant/token'
import { cn } from '@/lib/utils'
import ImageNext from 'next/image'
import { useEffect, useState } from 'react'

export const ImageToken = ({
  imgUrl,
  symbol,
  className,
}: {
  imgUrl?: string
  symbol?: string
  className?: string
}) => {
  const [tmpSrc, setTmpSrc] = useState<string | null>(null)
  useEffect(() => {
    if (!imgUrl) {
      const src = DATA_TOKEN?.find((el) => el.token === symbol)?.image_url
      if (src) {
        const img = new Image()
        img.onload = () => setTmpSrc(src)
        img.onerror = () => setTmpSrc(null)
      }
    }
  }, [imgUrl, symbol])

  if (imgUrl) {
    return (
      <ImageNext
        loading="lazy"
        src={imgUrl}
        className={cn('my-auto aspect-square rounded-full', className)}
        alt={`${symbol} icon`}
        width={24}
        height={24}
        unoptimized
      />
    )
  }
  if (!symbol)
    return (
      <div
        className={cn(
          'aspect-square h-6 w-6 rounded-full bg-neutral-400',
          className,
        )}
      />
    )
  // const src = imgUrl
  if (!tmpSrc) {
    return (
      <div
        className={cn(
          'flex aspect-square h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-400',
          className,
        )}
      >
        <span className="text-sm font-medium uppercase text-neutral-08">
          {symbol.charAt(0)}
        </span>
      </div>
    )
  }
  return (
    <ImageNext
      loading="lazy"
      src={tmpSrc}
      className={cn('my-auto aspect-square shrink-0 rounded-full', className)}
      alt={`${symbol} icon`}
      width={24}
      height={24}
      unoptimized
    />
  )
}
