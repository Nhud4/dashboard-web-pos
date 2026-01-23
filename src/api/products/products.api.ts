import * as req from '@utils/httpRequest'

const endpoints = {
  main: '/products',
}

export const listProducts = async (params: ProductParams) => {
  const data = await req.basicGet<ApiResponse<ProductList[]>>(
    endpoints.main,
    params
  )
  return data
}

export const detailProducts = async (code: string) => {
  const data = await req.basicGet<ApiResponse<ProductDetail>>(
    `{endpoints.main}/${code}`
  )
  return data
}

export const createProduct = async (payload: ProductPayload) => {
  const data = await req.post(endpoints.main, payload)
  return data
}

export const editProduct = async (code: string, payload: ProductPayload) => {
  const data = await req.put(`${endpoints.main}/${code}`, payload)
  return data
}

export const removeProduct = async (code: string) => {
  const data = await req.remove(`{endpoints.main}/${code}`)
  return data
}
