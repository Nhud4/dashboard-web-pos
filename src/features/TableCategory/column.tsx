import Badge from '@components/elements/Badge'
import PopUp from '@components/elements/PopupTable'
import TableCell from '@components/modules/TableCell'
import { STATUS_TABLE } from '@utils/constants'
import { clsx } from '@utils/index'
import { toCapitalize } from '@utils/index'
import { type TableColumn } from 'react-data-table-component'

type Props = {
  loading: boolean
  onDelete: (code: string) => void
  onDetail: (data: Category) => void
  onEdit: (data: Category) => void
}

export const columns = ({
  loading,
  onDelete,
  onDetail,
  onEdit,
}: Props): TableColumn<Category>[] => [
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
      <TableCell
        loading={loading}
        skeletonWidth={35}
        value={toCapitalize(name)}
      />
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
    name: 'Jumlah Produk',
  },
  {
    cell: (val) => (
      <TableCell
        loading={loading}
        skeletonWidth={35}
        value={
          <PopUp
            actions={['detail', 'edit', 'delete']}
            onDelete={() => onDelete(val.id)}
            onDetail={() => onDetail(val)}
            onEdit={() => onEdit(val)}
            value={
              <Badge
                className={clsx([
                  STATUS_TABLE[
                    val?.status as unknown as keyof typeof STATUS_TABLE
                  ]?.style,
                  'w-32 text-center capitalize',
                ])}
              >
                {
                  STATUS_TABLE[
                    val?.status as unknown as keyof typeof STATUS_TABLE
                  ]?.label
                }
              </Badge>
            }
          />
        }
      />
    ),
    name: 'Status',
  },
]
