import Badge from '@components/elements/Badge'
import PopUp from '@components/elements/PopupTable'
import TableCell from '@components/modules/TableCell'
import { STATUS_TABLE } from '@utils/constants'
import { clsx } from '@utils/index'
import { type TableColumn } from 'react-data-table-component'

export const columns = (loading: boolean): TableColumn<Category>[] => [
  {
    cell: ({ no }) => (
      <TableCell loading={loading} skeletonWidth={35} value={no?.toString()} />
    ),
    name: 'No',
    width: '70px',
  },
  {
    cell: ({ code }) => (
      <TableCell loading={loading} skeletonWidth={35} value={code} />
    ),
    name: 'ID Kategori',
  },
  {
    cell: ({ name }) => (
      <TableCell loading={loading} skeletonWidth={35} value={name} />
    ),
    name: 'Nama',
  },
  {
    cell: ({ totalProduct }) => (
      <TableCell
        loading={loading}
        skeletonWidth={35}
        value={totalProduct?.toString()}
      />
    ),
    name: 'Jumlah Item',
  },
  {
    cell: ({ status }) => (
      <TableCell
        loading={loading}
        skeletonWidth={35}
        value={
          <PopUp
            onDelete={() => {}}
            onDetail={() => {}}
            onEdit={() => {}}
            value={
              <Badge
                className={clsx([
                  STATUS_TABLE[status as unknown as keyof typeof STATUS_TABLE]
                    ?.style,
                  'w-32 text-center capitalize',
                ])}
              >
                {
                  STATUS_TABLE[status as unknown as keyof typeof STATUS_TABLE]
                    ?.label
                }
              </Badge>
            }
          />
        }
      />
    ),
    name: 'Total',
  },
]
