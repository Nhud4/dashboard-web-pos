import FormProduct from '@components/forms/FormProduct'
import Layout from '@components/layout'
import type React from 'react'

export const ProductAdd: React.FC = () => {
  return (
    <Layout title="Tambah Produk">
      <section className="page layout">
        <FormProduct variant="add" />
      </section>
    </Layout>
  )
}
