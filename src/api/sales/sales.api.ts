import * as req from '@utils/httpRequest'

const endpoints = {
  main: '/sales',
}

export const productHistory = async (params: ProductHistoryParams) => {
  const data = await req.get<ApiResponse<ProductHistoryData[]>>(
    endpoints.main,
    params
  )
  return data
}

export const summarySales = async (params: SummarySalesParams) => {
  const data = await req.get<ApiResponse<SummarySalesData>>(
    `${endpoints.main}/summary`,
    params
  )
  return data
}

export const summaryYear = async (params: SummaryYearsParams) => {
  const data = await req.get<ApiResponse<SummaryYearsData[]>>(
    `${endpoints.main}/year`,
    params
  )
  return data
}
