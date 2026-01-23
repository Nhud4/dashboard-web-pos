import BaseCard from '@components/modules/BaseCard'
import { baseChartOptions } from '@utils/chart'
import {
  ArcElement,
  Chart as ChartJS,
  type ChartData,
  type ChartOptions,
  Legend,
  Tooltip,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

import styles from './styles.module.css'

ChartJS.register(ArcElement, Tooltip, Legend)

delete baseChartOptions.scales
const chartOptions = {
  ...baseChartOptions,
  cutout: '75%',
  plugins: {
    ...baseChartOptions.plugins,
    tooltip: {
      backgroundColor: '#fff',
      bodyAlign: 'center',
      bodyColor: '#1C627F',
      bodyFontSize: 12,
      borderColor: '#E5E5E5',
      borderWidth: 1,
      callbacks: {
        label: (item) => {
          const { dataset } = item
          const total = dataset.data.reduce((acc, val) => acc + val, 0)
          const percentage = `${Math.round((item.parsed / total) * 100)}%`

          return `${item.formattedValue} (${percentage})`
        },
        title: (item) => {
          return item[0].label
        },
      },
      displayColors: false,
      enabled: true,
      titleAlign: 'center',
      titleColor: '#1C627F',
      titleFontSize: 14,
    },
  },
} as ChartOptions<'doughnut'>

type Props = {
  actionComponent?: React.ReactElement
  data: ChartData<'doughnut', number[], string>
  detailComponent?: React.ReactElement
  readonly horizontal?: boolean
  isCustom?: boolean
  options?: ChartOptions<'doughnut'>
  subtitle?: string
  title?: string
}

export const DoughnutChart: React.FC<Props> = ({
  actionComponent,
  data,
  detailComponent,
  options,
  subtitle,
  title = 'Doughnut Chart',
  horizontal,
  isCustom,
}): React.ReactElement => {
  if (isCustom) {
    return <Doughnut data={data} options={{ ...chartOptions, ...options }} />
  }

  return (
    <BaseCard
      subtitle={subtitle}
      title={title}
      topRightComponent={actionComponent}
    >
      <div className={`mt-[-1.35rem] ${horizontal && styles.horizontal}`}>
        <div className="h-56">
          <Doughnut data={data} options={{ ...chartOptions, ...options }} />
        </div>
        {detailComponent && <div className="mt-6">{detailComponent}</div>}
      </div>
    </BaseCard>
  )
}
