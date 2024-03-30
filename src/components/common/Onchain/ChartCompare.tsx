/* eslint-disable react-hooks/exhaustive-deps */
import { chainAtom } from '@/atom/chain'
import { useGetPriceWithTransferQuery } from '@/query/token-explorer/getPriceWithTransfer'
import { useParams } from '@tanstack/react-router'
import * as echarts from 'echarts'
import { useAtomValue } from 'jotai'
import numeral from 'numeral'
import { useEffect } from 'react'

export const ChartCompare = () => {
  const params: { token: string } = useParams({ strict: false })
  const CHAIN = useAtomValue(chainAtom)
  const priceWithTransferQuery = useGetPriceWithTransferQuery({
    address: params?.token,
    chain: CHAIN,
  })
  const priceWithTransferData = priceWithTransferQuery.data?.data?.price_with_transfer || {}

  const dates: string[] = []
  const deposits: number[] = []
  const withdraws: number[] = []
  const prices: number[] = []

  // Duyệt qua dictionary và thêm dữ liệu vào các mảng tương ứng
  for (const date in priceWithTransferData) {
    dates.push(priceWithTransferData[date].date)
    deposits.push(priceWithTransferData[date].deposit)
    withdraws.push(priceWithTransferData[date].withdraw)
    prices.push(priceWithTransferData[date].price)
  }

  useEffect(() => {
    const chartDom = document.getElementById('chart-token-explore')

    const myChart = echarts.init(chartDom)
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#333',
          },
        },
      },
      color: ['#3AC89F', '#FF6E76', '#4992FF'],
      grid: {
        top: '18%',
        bottom: '10%',
        left: '8%',
        right: '8%',
      },
      toolbox: {
        feature: {
          dataView: { show: false, readOnly: false },
          magicType: { show: false, type: ['line', 'bar'] },
          restore: { show: false },
          saveAsImage: { show: false },
        },
      },
      legend: {
        data: ['Deposit', 'Withdraw', 'Price'],
      },
      xAxis: [
        {
          type: 'category',
          data: dates,
          axisPointer: {
            type: 'shadow',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Deposit',
          min: 0,
          max: Math.floor(Math.max(...deposits)),
          interval: Math.floor(Math.max(...deposits)) / 5,
          axisLabel: {
            formatter: '{value}',
          },
        },
        {
          type: 'value',
          name: 'Withdraw',
          min: 0,
          max: Math.floor(Math.max(...withdraws)),
          interval: Math.floor(Math.max(...withdraws)) / 5,
          axisLabel: {
            formatter: '{value}',
          },
        },
      ],
      series: [
        {
          name: '',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value: any) {
              return numeral(value).format('0,0.[00]$')
            },
          },
          data: deposits,
        },
        {
          name: '',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value: any) {
              return numeral(value).format('0,0.[00]$')
            },
          },
          data: withdraws,
        },
        {
          name: '',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value: any) {
              return numeral(value).format('0,0.[00]$')
            },
          },
          data: prices,
        },
      ],
    }
    option && myChart.setOption(option)
  }, [dates, deposits, prices, withdraws])

  return <div id="chart-token-explore" className="min-h-[275px] w-full" />
}
