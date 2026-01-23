import Button from '@components/elements/Button'
import Spinner from '@components/elements/Spinner'
import Dropdown from '@components/fields/Dropdown'
import TextInput from '@components/fields/TextInput'
import ICONS from '@configs/icons'
import { ModalContext } from '@contexts/ModalContext'
import { useAppDispatch, useMutationSlice } from '@redux/hooks'
import { clearCategory } from '@redux/slices/category'
import {
  fetchAddCategory,
  fetchEditCategory,
} from '@redux/slices/category/action'
import { STATUS_OPTIONS } from '@utils/constants'
import type React from 'react'
import { useContext, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { categoryResolver } from './validator'

type Props = {
  varian: 'add' | 'edit' | 'detail'
  onSuccess: () => void
  data?: Category
}

const defaultValue = {
  code: '',
  name: '',
  status: STATUS_OPTIONS[0],
  totalProduct: '',
}

export const FormCategory: React.FC<Props> = ({ varian, onSuccess, data }) => {
  const isDetail = varian === 'detail'
  const dispatch = useAppDispatch()
  const { onClose } = useContext(ModalContext)

  const formValues = useMemo(() => {
    if (data) {
      return {
        code: data.code,
        name: data.name,
        status: data.status ? STATUS_OPTIONS[0] : STATUS_OPTIONS[1],
        totalProduct: data.totalProduct,
      }
    }
    return defaultValue
  }, [data, defaultValue])

  const { control, handleSubmit } = useForm({
    defaultValues: formValues,
    mode: 'onChange',
    resolver: categoryResolver,
  })

  const onSubmit = (val: typeof defaultValue) => {
    const payload: CategoryPayload = {
      name: val.name,
      status: `${val.status.value}`,
    }

    if (varian === 'add') {
      dispatch(fetchAddCategory(payload))
    } else {
      dispatch(fetchEditCategory({ code: data?.id as string, payload }))
    }
  }

  const { loading: addLoad } = useMutationSlice({
    clearSlice: () => dispatch(clearCategory('add')),
    key: 'add',
    onSuccess: () => onSuccess(),
    slice: 'category',
  })

  const { loading: editLoad } = useMutationSlice({
    clearSlice: () => dispatch(clearCategory('edit')),
    key: 'edit',
    onSuccess: () => onSuccess(),
    slice: 'category',
  })

  const isLoading = addLoad || editLoad

  return (
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      {varian !== 'add' ? (
        <TextInput
          control={control}
          disabled
          label="ID Kategori"
          name="code"
          placeholder="ID Kategori"
        />
      ) : null}
      <TextInput
        control={control}
        disabled={isDetail}
        label="Nama"
        name="name"
        placeholder="Nama kategori"
      />
      {varian !== 'add' ? (
        <TextInput
          control={control}
          disabled
          label="Total Produk"
          name="totalProduct"
          placeholder="0"
        />
      ) : null}
      <Dropdown
        control={control}
        isDisabled={isDetail}
        label="Status"
        name="status"
        options={STATUS_OPTIONS}
      />
      {!isDetail ? (
        <div className="flex items-center col-span-2 ml-auto space-x-2 w-fit pt-2">
          <Button onClick={onClose} variant="outline">
            Tutup
          </Button>
          {isLoading ? (
            <Button type="submit">
              <Spinner />
              <p>Simpan</p>
            </Button>
          ) : (
            <Button leftIcon={<ICONS.Save />} type="submit">
              Simpan
            </Button>
          )}
        </div>
      ) : null}
    </form>
  )
}
