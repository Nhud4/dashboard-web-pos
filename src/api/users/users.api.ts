import * as req from '@utils/httpRequest'

const endpoints = {
  auth: '/auth/login',
  users: '/users',
}

export const login = async (payload: LoginRequest) => {
  const data = await req.basicPost<ApiResponse<LoginResponse>>(
    endpoints.auth,
    payload
  )
  return data
}

export const listUser = async (params: TableParams) => {
  const data = await req.get<ApiResponse<User[]>>(endpoints.users, params)
  return data
}

export const detailUser = async (code: string) => {
  const data = await req.get<ApiResponse<User>>(`${endpoints.users}/${code}`)
  return data
}

export const addUser = async (payload: CreateUserRequest) => {
  const data = await req.basicPost(endpoints.users, payload)
  return data
}

export const editUser = async (code: string, payload: UpdateUserRequest) => {
  const data = await req.put(`${endpoints.users}/${code}`, payload)
  return data
}

export const removeUser = async (code: string) => {
  const data = await req.remove(`${endpoints.users}/${code}`)
  return data
}
