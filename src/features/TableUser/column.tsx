import Badge from '@components/elements/Badge'
import PopUp from '@components/elements/PopupTable'
import TableCell from '@components/modules/TableCell'
import { ROLE_LIST,STATUS_TABLE } from '@utils/constants'
import { clsx, toCapitalize } from '@utils/index'
import { type TableColumn } from 'react-data-table-component'

type Props = {
  loading: boolean
  onDetail: (value: User) => void
  onEdit: (value: User) => void
  onDelete: (code: string) => void
}

export const column = ({
  loading,
  onDelete,
  onDetail,
  onEdit,
}: Props): TableColumn<User>[] => [
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
    name: 'ID Akun',
  },
  {
    cell: ({ name }) => (
      <TableCell
        loading={loading}
        skeletonWidth={35}
        value={toCapitalize(name)}
      />
    ),
    name: 'Nama Akun',
  },
  {
    cell: ({ role }) => (
      <TableCell
        loading={loading}
        skeletonWidth={35}
        value={toCapitalize(ROLE_LIST[role as keyof typeof ROLE_LIST])}
      />
    ),
    name: 'Role Akses',
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
                    val?.active as unknown as keyof typeof STATUS_TABLE
                  ]?.style,
                  'w-24 text-center capitalize',
                ])}
              >
                {
                  STATUS_TABLE[
                    val?.active as unknown as keyof typeof STATUS_TABLE
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
