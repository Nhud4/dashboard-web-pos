import BarChart from '@components/modules/BarChart'
import { useQuerySlice } from '@redux/hooks'
import { clearSales } from '@redux/slices/sales'
import { fetchSummaryYear } from '@redux/slices/sales/action'
import { baseChartOptions, labels } from '@utils/chart'
import { DASHBOARD_OPTION } from '@utils/constants'
import { type ChartData, type ChartOptions } from 'chart.js'
import { useState } from 'react'
import Select from 'react-select'

export const IncomeChart: React.FC = (): React.ReactElement => {
  const [params, setParams] = useState('thisYear')
  const year = new Date().getFullYear()

  const { data: summary } = useQuerySlice<
    SummaryYearsData[],
    SummaryYearsParams
  >({
    clearSlice: clearSales('summaryYear'),
    initial: year,
    key: 'summaryYear',
    slice: 'sales',
    thunk: fetchSummaryYear({ year }),
  })

  const data: ChartData<'bar', number[], string> = {
    datasets: [
      {
        backgroundColor: '#EA7C69',
        barPercentage: 0.5,
        borderRadius: 10,
        borderSkipped: false,
        data: summary.map((item) => item.revenue),
        label: 'Jumlah IDR',
      },
    ],
    labels: labels.years,
  }

  const option: ChartOptions<'bar'> = {
    plugins: {
      ...baseChartOptions.plugins,
      tooltip: {
        backgroundColor: '#fff',
        bodyAlign: 'center',
        bodyColor: '#1C627F',
        borderColor: '#E5E5E5',
        borderWidth: 1,
        callbacks: {
          label: (item) => {
            return [
              `Rp ${item.formattedValue}`,
              `${item.label} ${new Date().getFullYear()}`,
            ]
          },
          title: () => {
            return 'Pendapatan'
          },
        },
        caretPadding: 8,
        displayColors: false,
        titleAlign: 'center',
        titleColor: '#1C627F',
        yAlign: 'bottom',
      },
    },
  }

  return (
    <BarChart
      actionComponent={
        <div className="w-40">
          <Select
            defaultValue={DASHBOARD_OPTION.income[0]}
            isSearchable={false}
            onChange={(ops) => {
              setParams(ops === null ? '' : ops.value)
            }}
            options={DASHBOARD_OPTION.income}
          />
        </div>
      }
      chartData={data}
      className="xl:mt-5"
      options={option}
      subtitle={`Januari-Desember ${params === 'thisYear' ? year : year - 1}`}
      title="Jumlah Pendapatan"
    />
  )
}
