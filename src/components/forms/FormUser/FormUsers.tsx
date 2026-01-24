import Button from '@components/elements/Button'
import Spinner from '@components/elements/Spinner'
import Dropdown from '@components/fields/Dropdown'
import TextInput from '@components/fields/TextInput'
import ICONS from '@configs/icons'
import { ModalContext } from '@contexts/ModalContext'
import { useAppDispatch, useMutationSlice } from '@redux/hooks'
import { clearUsers } from '@redux/slices/users'
import { fetchAddUser, fetchEditUser } from '@redux/slices/users/action'
import { ROLE_OPTIONS, STATUS_OPTIONS } from '@utils/constants'
import type React from 'react'
import { useContext,useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { addUserResolver, updateUserResolver } from './validator'

type Props = {
  data?: User
  varian: 'add' | 'edit' | 'detail'
  onSuccess: () => void
}

type FormData = {
  code: string
  name: string
  role: (typeof ROLE_OPTIONS)[0]
  username: string
  password: string | undefined
  confirmPass: string | undefined
  active: (typeof STATUS_OPTIONS)[0]
}

const defaultValues: FormData = {
  active: STATUS_OPTIONS[0],
  code: '',
  confirmPass: '',
  name: '',
  password: '',
  role: ROLE_OPTIONS[0],
  username: '',
}

export const FormUsers: React.FC<Props> = ({ varian, data, onSuccess }) => {
  const { onClose } = useContext(ModalContext)
  const dispatch = useAppDispatch()
  const isDetail = varian === 'detail'

  const formValues = useMemo(() => {
    if (data) {
      const role = ROLE_OPTIONS.filter((item) => item.value === data.role)[0]
      return {
        active: data?.active ? STATUS_OPTIONS[0] : STATUS_OPTIONS[1],
        code: data.code,
        confirmPass: '',
        name: data.name,
        password: '',
        role,
        username: data.username,
      }
    }
    return defaultValues
  }, [data, defaultValues, ROLE_OPTIONS])

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: formValues,
    mode: 'onChange',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: (varian === 'add' ? addUserResolver : updateUserResolver) as any,
  })

  const onSubmit = (val: FormData) => {
    if (varian === 'add') {
      const payload: CreateUserRequest = {
        active: `${val.active.value}`,
        companyId: 2,
        name: val.name,
        password: val.password as string,
        role: val.role.value,
        username: val.username,
      }
      dispatch(fetchAddUser(payload))
    } else {
      const payload: UpdateUserRequest = {
        active: `${val.active.value}`,
        companyId: 2,
        name: val.name,
        password: val.password || undefined,
        role: val.role.value,
        username: val.username,
      }
      dispatch(fetchEditUser({ code: data?.id as string, payload }))
    }
  }

  const { loading: addLoad } = useMutationSlice({
    clearSlice: () => dispatch(clearUsers('add')),
    key: 'add',
    onSuccess: () => onSuccess(),
    slice: 'users',
  })

  const { loading: editLoad } = useMutationSlice({
    clearSlice: () => dispatch(clearUsers('edit')),
    key: 'edit',
    onSuccess: () => onSuccess(),
    slice: 'users',
  })

  const isLoading = addLoad || editLoad

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        {varian !== 'add' ? (
          <TextInput control={control} disabled label="ID Akun" name="code" />
        ) : null}
        <TextInput
          control={control}
          disabled={isDetail}
          label="Nama Akun"
          name="name"
          placeholder="Nama akun"
        />
        <TextInput
          control={control}
          disabled={isDetail}
          label="Username"
          name="username"
          placeholder="Username"
        />
        <Dropdown
          control={control}
          isDisabled={isDetail}
          label="Role Akses"
          name="role"
          options={ROLE_OPTIONS}
        />
        <Dropdown
          control={control}
          isDisabled={isDetail}
          label="Status"
          name="active"
          options={STATUS_OPTIONS}
        />
        {!isDetail ? (
          <>
            <TextInput
              control={control}
              label="Kata Sandi"
              name="password"
              placeholder="Kata sandi"
              type="password"
            />
            <TextInput
              control={control}
              label="Konfirmasi Kata Sandi"
              name="confirmPass"
              placeholder="Konfirmasi Kata sandi"
              type="password"
            />
          </>
        ) : null}
      </div>

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
