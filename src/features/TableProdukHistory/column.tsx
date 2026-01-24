import TableCell from '@components/modules/TableCell'
import { toCapitalize } from '@utils/index'
import { type TableColumn } from 'react-data-table-component'

export const columns = (loading: boolean): TableColumn<ProductList>[] => [
  {
    cell: ({ no }) => (
      <TableCell loading={loading} skeletonWidth={35} value={no?.toString()} />
    ),
    name: 'No',
    width: '50px',
  },
  {
    cell: ({ code }) => (
      <TableCell loading={loading} skeletonWidth={35} value={code} />
    ),
    name: 'Tanggal',
  },
  {
    cell: ({ name }) => (
      <TableCell
        loading={loading}
        skeletonWidth={35}
        value={toCapitalize(name)}
      />
    ),
    name: 'Total Transaksi',
  },
  {
    cell: ({ category }) => (
      <TableCell
        loading={loading}
        skeletonWidth={35}
        value={toCapitalize(category?.name)}
      />
    ),
    name: 'Pendapatan',
  },
]
