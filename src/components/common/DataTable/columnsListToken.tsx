import { cn } from '@/lib/utils'
import { nFormatter } from '@/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import numeral from 'numeral'
import { ChartCategoryDetail } from '@/components/common/Chart'

export type ListToken = {
  id: string
  symbol: string
  price: number
  price_24h: number
  price_7d: number
  open_interest: number
  market_cap: number
  volumn_24h: number
  price_chart: number[][]
}

export const columnsListToken: ColumnDef<ListToken>[] = [
  {
    accessorKey: 'id',
    header: () => (
      <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5">#</div>
    ),
    cell: ({ row }) => {
      const { id } = row.original
      return <div>{id}</div>
    },
  },
  {
    accessorKey: 'symbol',
    header: () => (
      <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5 whitespace-nowrap">
        Token Name
      </div>
    ),
    cell: ({ row }) => {
      const { symbol } = row.original
      return (
        <div className="flex gap-3 w-full items-center justify-start">
          <img
            loading="lazy"
            src="/assets/icons/token/usdt.svg"
            className="w-6 aspect-square fill-blue-950"
          />
          <div>{symbol}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'price',
    header: () => (
      <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5">Price</div>
    ),
    cell: ({ row }) => {
      const { price } = row.original
      return <div>{numeral(price).format('$0,0.00[00]')}</div>
    },
  },
  {
    accessorKey: 'price_24h',
    header: () => (
      <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5">24h</div>
    ),
    cell: ({ row }) => {
      const { price_24h } = row.original
      return (
        <div className={cn(price_24h > 0 ? 'text-semantic-success-1' : 'text-semantic-error-1')}>
          {price_24h > 0 ? '+' : '-'}
          {numeral(price_24h).format('0,0.[00]')}%
        </div>
      )
    },
  },
  {
    accessorKey: 'price_7d',
    header: () => (
      <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5">7d</div>
    ),
    cell: ({ row }) => {
      const { price_7d } = row.original
      return (
        <div className={cn(price_7d > 0 ? 'text-semantic-success-1' : 'text-semantic-error-1')}>
          {price_7d > 0 ? '+' : ''}
          {numeral(price_7d).format('0,0.[00]')}%
        </div>
      )
    },
  },
  {
    accessorKey: 'open_interest',
    header: () => (
      <div className="text-center w-full text-neutral-dark-05 text-sm not-italic font-bold leading-5 whitespace-nowrap">
        Open Interest
      </div>
    ),
    cell: ({ row }) => {
      const { open_interest } = row.original
      return <div className="w-full text-center">${nFormatter(open_interest, 2)}</div>
    },
  },
  {
    accessorKey: 'market_cap',
    enableSorting: false,
    header: () => (
      <div className="flex items-center justify-center w-full gap-1">
        <div className="text-right text-neutral-dark-05 text-sm not-italic font-bold leading-5">
          Marketcap
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.99935 17.1665C13.6812 17.1665 16.666 14.1817 16.666 10.4998C16.666 6.81794 13.6812 3.83317 9.99935 3.83317C6.31745 3.83317 3.33268 6.81794 3.33268 10.4998C3.33268 14.1817 6.31745 17.1665 9.99935 17.1665ZM9.99935 18.8332C14.6017 18.8332 18.3327 15.1022 18.3327 10.4998C18.3327 5.89746 14.6017 2.1665 9.99935 2.1665C5.39698 2.1665 1.66602 5.89746 1.66602 10.4998C1.66602 15.1022 5.39698 18.8332 9.99935 18.8332Z"
            fill="#A7ACB4"
          />
          <path
            d="M9.16602 6.33333C9.16602 5.8731 9.53911 5.5 9.99935 5.5C10.4596 5.5 10.8327 5.8731 10.8327 6.33333C12.2134 6.33333 13.3327 7.45262 13.3327 8.83333C13.3327 9.29357 12.9596 9.66667 12.4993 9.66667C12.0391 9.66667 11.666 9.29357 11.666 8.83333C11.666 8.3731 11.2929 8 10.8327 8H8.9522C8.61005 8 8.33268 8.27737 8.33268 8.61951C8.33268 8.88617 8.50332 9.12291 8.75629 9.20724L11.7695 10.2116C12.703 10.5228 13.3327 11.3964 13.3327 12.3805C13.3327 13.6431 12.3091 14.6667 11.0465 14.6667H10.8327C10.8327 15.1269 10.4596 15.5 9.99935 15.5C9.53911 15.5 9.16602 15.1269 9.16602 14.6667C7.7853 14.6667 6.66602 13.5474 6.66602 12.1667C6.66602 11.7064 7.03911 11.3333 7.49935 11.3333C7.95959 11.3333 8.33268 11.7064 8.33268 12.1667C8.33268 12.6269 8.70578 13 9.16602 13H11.0465C11.3886 13 11.666 12.7226 11.666 12.3805C11.666 12.1138 11.4954 11.8771 11.2424 11.7928L8.22924 10.7884C7.2957 10.4772 6.66602 9.60356 6.66602 8.61951C6.66602 7.35689 7.68957 6.33333 8.9522 6.33333H9.16602Z"
            fill="#A7ACB4"
          />
        </svg>
      </div>
    ),
    cell: ({ row }) => {
      const { market_cap } = row.original
      return (
        <div className="w-full text-center text-neutral-dark-05 text-sm not-italic font-bold leading-5">
          ${nFormatter(market_cap, 2)}
        </div>
      )
    },
  },
  {
    accessorKey: 'volumn_24h',
    enableSorting: false,
    header: () => (
      <div className="flex items-center justify-center w-full gap-1 whitespace-nowrap">
        <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5">
          Volume (24h)
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.66732 3C2.12755 3 2.50065 3.3731 2.50065 3.83333V15.5C2.50065 15.9602 2.87375 16.3333 3.33398 16.3333H18.334C18.7942 16.3333 19.1673 16.7064 19.1673 17.1667C19.1673 17.6269 18.7942 18 18.334 18H3.33398C1.95327 18 0.833984 16.8807 0.833984 15.5V3.83333C0.833984 3.3731 1.20708 3 1.66732 3Z"
            fill="#A7ACB4"
          />
          <path
            d="M14.9993 4.6665C14.5391 4.6665 14.166 5.0396 14.166 5.49984V13.8332C14.166 14.2934 14.5391 14.6665 14.9993 14.6665C15.4596 14.6665 15.8327 14.2934 15.8327 13.8332V5.49984C15.8327 5.0396 15.4596 4.6665 14.9993 4.6665Z"
            fill="#A7ACB4"
          />
          <path
            d="M8.33268 6.33317C7.87244 6.33317 7.49935 6.70627 7.49935 7.1665V13.8332C7.49935 14.2934 7.87244 14.6665 8.33268 14.6665C8.79292 14.6665 9.16602 14.2934 9.16602 13.8332V7.1665C9.16602 6.70627 8.79292 6.33317 8.33268 6.33317Z"
            fill="#A7ACB4"
          />
          <path
            d="M4.99935 11.3332C4.53911 11.3332 4.16602 11.7063 4.16602 12.1665V13.8332C4.16602 14.2934 4.53911 14.6665 4.99935 14.6665C5.45959 14.6665 5.83268 14.2934 5.83268 13.8332V12.1665C5.83268 11.7063 5.45959 11.3332 4.99935 11.3332Z"
            fill="#A7ACB4"
          />
          <path
            d="M10.8327 8.83317C10.8327 8.37293 11.2058 7.99984 11.666 7.99984C12.1263 7.99984 12.4993 8.37293 12.4993 8.83317V13.8332C12.4993 14.2934 12.1263 14.6665 11.666 14.6665C11.2058 14.6665 10.8327 14.2934 10.8327 13.8332V8.83317Z"
            fill="#A7ACB4"
          />
        </svg>
      </div>
    ),
    cell: ({ row }) => {
      const { volumn_24h } = row.original
      return <div className="w-full text-center">${nFormatter(volumn_24h, 2)}</div>
    },
  },
  {
    accessorKey: 'price_chart',
    header: () => (
      <div className="text-center w-full text-neutral-dark-05 text-sm not-italic font-bold leading-5">
        Chart
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => {
      const { price_chart } = row.original
      return (
        <div className="flex items-center w-full justify-center relative rounded-2xl">
          <ChartCategoryDetail dataChart={price_chart} changePrice={1} />
        </div>
      )
    },
  },
]
