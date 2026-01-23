import * as services from '@api/users/users.api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { generateNoColumn } from '@utils/index'

export const fetchListUser = createAsyncThunk(
  'users/list',
  async (params: TableParams, { rejectWithValue }) => {
    try {
      const { data, meta, ...res } = await services.listUser(params)
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

export const fetchDetailUser = createAsyncThunk(
  'users/detail',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await services.detailUser(code)
      return response
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)

export const fetchAddUser = createAsyncThunk(
  'users/add',
  async (payload: CreateUserRequest, { rejectWithValue }) => {
    try {
      const response = await services.addUser(payload)
      return response
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)

export const fetchEditUser = createAsyncThunk(
  'users/edit',
  async (
    { code, payload }: { code: string; payload: UpdateUserRequest },
    { rejectWithValue }
  ) => {
    try {
      const response = await services.editUser(code, payload)
      return response
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)

export const fetchRemoveUser = createAsyncThunk(
  'users/remove',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await services.removeUser(code)
      return response
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)
