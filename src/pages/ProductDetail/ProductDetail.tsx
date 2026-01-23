import Layout from '@components/layout'
import TableProducts from '@features/Tableproducts'
import type React from 'react'

export const ProductDetail: React.FC = () => {
  return (
    <Layout title="Detail Produk">
      <section className="page layout">
        <TableProducts />
      </section>
    </Layout>
  )
}
