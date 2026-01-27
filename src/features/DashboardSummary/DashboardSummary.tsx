import TotalCard from '@components/modules/TotalCard'
import { useQuerySlice } from '@redux/hooks'
import { fetchSummarySales } from '@redux/slices/sales/action'
import { REVENUE } from '@utils/constants'
import { clsx, formatIDR } from '@utils/index'
import { type HTMLAttributes } from 'react'

import styles from './styles.module.css'

type Props = HTMLAttributes<HTMLUListElement>

export const DashboardSummary: React.FC<Props> = ({ className, ...props }) => {
  const month = new Date().getMonth()
  const params: SummarySalesParams = {
    month: month + 1,
  }

  const { data, loading } = useQuerySlice<SummarySalesData, SummarySalesParams>(
    {
      initial: params,
      key: 'summarySales',
      slice: 'sales',
      thunk: fetchSummarySales(params),
    }
  )

  const isLoading = loading
  const percentage = {
    customer: Math.sign(0),
    revenue: Math.sign(data.revenue.growth),
    transaction: Math.sign(data.transaction.growth),
  }

  const percentageFormat = (number: number) => {
    if (number > 100) {
      const fix = number.toString().substring(0, 2)
      return `${fix} %`
    }

    return `${number} %`
  }

  return (
    <ul {...props} className={clsx([styles.container, className])}>
      <li>
        <TotalCard
          color={REVENUE.revenue.color}
          icon={REVENUE.revenue.icon}
          loading={isLoading}
          name="Pendapatan"
          percentage={percentageFormat(Math.abs(data.revenue.growth))}
          status={percentage.revenue === -1 ? 'danger' : 'success'}
          value={formatIDR(data.revenue.total)}
        />
      </li>
      <li>
        <TotalCard
          color={REVENUE.balance.color}
          customName="Total Transaksi"
          icon={REVENUE.balance.icon}
          loading={isLoading}
          percentage={percentageFormat(Math.abs(data.transaction.growth))}
          status={percentage.transaction === -1 ? 'danger' : 'success'}
          value={`${data.transaction.total}`}
        />
      </li>
      <li>
        <TotalCard
          color={REVENUE.customer.color}
          customName="Total Produk"
          icon={REVENUE.customer.icon}
          loading={isLoading}
          percentage="0"
          status={percentage.customer === -1 ? 'danger' : 'success'}
          value="0"
        />
      </li>
    </ul>
  )
}
