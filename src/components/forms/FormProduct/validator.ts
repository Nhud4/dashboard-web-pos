import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const productSchema = z.object({
  allocation: z.any(),
  categoryId: z.any(),
  description: z.string(),
  discount: z.number(),
  hpp: z.number().positive('HPP harus lebih dari 0'),
  img: z.any(),
  name: z
    .string()
    .nonempty('Nama produk tidak boleh kosong')
    .min(3, { message: 'Nama produk harus lebih dari 3 karakter' }),
  normalPrice: z.number().positive('Harga harus lebih dari 0'),
  stock: z.number().min(1, { message: 'Stok harus lebih dari 1' }),
})

export const productResolver = zodResolver(productSchema)
