import Layout from '@components/layout'
import TableProducts from '@features/Tableproducts'
import type React from 'react'

export const Products: React.FC = () => {
  return (
    <Layout title="Produk">
      <section className="page layout">
        <TableProducts />
      </section>
    </Layout>
  )
}
