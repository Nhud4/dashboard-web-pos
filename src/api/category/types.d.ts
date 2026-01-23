type Category = {
  id: string
  code: string
  name: string
  totalProduct: number
  status: boolean
  created_at?: string
  updated_at?: string
  no: number
}

type CategoryPayload = {
  name: string
  status: string
}
