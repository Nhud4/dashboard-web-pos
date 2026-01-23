import { basicState, clearReducer, thunkBuilder } from '@redux/utils'
import { createSlice } from '@reduxjs/toolkit'

import {
  fetchCreateProduct,
  fetchDetailProducts,
  fetchEditProduct,
  fetchListProducts,
  fetchRemoveProduct,
} from './action'

interface ProductsState {
  list: SliceState<ProductList[]>
  detail: SliceState<ProductDetail | null>
  add: SliceState<null>
  edit: SliceState<null>
  remove: SliceState<null>
}

const initialState: ProductsState = {
  add: { ...basicState, data: null },
  detail: { ...basicState, data: null },
  edit: { ...basicState, data: null },
  list: { ...basicState, data: [] },
  remove: { ...basicState, data: null },
}

export const productsSlice = createSlice({
  extraReducers: (builder) => {
    thunkBuilder({ builder, key: 'list', thunk: fetchListProducts })
    thunkBuilder({ builder, key: 'detail', thunk: fetchDetailProducts })
    thunkBuilder({ builder, key: 'add', thunk: fetchCreateProduct })
    thunkBuilder({ builder, key: 'edit', thunk: fetchEditProduct })
    thunkBuilder({ builder, key: 'remove', thunk: fetchRemoveProduct })
  },
  initialState,
  name: 'products',
  reducers: {
    clearProducts: (state, action) => {
      clearReducer(state, action)
    },
  },
})

export const { clearProducts } = productsSlice.actions

export default productsSlice.reducer
