'use client'

import ArrowLeftIcon from '@/components/shared/icons/ArrowLeft'
import ArrowRightIcon from '@/components/shared/icons//ArrowRight'
import Pagination from 'rc-pagination'
import { ChangeEvent, useMemo, useState } from 'react'
import { ArrowDupRight, ArrowDupLeft } from '@/components/shared/icons/ArrowDup'
import { cn } from '@/lib/utils'

export const PaginationTable = ({
  currentPage,
  updatePage,
  pageSize,
  total,
  setPage,
  className,
}: {
  currentPage: number
  updatePage: any
  pageSize: number
  total: number
  setPage: (n: number) => void
  className?: string
}) => {
  const [inputValue, setInputValue] = useState(currentPage)
  const totalPage = useMemo(() => {
    const quotient = Math.floor(total / pageSize) || 1
    const remainder = total % pageSize
    return remainder && total > pageSize ? quotient + 1 : quotient
  }, [total, pageSize])

  const handleJumpDownPage = () => {
    if (currentPage <= 5) {
      setPage(1)
    } else setPage(currentPage - 5)
  }
  const handleJumpUpPage = () => {
    if (currentPage >= totalPage - 5) {
      setPage(totalPage)
    } else setPage(currentPage + 5)
  }

  const handleToPage = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (isNaN(Number(value))) return
    const valueAsNumber = Number(value)
    if (valueAsNumber > totalPage) return
    setInputValue(valueAsNumber)
  }

  const handleBlur = () => {
    if (inputValue > 0) {
      setPage(inputValue)
    } else return
  }

  const renderPaginationItem = (current: any, type: string) => {
    switch (type) {
      case 'page':
        return current
      case 'prev':
        return (
          <div className="w-6 h-6 flex justify-center items-center">
            <ArrowLeftIcon className="w-4 h-4 cursor-pointer" />
          </div>
        )
      case 'next':
        return (
          <div className="w-6 h-6 flex justify-center items-center">
            <ArrowRightIcon className="w-4 h-4 cursor-pointer" />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div
      className={cn(
        'flex md:flex-row justify-center items-center gap-2 mb-10 md:mb-0',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <ArrowDupLeft onClick={handleJumpDownPage} />
        <Pagination
          pageSize={pageSize}
          current={currentPage}
          total={total}
          onChange={updatePage}
          itemRender={renderPaginationItem}
          className="flex items-center gap-2"
        />
        <ArrowDupRight onClick={handleJumpUpPage} />
      </div>
      <div className="flex gap-2 items-center text-sm">
        <input
          value={inputValue > 0 ? inputValue : ''}
          className="w-16 h-6 bg-transparent rounded-2xl text-center font-normal text-neutral-dark-1 border border-neutral-dark-8"
          onBlur={handleBlur}
          onChange={handleToPage}
        />
        <span className="text-neutral-dark-4">of</span>
        <span className="font-bold text-[#D6D9DC]">{totalPage}</span>
      </div>
    </div>
  )
}
