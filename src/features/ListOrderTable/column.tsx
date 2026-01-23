import TableCell from '@components/modules/TableCell'
import ICONS from '@configs/icons'
import { formatIDR } from '@utils/index'
import { type TableColumn } from 'react-data-table-component'
import { Link } from 'react-router-dom'

export const columns = (loading: boolean): TableColumn<TransactionList>[] => [
  {
    cell: ({ no }) => (
      <TableCell loading={loading} skeletonWidth={35} value={no?.toString()} />
    ),
    name: 'No',
    width: '50px',
  },
  {
    cell: ({ transactionDate }) => (
      <TableCell loading={loading} skeletonWidth={35} value={transactionDate} />
    ),
    name: 'Tanggal',
  },
  {
    cell: ({ code }) => (
      <TableCell loading={loading} skeletonWidth={35} value={code} />
    ),
    name: 'ID Pesanan',
  },
  {
    cell: ({ customerName }) => (
      <TableCell loading={loading} skeletonWidth={35} value={customerName} />
    ),
    name: 'Pelanggan',
  },
  {
    cell: ({ bill, id, code }) => (
      <TableCell
        loading={loading}
        skeletonWidth={35}
        value={
          <div className="flex items-center justify-between w-full">
            <p>{formatIDR(bill)}</p>
            <Link to={`/transaksi/detail/${id}?breadcrumb=${code}`}>
              <ICONS.Arrow />
            </Link>
          </div>
        }
      />
    ),
    name: 'Total',
  },
]
