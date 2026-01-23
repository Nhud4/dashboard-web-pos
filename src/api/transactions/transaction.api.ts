import * as req from '@utils/httpRequest'

const endpoints = {
  main: '/transaction',
}

export const listTransaction = async (params: TransactionParams) => {
  const data = await req.basicGet<ApiResponse<TransactionList[]>>(
    endpoints.main,
    params
  )
  return data
}

export const detailTransaction = async (code: string) => {
  const data = await req.basicGet<ApiResponse<TransactionDetail>>(
    `${endpoints.main}/${code}`
  )
  return data
}
