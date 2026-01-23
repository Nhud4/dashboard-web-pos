import Button from '@components/elements/Button'
import BaseTable from '@components/modules/BaseTable'
import ICONS from '@configs/icons'
import { useQuerySlice } from '@redux/hooks'
import { clearProducts } from '@redux/slices/products'
import { fetchListProducts } from '@redux/slices/products/action'
import { useState } from 'react'

import { columns } from './column'

export const TableProducts = () => {
  const initialParam: ProductParams = { page: 1, size: 10 }
  const [params, setParams] = useState(initialParam)

  const { data, meta, loading } = useQuerySlice<ProductList[], ProductParams>({
    clearSlice: clearProducts('list'),
    initial: params,
    key: 'list',
    slice: 'products',
    thunk: fetchListProducts(params),
  })

  const onChangePage = (page: number) => {
    setParams((prev) => ({ ...prev, page }))
  }

  const onChangeRowPerPage = (size: number) => {
    setParams((prev) => ({ ...prev, page: 1, size }))
  }

  const onSearch = (search: string) => {
    if (search !== null) {
      setParams((prev) => ({ ...prev, page: 1, search }))
    }
  }
  return (
    <BaseTable
      actionComponent={
        <Button
          leftIcon={<ICONS.Plus height={15} width={15} />}
          onClick={() => (window.location.href = '/produk/add')}
        >
          Tambah Data
        </Button>
      }
      columns={columns(loading)}
      data={data}
      meta={meta}
      onChangePage={onChangePage}
      onChangeRowPerPage={onChangeRowPerPage}
      onSearch={onSearch}
      searchValue={params.search}
      showTotal
      title="Daftar Produk"
    />
  )
}
