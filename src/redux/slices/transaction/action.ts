import * as services from '@api/transactions/transaction.api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { generateNoColumn } from '@utils/index'

export const fetchListTransaction = createAsyncThunk(
  'transaction/list',
  async (params: TransactionParams, { rejectWithValue }) => {
    try {
      const { data, meta, ...res } = await services.listTransaction(params)
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

export const fetchDetailTransaction = createAsyncThunk(
  'transaction/detail',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await services.detailTransaction(code)
      return response
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)
