import * as req from '@utils/httpRequest'

const endpoints = {
  main: '/products-categories',
}

export const listCategory = async (params: TableParams) => {
  const data = await req.basicGet<ApiResponse<Category[]>>(
    endpoints.main,
    params
  )
  return data
}

export const detailCategory = async (code: string) => {
  const data = await req.basicGet<ApiResponse<Category>>(
    `${endpoints.main}/${code}`
  )
  return data
}

export const addCategory = async (payload: CategoryPayload) => {
  const data = await req.post(endpoints.main, payload)
  return data
}

export const editCategory = async (code: string, payload: CategoryPayload) => {
  const data = await req.put(`${endpoints.main}/${code}`, payload)
  return data
}

export const removeCategory = async (code: string) => {
  const data = await req.remove(`${endpoints.main}/${code}`)
  return data
}
