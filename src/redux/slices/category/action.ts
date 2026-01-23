import * as services from '@api/category/category.api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { generateNoColumn } from '@utils/index'

export const fetchListCategory = createAsyncThunk(
  'category/list',
  async (params: TableParams, { rejectWithValue }) => {
    try {
      const { data, meta, ...res } = await services.listCategory(params)
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

export const fetchDetailCategory = createAsyncThunk(
  'category/detail',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await services.detailCategory(code)
      return response
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)

export const fetchAddCategory = createAsyncThunk(
  'category/add',
  async (payload: CategoryPayload, { rejectWithValue }) => {
    try {
      const response = await services.addCategory(payload)
      return response
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)

export const fetchEditCategory = createAsyncThunk(
  'category/edit',
  async (
    { code, payload }: { code: string; payload: CategoryPayload },
    { rejectWithValue }
  ) => {
    try {
      const response = await services.editCategory(code, payload)
      return response
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)

export const fetchRemoveCategory = createAsyncThunk(
  'category/remove',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await services.removeCategory(code)
      return response
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)
