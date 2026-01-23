import { basicState, clearReducer, thunkBuilder } from '@redux/utils'
import { createSlice } from '@reduxjs/toolkit'

import {
  fetchAddUser,
  fetchDetailUser,
  fetchEditUser,
  fetchListUser,
  fetchRemoveUser,
} from './action'

interface UsersState {
  list: SliceState<User[]>
  detail: SliceState<User | null>
  add: SliceState<null>
  edit: SliceState<null>
  remove: SliceState<null>
}

const initialState: UsersState = {
  add: { ...basicState, data: null },
  detail: { ...basicState, data: null },
  edit: { ...basicState, data: null },
  list: { ...basicState, data: [] },
  remove: { ...basicState, data: null },
}

export const usersSlice = createSlice({
  extraReducers: (builder) => {
    thunkBuilder({ builder, key: 'list', thunk: fetchListUser })
    thunkBuilder({ builder, key: 'detail', thunk: fetchDetailUser })
    thunkBuilder({ builder, key: 'add', thunk: fetchAddUser })
    thunkBuilder({ builder, key: 'edit', thunk: fetchEditUser })
    thunkBuilder({ builder, key: 'remove', thunk: fetchRemoveUser })
  },
  initialState,
  name: 'users',
  reducers: {
    clearUsers: (state, action) => {
      clearReducer(state, action)
    },
  },
})

export const { clearUsers } = usersSlice.actions

export default usersSlice.reducer
