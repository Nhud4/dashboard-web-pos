import * as services from '@api/products/products.api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { generateNoColumn } from '@utils/index'

export const fetchListProducts = createAsyncThunk(
  'products/list',
  async (params: ProductParams, { rejectWithValue }) => {
    try {
      const { data, meta, ...res } = await services.listProducts(params)
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

export const fetchDetailProducts = createAsyncThunk(
  'products/detail',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await services.detailProducts(code)
      return response
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)

export const fetchCreateProduct = createAsyncThunk(
  'products/add',
  async (payload: ProductPayload, { rejectWithValue }) => {
    try {
      const response = await services.createProduct(payload)
      return response
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)

export const fetchEditProduct = createAsyncThunk(
  'products/edit',
  async (
    { code, payload }: { code: string; payload: ProductPayload },
    { rejectWithValue }
  ) => {
    try {
      const response = await services.editProduct(code, payload)
      return response
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)

export const fetchRemoveProduct = createAsyncThunk(
  'products/remove',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await services.removeProduct(code)
      return response
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)
