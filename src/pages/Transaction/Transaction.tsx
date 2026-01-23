import Layout from '@components/layout'
import ListOrderTable from '@features/ListOrderTable'
import type React from 'react'

export const Transaction: React.FC = () => {
  return (
    <Layout title="Transaksi">
      <section className="page layout">
        <ListOrderTable />
      </section>
    </Layout>
  )
}
