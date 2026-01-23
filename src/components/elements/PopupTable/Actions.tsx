import ICONS from '@configs/icons'

type Props = {
  actions?: Actions[]
  labelStatus?: string[]
  onDelete?: () => void
  onDetail?: () => void
  onEdit?: () => void
  onStatus?: () => void
  status?: 'active' | 'inactive'
}

export default function PopUpActions({
  actions,
  onDelete,
  onDetail,
  onEdit,
  onStatus,
  status,
  labelStatus,
}: Props) {
  return (
    <>
      {actions?.includes('detail') ? (
        <>
          <div>
            <button
              className="flex items-center w-full py-2 text-primary-4"
              onClick={onDetail}
            >
              <ICONS.Eye className="mx-2" />
              Lihat
            </button>
          </div>
          <span className="border-b-[1px] border-solid w-full" />
        </>
      ) : null}
      {actions?.includes('edit') ? (
        <>
          <div>
            <button
              className="flex items-center w-full py-2 text-primary-4"
              onClick={onEdit}
            >
              <ICONS.Edit className="mx-2" />
              Ubah
            </button>
          </div>
          <span className="border-b-[1px] border-solid w-full" />
        </>
      ) : null}
      {actions?.includes('status') ? (
        <>
          <button className="flex items-center w-full py-2" onClick={onStatus}>
            {status === 'active' ? (
              <>
                <ICONS.NonActive className="mx-2" />
                <p className="text-red-600">
                  {labelStatus && labelStatus[1]
                    ? labelStatus[1]
                    : 'Nonaktifkan'}
                </p>
              </>
            ) : (
              <>
                <ICONS.Active className="mx-2" />
                <p className="text-blue-900">
                  {labelStatus && labelStatus[0] ? labelStatus[0] : 'Aktifkan'}
                </p>
              </>
            )}
          </button>
          <span className="border-b-[1px] border-solid w-full" />
        </>
      ) : null}
      {actions?.includes('delete') ? (
        <>
          <div>
            <button
              className="flex items-center w-full py-2 text-primary-4"
              onClick={onDelete}
            >
              <ICONS.Trash className="mx-2 text-red-600" />
              Hapus
            </button>
          </div>
          <span className="border-b-[1px] border-solid w-full" />
        </>
      ) : null}
    </>
  )
}
