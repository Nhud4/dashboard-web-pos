import Button from '@components/elements/Button'
import Spinner from '@components/elements/Spinner'
import Dropdown from '@components/fields/Dropdown'
import TextInput from '@components/fields/TextInput'
import UploadImage from '@components/fields/UploadImage'
import BaseCard from '@components/modules/BaseCard'
import ICONS from '@configs/icons'
import { useQuerySlice } from '@redux/hooks'
import { fetchListCategory } from '@redux/slices/category/action'
import { DELIVERY_TYPE_OPS } from '@utils/constants'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { productResolver } from './validator'

const defaultValue = {
  allocation: DELIVERY_TYPE_OPS[0],
  categoryId: '',
  description: '',
  discount: 0,
  discountType: 'percentage',
  hpp: 0,
  img: '',
  name: '',
  normalPrice: 0,
  stock: 0,
}

const categoryParams = { page: 1, size: 0 }

export const FormProduct = () => {
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
    label: item.name,
    value: item.id,
  }))

  const formValues = useMemo(() => {
    return defaultValue
  }, [defaultValue])

  const { control } = useForm({
    defaultValues: formValues,
    mode: 'onChange',
    resolver: productResolver,
  })

  const formLoad = catLoad
  const isLoading = false
  return (
    <form className="space-y-4">
      <h1 className="text-lg font-semibold">Form Tambah Menu</h1>

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
            isLoading={formLoad}
            label="Stock"
            name="stock"
            placeholder="Stok produk"
          />
          <TextInput
            control={control}
            isLoading={formLoad}
            label="HPP"
            name="hpp"
            placeholder="0"
            prefix="Rp"
          />
          <TextInput
            control={control}
            isLoading={formLoad}
            label="Harga Jual"
            name="normalPrice"
            placeholder="0"
            prefix="Rp"
          />
          <TextInput
            control={control}
            isLoading={formLoad}
            label="Diskon"
            name="discount"
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
