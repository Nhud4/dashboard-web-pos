import Layout from '@components/layout'
import TableCategory from '@features/TableCategory'
import type React from 'react'

export const ProductCategory: React.FC = () => {
  return (
    <Layout title="Kategori Produk">
      <section className="page layout">
        <TableCategory />
      </section>
    </Layout>
  )
}
