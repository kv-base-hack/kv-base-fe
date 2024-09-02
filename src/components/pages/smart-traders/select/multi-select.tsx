import CheckIcon from '@/components/shared/icons/CheckIcon'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import upperFirst from 'lodash.upperfirst'
import Image from 'next/image'
import React from 'react'

interface Option {
  value: string
  label: string
}

export const MultiSelect = ({
  setPage,
  selectedValues,
  setSelectedValues,
  title,
  options,
  type,
}: {
  setPage: (page: number) => void
  setSelectedValues: (values: string[]) => void
  selectedValues: string
  title: string
  options: Option[]
  type: 'ranking' | 'badges'
}) => {
  /// convert string to array
  const selectedValuesArray = selectedValues.split(',')

  const toggleOption = (value: string) => {
    const newSelectedValues = selectedValuesArray.includes(value)
      ? selectedValuesArray.filter((v) => v !== value)
      : [...selectedValuesArray, value]
    setSelectedValues(newSelectedValues)
    setPage(1)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex h-7 w-auto cursor-pointer gap-2 whitespace-nowrap rounded-[360px] border border-solid border-[#656565] bg-transparent px-4 py-3 text-sm font-medium leading-6 tracking-normal text-white">
          <span>
            {selectedValuesArray.length > 0 &&
            !selectedValuesArray.includes('all')
              ? upperFirst(type)
              : title}
          </span>
          {selectedValuesArray.length > 0 &&
          !selectedValuesArray.includes('all') ? (
            <>
              {selectedValuesArray.map((i) => {
                return (
                  <button key={i} onClick={() => toggleOption(i)}>
                    <Image
                      src={`/images/${type}/${i}.png`}
                      alt={i}
                      width={20}
                      height={20}
                    />
                  </button>
                )
              })}
            </>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="!w-fit border border-white/10 bg-black/10 !p-0 backdrop-blur-xl">
        <Command>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues?.includes(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleOption(option.value)}
                    className="cursor-pointer transition-all duration-300 ease-in-out hover:bg-white/10"
                  >
                    <div
                      className={cn(
                        'mr-3 flex h-4 w-4 items-center justify-center rounded-sm border border-white',
                        isSelected
                          ? 'text-core'
                          : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <CheckIcon />
                    </div>
                    <Image
                      src={`/images/${type}/${option.value}.png`}
                      alt={option.value}
                      width={20}
                      height={20}
                      className="mr-1"
                    />
                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
