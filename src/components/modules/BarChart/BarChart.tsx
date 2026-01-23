import BaseCard from '@components/modules/BaseCard'
import ICONS from '@configs/icons'
import { baseChartOptions } from '@utils/chart'
import { clsx } from '@utils/index'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  type ChartData,
  type ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import React, { type HTMLProps } from 'react'
import { Bar } from 'react-chartjs-2'

import styles from './styles.module.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const chartOptions = {
  ...baseChartOptions,
  plugins: {
    ...baseChartOptions.plugins,
    tooltip: {
      backgroundColor: '#247BA0',
      bodyAlign: 'center',
      callbacks: {
        label: (item) => {
          return [
            `Rp ${item.formattedValue}`,
            `${item.label} ${new Date().getFullYear()}`,
          ]
        },
        title: (item) => {
          return item[0].dataset.label || 'Pendapatan'
        },
      },
      caretPadding: 8,
      displayColors: false,
      titleAlign: 'center',
      yAlign: 'bottom',
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        borderDash: [15],
      },
    },
  },
} as ChartOptions<'bar'>

type Props = HTMLProps<HTMLDivElement> & {
  actionComponent?: React.ReactElement
  chartData: ChartData<'bar', number[], string>
  legend?: React.ReactElement
  options?: ChartOptions<'bar'>
  subtitle?: string
  title?: string
}

export const BarChart: React.FC<Props> = React.memo(
  ({
    actionComponent,
    chartData,
    options,
    subtitle = 'Subtitle',
    title = 'Bar Chart',
    legend,
    ...props
  }): React.ReactElement => {
    return (
      <BaseCard
        bgColorIcon="bg-orange"
        icon={<ICONS.ChartSquare style={{ color: '#fff' }} />}
        responsive
        subtitle={subtitle}
        title={title}
        topRightComponent={actionComponent}
      >
        {legend}
        <div {...props} className={clsx([styles.chart, props.className])}>
          <Bar data={chartData} options={{ ...chartOptions, ...options }} />
        </div>
      </BaseCard>
    )
  }
)
