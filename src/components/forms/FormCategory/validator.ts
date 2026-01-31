import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const categorySchema = z.object({
  code: z.any(),
  name: z
    .string()
    .nonempty('Nama kategori tidak boleh kosong')
    .min(3, { message: 'Nama kategori harus lebih dari 3 karakter' }),
  printTarget: z.any(),
  status: z.any(),
  totalProduct: z.any(),
})

export const categoryResolver = zodResolver(categorySchema)
