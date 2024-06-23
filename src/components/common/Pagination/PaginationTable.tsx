'use client'

import ArrowLeftIcon from '@/components/shared/icons/ArrowLeft'
import ArrowRightIcon from '@/components/shared/icons/ArrowRight'
import { cn } from '@/lib/utils'
import Pagination from 'rc-pagination'
import { ChangeEvent, useMemo, useState } from 'react'

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
  setPage: any
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
        'flex flex-col md:flex-row justify-center items-center gap-2 mb-10 md:mb-0',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Pagination
          pageSize={pageSize}
          current={currentPage}
          total={total}
          onChange={updatePage}
          itemRender={renderPaginationItem}
          className="flex items-center"
          showSizeChanger={true}
        />
      </div>
      <div className="flex gap-2 items-center text-sm">
        <input
          value={inputValue > 0 ? inputValue : ''}
          className="max-w-6 bg-white rounded-lg text-center font-normal text-neutral-07 border border-[#EFEFEF] px-2 py-1"
          onBlur={handleBlur}
          onChange={handleToPage}
        />
        <span className="text-[#6F767E]">of</span>
        <span className="text-[#6F767E]">{totalPage} page</span>
      </div>
    </div>
  )
}
