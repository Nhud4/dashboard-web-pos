import Badge from '@components/elements/Badge'
import PopUp from '@components/elements/PopupTable'
import TableCell from '@components/modules/TableCell'
import { STATUS_TABLE } from '@utils/constants'
import { clsx, formatIDR } from '@utils/index'
import { toCapitalize } from '@utils/index'
import { type TableColumn } from 'react-data-table-component'

export const columns = (
  loading: boolean,
  onDelete: (code: string) => void
): TableColumn<ProductList>[] => [
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
    name: 'ID Porduk',
  },
  {
    cell: ({ name }) => (
      <TableCell
        loading={loading}
        skeletonWidth={35}
        value={toCapitalize(name)}
      />
    ),
    name: 'Nama',
  },
  {
    cell: ({ category }) => (
      <TableCell
        loading={loading}
        skeletonWidth={35}
        value={toCapitalize(category?.name)}
      />
    ),
    name: 'Kategori',
  },
  {
    cell: ({ stock }) => (
      <TableCell
        loading={loading}
        skeletonWidth={35}
        value={stock?.toString()}
      />
    ),
    name: 'Stok',
  },
  {
    cell: ({ price }) => (
      <TableCell
        loading={loading}
        skeletonWidth={35}
        value={formatIDR(price || 0)}
      />
    ),
    name: 'Harga',
  },
  {
    cell: ({ discount }) => (
      <TableCell loading={loading} skeletonWidth={35} value={`${discount}%`} />
    ),
    name: 'Diskon',
  },
  {
    cell: ({ available, id, code }) => (
      <TableCell
        loading={loading}
        skeletonWidth={35}
        value={
          <PopUp
            actions={['delete', 'detail', 'edit']}
            onDelete={() => onDelete(`${id}`)}
            onDetail={() => {
              window.location.href = `/produk/detail/${id}?breadcrumb=${code}`
            }}
            onEdit={() => {
              window.location.href = `/produk/edit/${id}?breadcrumb=${code}`
            }}
            value={
              <Badge
                className={clsx([
                  STATUS_TABLE[
                    available as unknown as keyof typeof STATUS_TABLE
                  ]?.style,
                  'w-24 text-center capitalize',
                ])}
              >
                {available ? 'Ya' : 'Tidak'}
              </Badge>
            }
          />
        }
      />
    ),
    name: 'Tersedia',
    width: '200px',
  },
]
