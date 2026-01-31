import Layout from '@components/layout'
// import BestServiceChart from '@features/BestServiceChart'
import DashboardSummary from '@features/DashboardSummary'
import IncomeChart from '@features/IncomeChart'
import type React from 'react'

import styles from './styles.module.css'

export const Dashboard: React.FC = () => {
  return (
    <Layout title="Dashboard">
      <section className="grid flex-grow grid-cols-2 gap-6 overflow-y-auto layout">
        <DashboardSummary />
        <div className={styles.part1}>
          <IncomeChart />
          {/* <div className={styles.one}>
            <div className={styles.incomeChart}>
              <IncomeChart />
            </div>
            <div className={styles.bestServicesChart}>
              <BestServiceChart />
            </div>
          </div> */}
        </div>
      </section>
    </Layout>
  )
}
