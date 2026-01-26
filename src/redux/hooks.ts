import { ModalContext } from '@contexts/ModalContext'
import { NotifyContext } from '@contexts/NotifyContext'
import { useContext, useEffect } from 'react'
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux'

import type { AppDispatch, RootState } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useQuerySlice = <T, P>({
  slice,
  key,
  clearSlice,
  onSuccess,
  thunk,
  initial,
}: QuerySliceParams<RootState, T>) => {
  const { setNotify } = useContext(NotifyContext)
  const { setModal } = useContext(ModalContext)

  const dispatch = useAppDispatch()
  const sliceState = useAppSelector((state) => {
    const stateObj = state[slice]
    return stateObj[key as keyof typeof stateObj] as unknown as SliceState<T>
  })
  const { error, message, success, data, code } = sliceState

  useEffect(() => {
    if (clearSlice) {
      if (error) {
        if ([401, 403].includes(code)) {
          setModal({
            confirmationType: 'expired',
            content: '',
            open: true,
            type: 'confirmation',
          })
        } else {
          setNotify({
            callback: () => dispatch(clearSlice),
            color: 'error',
            isOpen: true,
            message,
          })
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, message])

  useEffect(() => {
    if (onSuccess) {
      if (success) {
        onSuccess(data)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, data])

  useEffect(() => {
    if (initial) {
      dispatch(thunk)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial])

  return { ...sliceState, refetch: (_args?: P) => dispatch(thunk) }
}

export const useMutationSlice = <T>({
  slice,
  key,
  onSuccess,
  onError,
  clearSlice,
}: MutationSliceParams<RootState, T>) => {
  const { setModal, onClose: onCloseModal } = useContext(ModalContext)
  const { setNotify } = useContext(NotifyContext)

  const sliceState = useAppSelector((state) => {
    const stateObj = state[slice]
    return stateObj[key as keyof typeof stateObj] as unknown as SliceState<T>
  })
  const { error, success, message, data, code } = sliceState

  const customMessage = {
    add: 'Data berhasil ditambahkan',
    edit: 'Data berhasil diperbarui',
    remove: 'Data berhasil dihapus',
  }

  useEffect(() => {
    if (clearSlice) {
      if (success) {
        onCloseModal()
        if (onSuccess) onSuccess(data)
        clearSlice()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, data])

  useEffect(() => {
    if (clearSlice) {
      if (error) {
        if ([401, 403].includes(code)) {
          setModal({
            confirmationType: 'expired',
            content: '',
            open: true,
            type: 'confirmation',
          })
        } else {
          setNotify({
            callback: () => {
              if (onError) onError()
              clearSlice()
            },
            color: error ? 'error' : 'success',
            isOpen: true,
            message: error ? message : customMessage[key],
          })
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, message])

  return { ...sliceState, onCloseModal }
}
