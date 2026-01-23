import TableCell from '@components/modules/TableCell'
import ICONS from '@configs/icons'
import { formatIDR } from '@utils/index'
import { type TableColumn } from 'react-data-table-component'

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
    cell: ({ bill }) => (
      <TableCell
        loading={loading}
        skeletonWidth={35}
        value={
          <div className="flex items-center justify-between w-full">
            <p>{formatIDR(bill)}</p>
            <button>
              <ICONS.Arrow />
            </button>
          </div>
        }
      />
    ),
    name: 'Total',
  },
]
