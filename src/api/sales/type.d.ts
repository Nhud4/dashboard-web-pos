type ProductHistoryParams = {
  page: number
  size: number
  productId: string
  month?: number
}

type ProductHistoryData = {
  productId: number
  name: string
  date: string
  totalQty: string
  totalAmount: string
  no: number
}

type SummarySalesParams = {
  productId?: string
  month?: number
}

type SummarySalesData = {
  revenue: {
    total: number
    growth: number
  }
  transaction: {
    total: number
    growth: number
  }
}

type SummaryYearsParams = {
  year: number
}

type SummaryYearsData = {
  month: number
  revenue: number
}
