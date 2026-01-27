import BaseTable from '@components/modules/BaseTable'
import { useQuerySlice } from '@redux/hooks'
import { clearSales } from '@redux/slices/sales'
import { fetchProductHistory } from '@redux/slices/sales/action'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { columns } from './column'

const initialParams = {
  page: 1,
  size: 10,
}

export const TableProductHistory = () => {
  const { id = '' } = useParams()
  const [params] = useState<ProductHistoryParams>({
    ...initialParams,
    productId: id,
  })

  const { data, meta, loading } = useQuerySlice<
    ProductHistoryData[],
    ProductHistoryParams
  >({
    clearSlice: clearSales('productHistory'),
    initial: params,
    key: 'productHistory',
    slice: 'sales',
    thunk: fetchProductHistory(params),
  })

  return (
    <div>
      <BaseTable
        columns={columns(loading)}
        data={data}
        isLoading={loading}
        meta={meta}
        title="Riwayat Transaksi"
      />
    </div>
  )
}
