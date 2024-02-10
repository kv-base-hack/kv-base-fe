import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement
)

export const ChartCategoryDetail = ({
  dataChart,
  changePrice,
}: {
  dataChart: number[][]
  changePrice: number
}) => {
  const dataLabel = useMemo(() => {
    const label = []
    for (let i = 1; i <= dataChart?.length; i++) {
      label.push(i)
    }
    return label
  }, [dataChart])

  return (
    <div className="h-[40px] w-24">
      <Line
        options={{
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: false,
            },
          },
          maintainAspectRatio: false,
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
            },
          },
          events: [],
        }}
        data={{
          labels: dataLabel,
          datasets: [
            {
              data: dataChart,
              fill: {
                target: 'origin',
              },
              backgroundColor: (context) => {
                const ctx = context.chart.ctx
                const gradient = ctx.createLinearGradient(0, 0, 0, 100)
                gradient.addColorStop(
                  0,
                  changePrice > 0 ? 'rgba(69, 178, 107, 0.1)' : 'rgba(239, 70, 111, 0.1)'
                )
                gradient.addColorStop(
                  1,
                  changePrice > 0 ? 'rgba(69, 178, 107, 0)' : 'rgba(239, 70, 111, 0)'
                )
                return gradient
              },
              borderColor: changePrice > 0 ? '#58BD7D' : '#FF6838',
              borderCapStyle: 'round',
              tension: 0.4,
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointRadius: 0,
              pointHitRadius: 10,
              borderWidth: 2,
            },
          ],
        }}
      />
    </div>
  )
}
