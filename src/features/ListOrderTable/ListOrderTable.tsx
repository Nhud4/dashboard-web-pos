import BaseTable from '@components/modules/BaseTable'
import { useQuerySlice } from '@redux/hooks'
import { clearTransaction } from '@redux/slices/transaction'
import { fetchListTransaction } from '@redux/slices/transaction/action'
import { useState } from 'react'

import { columns } from './column'

export const ListOrderTable = () => {
  const initialParams: TransactionParams = {
    page: 1,
    size: 10,
  }

  const [params, setParams] = useState(initialParams)

  const { data, meta, loading } = useQuerySlice<
    TransactionList[],
    TransactionParams
  >({
    clearSlice: clearTransaction('list'),
    initial: params,
    key: 'list',
    slice: 'transaction',
    thunk: fetchListTransaction(params),
  })

  const onChangePage = (page: number) => {
    setParams((prev) => ({ ...prev, page }))
  }

  const onChangeRowPerPage = (size: number) => {
    setParams((prev) => ({ ...prev, page: 1, size }))
  }

  return (
    <BaseTable
      columns={columns(loading)}
      data={data}
      isLoading={loading}
      meta={meta}
      onChangePage={onChangePage}
      onChangeRowPerPage={onChangeRowPerPage}
      showTotal
      title="Daftar Transaksi"
    />
  )
}
