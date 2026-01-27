import * as services from '@api/sales/sales.api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { generateNoColumn } from '@utils/index'

export const fetchProductHistory = createAsyncThunk(
  'sales/productHistory',
  async (params: ProductHistoryParams, { rejectWithValue }) => {
    try {
      const { data, meta, ...res } = await services.productHistory(params)
      return {
        ...res,
        data: data.map((item, index) => ({
          ...item,
          no: generateNoColumn(meta, index, Number(params.size)),
        })),
        meta,
      }
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)

export const fetchSummarySales = createAsyncThunk(
  'sales/summarySales',
  async (params: SummarySalesParams, { rejectWithValue }) => {
    try {
      const response = await services.summarySales(params)
      return response
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)

export const fetchSummaryYear = createAsyncThunk(
  'sales/summaryYear',
  async (params: SummaryYearsParams, { rejectWithValue }) => {
    try {
      const response = await services.summaryYear(params)
      return response
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)
