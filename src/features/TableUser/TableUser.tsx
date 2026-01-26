import Button from '@components/elements/Button'
import Question from '@components/fields/Question'
import FormUsers from '@components/forms/FormUser'
import BaseTable from '@components/modules/BaseTable'
import ICONS from '@configs/icons'
import { ModalContext } from '@contexts/ModalContext'
import { useAppDispatch, useMutationSlice, useQuerySlice } from '@redux/hooks'
import { clearUsers } from '@redux/slices/users'
import { fetchListUser, fetchRemoveUser } from '@redux/slices/users/action'
import { useContext, useState } from 'react'

import { column } from './column'

const initialParam = { page: 1, size: 10 }

export const TableUser = () => {
  const { setModal, onClose } = useContext(ModalContext)
  const [params, setParams] = useState(initialParam)
  const dispatch = useAppDispatch()

  const { data, meta, loading } = useQuerySlice<User[], TableParams>({
    clearSlice: clearUsers('list'),
    initial: params,
    key: 'list',
    slice: 'users',
    thunk: fetchListUser(params),
  })

  const onChangePage = (page: number) => {
    setParams((prev) => ({ ...prev, page }))
  }

  const onChangeRowPerPage = (size: number) => {
    setParams((prev) => ({ ...prev, page: 1, size }))
  }

  const onSuccess = () => {
    onClose()
    setParams({ page: 1, size: 10 })
  }

  const onAdd = () => {
    setModal({
      content: <FormUsers onSuccess={onSuccess} varian="add" />,
      open: true,
      title: 'Tambah Akun',
    })
  }

  const onEdit = (val: User) => {
    setModal({
      content: <FormUsers data={val} onSuccess={onSuccess} varian="edit" />,
      open: true,
      title: 'Ubah Akun',
    })
  }

  const onDetail = (val: User) => {
    setModal({
      content: <FormUsers data={val} onSuccess={onSuccess} varian="detail" />,
      open: true,
      title: 'Ubah Akun',
    })
  }

  const onDelete = (code: string) => {
    setModal({
      confirmationType: 'delete',
      content: <Question />,
      onConfirm: () => dispatch(fetchRemoveUser(code)),
      open: true,
      type: 'confirmation',
    })
  }

  useMutationSlice({
    clearSlice: () => dispatch(clearUsers('remove')),
    key: 'remove',
    onError: () => {
      onClose()
    },
    onSuccess: () => onSuccess(),
    slice: 'users',
  })

  return (
    <BaseTable
      actionComponent={
        <Button
          leftIcon={<ICONS.Plus height={18} width={18} />}
          onClick={onAdd}
        >
          Tambah Data
        </Button>
      }
      columns={column({
        loading,
        onDelete: (code) => onDelete(code),
        onDetail: (val) => onDetail(val),
        onEdit: (val) => onEdit(val),
      })}
      data={data}
      isLoading={loading}
      meta={meta}
      onChangePage={onChangePage}
      onChangeRowPerPage={onChangeRowPerPage}
      title="Daftar Akun"
    />
  )
}
