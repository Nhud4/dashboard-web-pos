import { basicState, clearReducer, thunkBuilder } from '@redux/utils'
import { createSlice } from '@reduxjs/toolkit'

import {
  fetchProductHistory,
  fetchSummarySales,
  fetchSummaryYear,
} from './action'

interface SalesState {
  productHistory: SliceState<ProductHistoryData[]>
  summarySales: SliceState<SummarySalesData>
  summaryYear: SliceState<SummaryYearsData[]>
}

const initialState: SalesState = {
  productHistory: { ...basicState, data: [] },
  summarySales: { ...basicState, data: {} as SummarySalesData },
  summaryYear: { ...basicState, data: [] },
}

export const salesSlice = createSlice({
  extraReducers: (builder) => {
    thunkBuilder({ builder, key: 'productHistory', thunk: fetchProductHistory })
    thunkBuilder({ builder, key: 'summarySales', thunk: fetchSummarySales })
    thunkBuilder({ builder, key: 'summaryYear', thunk: fetchSummaryYear })
  },
  initialState,
  name: 'sales',
  reducers: {
    clearSales: (state, action) => {
      clearReducer(state, action)
    },
  },
})

export const { clearSales } = salesSlice.actions

export default salesSlice.reducer
