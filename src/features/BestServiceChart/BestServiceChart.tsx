import DoughnutChart from '@components/modules/DoughnutChart'
import { DASHBOARD_OPTION } from '@utils/constants'
import { useMediaQuery, useWindowWidth } from '@utils/hooks'
import { formatIDR } from '@utils/index'
import { type ChartData } from 'chart.js'
import { useState } from 'react'
import Select from 'react-select'

export const BestServiceChart: React.FC = (): React.ReactElement => {
  const matches = useMediaQuery('(max-width: 1200px)')
  const innerWidth = useWindowWidth()

  const [filter, setFilter] = useState('month')

  const detail = [
    {
      color: '#FEB558',
      income: 150000,
      name: 'Makanan',
    },
    {
      color: '#237B9F',
      income: 200000,
      name: 'Minuman',
    },
    {
      color: '#FF7555',
      income: 50000,
      name: 'Cemilan',
    },
  ]

  const data: ChartData<'doughnut', number[], string> = {
    datasets: [
      {
        backgroundColor: detail.map((item) => item.color),
        borderWidth: 4,
        data: detail.map((item) => item.income),
        label: '# of Votes',
      },
    ],
    labels: ['Kuliner', 'Event', 'Sembako', 'PPOB'],
  }

  const selectedFilter = DASHBOARD_OPTION.service.filter(
    (item) => item.value === filter
  )

  return (
    <DoughnutChart
      actionComponent={
        <Select
          defaultValue={selectedFilter}
          isSearchable={false}
          onChange={(ops) => {
            setFilter(ops === null ? '' : ops.value)
          }}
          options={DASHBOARD_OPTION.service}
        />
      }
      data={data}
      detailComponent={
        <ul className="grid grid-cols-2 gap-4">
          {detail.map((item) => {
            return (
              <li
                className="flex flex-col items-center justify-center p-4 border rounded-lg"
                key={item.name}
              >
                <p className="text-lg font-semibold text-gray-90">
                  {formatIDR(item.income)}
                </p>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <p className="text-sm text-gray-60">{item.name}</p>
                </div>
              </li>
            )
          })}
        </ul>
      }
      horizontal={innerWidth >= 768 ? matches : false}
      title="Kategori Terlaris"
    />
  )
}
