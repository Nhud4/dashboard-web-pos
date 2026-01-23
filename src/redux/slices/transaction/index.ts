import { basicState, clearReducer, meta, thunkBuilder } from '@redux/utils'
import { createSlice } from '@reduxjs/toolkit'

import { fetchDetailTransaction, fetchListTransaction } from './action'

interface TransactionState {
  list: SliceState<TransactionList[]>
  detail: SliceState<TransactionDetail | null>
}

const initialState: TransactionState = {
  detail: { ...basicState, data: null },
  list: { ...basicState, meta },
}

export const transactionSlice = createSlice({
  extraReducers: (builder) => {
    thunkBuilder({ builder, key: 'list', thunk: fetchListTransaction })
    thunkBuilder({ builder, key: 'detail', thunk: fetchDetailTransaction })
  },
  initialState,
  name: 'transaction',
  reducers: {
    clearTransaction: (state, action) => {
      clearReducer(state, action)
    },
  },
})

export const { clearTransaction } = transactionSlice.actions

export default transactionSlice.reducer
