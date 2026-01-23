import TotalCard from '@components/modules/TotalCard'
import { REVENUE } from '@utils/constants'
import { clsx, formatIDR } from '@utils/index'
import { type HTMLAttributes } from 'react'

import styles from './styles.module.css'

type Props = HTMLAttributes<HTMLUListElement>

export const DashboardSummary: React.FC<Props> = ({ className, ...props }) => {
  const isLoading = false
  const percentage = {
    customer: Math.sign(0),
    driver: Math.sign(0),
    merchant: Math.sign(0),
    revenue: Math.sign(0),
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
          percentage={percentageFormat(Math.abs(0))}
          status={percentage.revenue === -1 ? 'danger' : 'success'}
          value={formatIDR(0)}
        />
      </li>
      <li>
        <TotalCard
          color={REVENUE.balance.color}
          customName="Saldo Pihak Ketiga"
          icon={REVENUE.balance.icon}
          loading={isLoading}
          percentage="0"
          status={percentage.driver === -1 ? 'danger' : 'success'}
          value="0"
        />
      </li>
      <li>
        <TotalCard
          color={REVENUE.customer.color}
          icon={REVENUE.customer.icon}
          loading={isLoading}
          name="Customer"
          percentage="0"
          status={percentage.customer === -1 ? 'danger' : 'success'}
          value="0"
        />
      </li>
      <li>
        <TotalCard
          color={REVENUE.merchant.color}
          icon={REVENUE.merchant.icon}
          loading={isLoading}
          name="Merchant"
          percentage="0"
          status={percentage.merchant === -1 ? 'danger' : 'success'}
          value="0"
        />
      </li>
    </ul>
  )
}
