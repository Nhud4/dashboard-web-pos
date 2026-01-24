import FormProduct from '@components/forms/FormProduct'
import Layout from '@components/layout'
import { useQuerySlice } from '@redux/hooks'
import { clearProducts } from '@redux/slices/products'
import { fetchDetailProducts } from '@redux/slices/products/action'
import type React from 'react'
import { useParams } from 'react-router-dom'

export const ProductEdit: React.FC = () => {
  const { id = '' } = useParams()

  const { data, loading } = useQuerySlice<ProductDetail, { id: string }>({
    clearSlice: clearProducts('detail'),
    initial: id,
    key: 'detail',
    slice: 'products',
    thunk: fetchDetailProducts(id),
  })

  return (
    <Layout title="Ubah Produk">
      <section className="page layout overflow-y-auto">
        <FormProduct data={data} dataLoad={loading} id={id} variant="edit" />
      </section>
    </Layout>
  )
}
