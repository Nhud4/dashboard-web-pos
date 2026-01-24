import Button from '@components/elements/Button'
import Spinner from '@components/elements/Spinner'
import Dropdown from '@components/fields/Dropdown'
import TextInput from '@components/fields/TextInput'
import UploadImage from '@components/fields/UploadImage'
import BaseCard from '@components/modules/BaseCard'
import ICONS from '@configs/icons'
import { useAppDispatch, useMutationSlice, useQuerySlice } from '@redux/hooks'
import { fetchListCategory } from '@redux/slices/category/action'
import { clearProducts } from '@redux/slices/products'
import {
  fetchCreateProduct,
  fetchEditProduct,
} from '@redux/slices/products/action'
import { DELIVERY_TYPE_OPS } from '@utils/constants'
import { toCapitalize } from '@utils/index'
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { productResolver } from './validator'

type Props = {
  id?: string
  variant: 'add' | 'edit'
  data?: ProductDetail
  dataLoad?: boolean
}

const defaultValue = {
  allocation: DELIVERY_TYPE_OPS[0],
  categoryId: null as { label: string; value: string } | null,
  description: '',
  discount: 0,
  hpp: 0,
  img: '',
  name: '',
  normalPrice: 0,
  stock: 0,
}

const categoryParams = { page: 1, size: 0 }

export const FormProduct: React.FC<Props> = ({
  variant,
  id,
  data,
  dataLoad,
}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { data: catData, loading: catLoad } = useQuerySlice<
    Category[],
    TableParams
  >({
    initial: categoryParams,
    key: 'list',
    slice: 'category',
    thunk: fetchListCategory(categoryParams),
  })
  const catOps = catData.map((item) => ({
    label: toCapitalize(item.name),
    value: item.id,
  }))

  const formValues = useMemo(() => {
    if (data) {
      const alo = DELIVERY_TYPE_OPS.filter(
        (item) => item.value === data?.allocation
      )[0]

      const cat = catOps.filter(
        (item) => item.value === `${data?.categoryId}`
      )[0]

      return {
        allocation: data?.allocation ? alo : DELIVERY_TYPE_OPS[0],
        categoryId: cat,
        description: data?.description,
        discount: data?.discount,
        hpp: data?.hpp,
        img: data?.img,
        name: data?.name,
        normalPrice: data?.normalPrice,
        stock: data?.stock,
      }
    }
    return defaultValue
  }, [defaultValue, data, DELIVERY_TYPE_OPS, catOps])

  const { control, handleSubmit, reset } = useForm({
    defaultValues: formValues,
    mode: 'onChange',
    resolver: productResolver,
  })

  useEffect(() => {
    reset(formValues)
  }, [formValues])

  const formData = new FormData()
  const onSubmit = (val: typeof defaultValue) => {
    formData.append('name', val.name)
    formData.append('categoryId', val.categoryId?.value || '')
    formData.append('description', val.description)
    formData.append('normalPrice', `${val.normalPrice}`)
    formData.append('hpp', `${val.hpp}`)
    formData.append('discount', `${val.discount}`)
    formData.append('discountType', 'percentage')
    formData.append('stock', `${val.stock}`)
    formData.append('active', 'true')
    formData.append('allocation', val.allocation.value)
    formData.append('img', val.img)

    if (variant === 'add') {
      dispatch(fetchCreateProduct(formData as unknown as ProductPayload))
    } else {
      dispatch(
        fetchEditProduct({
          code: id as string,
          payload: formData as unknown as ProductPayload,
        })
      )
    }
  }

  const { loading: addLoad } = useMutationSlice({
    clearSlice: () => dispatch(clearProducts('add')),
    key: 'add',
    onSuccess: () => {
      navigate('/produk')
    },
    slice: 'products',
  })

  const { loading: editLoad } = useMutationSlice({
    clearSlice: () => dispatch(clearProducts('edit')),
    key: 'edit',
    onSuccess: () => {
      navigate('/produk')
    },
    slice: 'products',
  })

  const formLoad = catLoad || dataLoad
  const isLoading = addLoad || editLoad

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-lg font-semibold">
        {variant === 'add' ? 'Form Tambah Produk' : 'Form Ubah Produk'}
      </h1>

      <BaseCard>
        <UploadImage
          control={control}
          isLoading={formLoad}
          label="Foto Produk"
          name="img"
        />
      </BaseCard>

      <BaseCard className="space-y-4">
        <h1 className="font-semibold">Informasi Produk</h1>
        <div className="grid grid-cols-3 gap-4">
          <TextInput
            control={control}
            isLoading={formLoad}
            label="Nama"
            name="name"
            placeholder="Nama produk"
          />
          <Dropdown
            control={control}
            isLoading={formLoad}
            label="Kategori"
            name="categoryId"
            options={catOps}
            placeholder="Pilih kategori"
          />
          <Dropdown
            control={control}
            isLoading={formLoad}
            label="Jenis Porduk"
            name="allocation"
            options={DELIVERY_TYPE_OPS}
            placeholder="Pilih jenis produk"
          />
          <TextInput
            control={control}
            integer
            isLoading={formLoad}
            label="Stock"
            name="stock"
            onlyNumber
            placeholder="Stok produk"
          />
          <TextInput
            control={control}
            integer
            isLoading={formLoad}
            label="HPP"
            name="hpp"
            onlyNumber
            placeholder="0"
            prefix="Rp"
          />
          <TextInput
            control={control}
            integer
            isLoading={formLoad}
            label="Harga Jual"
            name="normalPrice"
            onlyNumber
            placeholder="0"
            prefix="Rp"
          />
          <TextInput
            control={control}
            integer
            isLoading={formLoad}
            label="Diskon"
            name="discount"
            onlyNumber
            placeholder="0"
            prefix="%"
          />
        </div>

        <TextInput
          control={control}
          isArea
          isLoading={formLoad}
          label="Deskripsi"
          name="description"
          placeholder="Deskripsi produk"
        />
      </BaseCard>

      <div className="flex items-center col-span-2 ml-auto space-x-2 w-fit pt-2">
        <Button
          className="justify-center w-40"
          onClick={() => {
            window.location.href = '/produk'
          }}
          variant="outline"
        >
          Batal
        </Button>
        {isLoading ? (
          <Button type="submit">
            <Spinner />
            <p>Simpan</p>
          </Button>
        ) : (
          <Button
            className="justify-center w-40"
            leftIcon={<ICONS.Save />}
            type="submit"
          >
            Simpan
          </Button>
        )}
      </div>
    </form>
  )
}
