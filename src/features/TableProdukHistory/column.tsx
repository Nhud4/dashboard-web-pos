import TableCell from '@components/modules/TableCell'
import { type TableColumn } from 'react-data-table-component'

export const columns = (
  loading: boolean
): TableColumn<ProductHistoryData>[] => [
  {
    cell: ({ no }) => (
      <TableCell loading={loading} skeletonWidth={35} value={no?.toString()} />
    ),
    name: 'No',
    width: '50px',
  },
  {
    cell: ({ date }) => (
      <TableCell loading={loading} skeletonWidth={35} value={date} />
    ),
    name: 'Tanggal',
  },
  {
    cell: ({ totalQty }) => (
      <TableCell loading={loading} skeletonWidth={35} value={totalQty} />
    ),
    name: 'Jumlah',
  },
  {
    cell: ({ totalAmount }) => (
      <TableCell loading={loading} skeletonWidth={35} value={totalAmount} />
    ),
    name: 'Pendapatan',
  },
]
