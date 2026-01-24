import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const addUserSchema = z
  .object({
    active: z.any(),
    code: z.any(),
    confirmPass: z
      .string()
      .nonempty('Konfirmasi kata sandi tidak boleh kosong')
      .min(6, 'Konfirmasi kata sandi minimal 6 karakter'),
    name: z
      .string()
      .nonempty('Nama akun tidak boleh kosong')
      .min(3, { message: 'Nama akun harus lebih dari 3 karakter' }),
    password: z
      .string()
      .nonempty('Kata sandi tidak boleh kosong')
      .min(6, 'Kata sandi minimal 6 karakter'),
    role: z.any(),
    username: z
      .string()
      .nonempty('username tidak boleh kosong')
      .min(4, { message: 'Nama akun harus lebih dari 4 karakter' }),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: 'kata sandi tidak sama',
    path: ['confirmPass'],
  })

const updateUserSchema = z
  .object({
    active: z.any(),
    code: z.any(),
    confirmPass: z.string().optional(),
    name: z
      .string()
      .nonempty('Nama akun tidak boleh kosong')
      .min(3, { message: 'Nama akun harus lebih dari 3 karakter' }),
    password: z.string().optional(),
    role: z.any(),
    username: z
      .string()
      .nonempty('username tidak boleh kosong')
      .min(4, { message: 'Nama akun harus lebih dari 4 karakter' }),
  })
  .refine(
    (data) => {
      if (!data.password && !data.confirmPass) return true
      if (!data.password || !data.confirmPass) return false
      return data.password === data.confirmPass
    },
    {
      message: 'Password dan konfirmasi password tidak sama',
      path: ['confirmPass'],
    }
  )

export const addUserResolver = zodResolver(addUserSchema)
export const updateUserResolver = zodResolver(updateUserSchema)
