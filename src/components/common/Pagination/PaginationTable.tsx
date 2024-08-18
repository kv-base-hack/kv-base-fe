'use client'

import ArrowLeftIcon from '@/components/shared/icons/ArrowLeft'
import ArrowRightIcon from '@/components/shared/icons/ArrowRight'
import { cn } from '@/lib/utils'
import Pagination from 'rc-pagination'
import { ChangeEvent, useMemo, useState } from 'react'

export const PaginationTable = ({
  currentPage,
  pageSize,
  total,
  setPage,
  className,
}: {
  currentPage: number
  pageSize: number
  total: number
  setPage: (page: number) => void
  className?: string
}) => {
  const [inputValue, setInputValue] = useState(currentPage)
  const totalPage = useMemo(() => {
    const quotient = Math.floor(total / pageSize) || 1
    const remainder = total % pageSize
    return remainder && total > pageSize ? quotient + 1 : quotient
  }, [total, pageSize])

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

  const handleChangePage = (page: number) => {
    if (page < totalPage + 1) {
      setPage(page)
      setInputValue(page)
    }
  }

  const renderPaginationItem = (
    current: any,
    type: string,
    originalElement: any,
  ) => {
    switch (type) {
      case 'page':
        return current
      case 'prev':
        return <ArrowLeftIcon className="cursor-pointer" />
      case 'next':
        return <ArrowRightIcon className="cursor-pointer" />
      default:
        return originalElement
    }
  }

  return (
    <div
      className={cn(
        'mb-10 flex flex-col items-center justify-center gap-2 md:mb-0 md:flex-row',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Pagination
          pageSize={pageSize}
          current={currentPage}
          total={total}
          onChange={handleChangePage}
          itemRender={renderPaginationItem}
          className="flex items-center"
          showSizeChanger={true}
        />
      </div>
      <div className="flex items-center gap-2 text-sm">
        <input
          value={inputValue > 0 ? inputValue : ''}
          className="max-w-6 rounded-lg border border-[#EFEFEF] bg-white py-1 text-center font-normal text-neutral-07"
          onBlur={handleBlur}
          onChange={handleToPage}
        />
        <span className="text-[#6F767E]">of</span>
        <span className="text-[#6F767E]">{totalPage} page</span>
      </div>
    </div>
  )
}
