import Button from '@components/elements/Button'
import Question from '@components/fields/Question'
import FormCategory from '@components/forms/FormCategory'
import BaseTable from '@components/modules/BaseTable'
import ICONS from '@configs/icons'
import { ModalContext } from '@contexts/ModalContext'
import { useAppDispatch, useMutationSlice, useQuerySlice } from '@redux/hooks'
import { clearCategory } from '@redux/slices/category'
import {
  fetchListCategory,
  fetchRemoveCategory,
} from '@redux/slices/category/action'
import { useContext, useState } from 'react'

import { columns } from './column'

export const TableCategory = () => {
  const initialParam: TableParams = { page: 1, size: 10 }
  const [params, setParams] = useState(initialParam)
  const { setModal, onClose } = useContext(ModalContext)
  const dispatch = useAppDispatch()

  const { data, meta, loading } = useQuerySlice<Category[], TableParams>({
    clearSlice: clearCategory('list'),
    initial: params,
    key: 'list',
    slice: 'category',
    thunk: fetchListCategory(params),
  })

  const onChangePage = (page: number) => {
    setParams((prev) => ({ ...prev, page }))
  }

  const onChangeRowPerPage = (size: number) => {
    setParams((prev) => ({ ...prev, page: 1, size }))
  }

  const onSearch = (search: string) => {
    if (search !== null) {
      setParams((prev) => ({ ...prev, page: 1, search }))
    }
  }

  const onSuccess = () => {
    onClose()
    setParams({ page: 1, size: 10 })
  }

  const onAdd = () => {
    setModal({
      content: <FormCategory onSuccess={onSuccess} varian="add" />,
      open: true,
      title: 'Tambah Data',
    })
  }

  const onEdit = (value: Category) => {
    setModal({
      content: (
        <FormCategory data={value} onSuccess={onSuccess} varian="edit" />
      ),
      open: true,
      title: 'Ubah Data',
    })
  }

  const onDetail = (value: Category) => {
    setModal({
      content: (
        <FormCategory data={value} onSuccess={onSuccess} varian="detail" />
      ),
      open: true,
      title: 'Detail Data',
    })
  }

  const onDelete = (code: string) => {
    setModal({
      confirmationType: 'delete',
      content: <Question />,
      onConfirm: () => dispatch(fetchRemoveCategory(code)),
      open: true,
      type: 'confirmation',
    })
  }

  useMutationSlice({
    clearSlice: () => dispatch(clearCategory('remove')),
    key: 'remove',
    onSuccess: () => onSuccess(),
    slice: 'category',
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
      columns={columns({
        loading,
        onDelete: (code) => onDelete(code),
        onDetail: (value) => onDetail(value),
        onEdit: (value) => onEdit(value),
      })}
      data={data}
      isLoading={loading}
      meta={meta}
      onChangePage={onChangePage}
      onChangeRowPerPage={onChangeRowPerPage}
      onSearch={onSearch}
      searchValue={params.search}
      showTotal
      title="Daftar Kategori"
    />
  )
}
