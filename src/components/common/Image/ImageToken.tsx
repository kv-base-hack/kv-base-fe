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
        img.src = src
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
          'w-6 h-6 aspect-square rounded-full bg-neutral-400',
          className,
        )}
      />
    )
  // const src = imgUrl
  if (!tmpSrc) {
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
    <ImageNext
      loading="lazy"
      src={tmpSrc}
      className={cn('my-auto aspect-square rounded-full shrink-0', className)}
      alt={`${symbol} icon`}
      width={24}
      height={24}
    />
  )
}
