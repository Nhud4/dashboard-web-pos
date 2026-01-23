import { basicState, clearReducer, thunkBuilder } from '@redux/utils'
import { createSlice } from '@reduxjs/toolkit'

import {
  fetchAddCategory,
  fetchDetailCategory,
  fetchEditCategory,
  fetchListCategory,
  fetchRemoveCategory,
} from './action'

interface CategoryState {
  list: SliceState<Category[]>
  detail: SliceState<Category | null>
  add: SliceState<null>
  edit: SliceState<null>
  remove: SliceState<null>
}

const initialState: CategoryState = {
  add: { ...basicState, data: null },
  detail: { ...basicState, data: null },
  edit: { ...basicState, data: null },
  list: { ...basicState, data: [] },
  remove: { ...basicState, data: null },
}

export const categorySlice = createSlice({
  extraReducers: (builder) => {
    thunkBuilder({ builder, key: 'list', thunk: fetchListCategory })
    thunkBuilder({ builder, key: 'detail', thunk: fetchDetailCategory })
    thunkBuilder({ builder, key: 'add', thunk: fetchAddCategory })
    thunkBuilder({ builder, key: 'edit', thunk: fetchEditCategory })
    thunkBuilder({ builder, key: 'remove', thunk: fetchRemoveCategory })
  },
  initialState,
  name: 'category',
  reducers: {
    clearCategory: (state, action) => {
      clearReducer(state, action)
    },
  },
})

export const { clearCategory } = categorySlice.actions

export default categorySlice.reducer
