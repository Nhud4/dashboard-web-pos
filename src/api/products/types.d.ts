type ProductParams = TableParams & {
  categoryId?: string
  allocation?: string
}

type ProductCatData = {
  id: number
  name: string
}

type ProductList = {
  id: number
  code: string
  name: string
  price: number
  discount: number
  stock: number
  active: boolean
  available: boolean
  img: string
  category: ProductCatData
  no: number
}

type ProductCDetail = {
  id: string
  code: string
  name: string
  categoryId: string
  description: string
  normalPrice: number
  hpp: number
  discount: number
  discountType: string
  stock: number
  active: boolean
  available: boolean
  img: string
  allocation: string
  created_at?: string
  updated_at?: string
}

type ProductPayload = {
  name: string
  categoryId: string
  description?: string
  normalPrice: string
  hpp: string
  discount?: string
  discountType?: string
  stock: string
  active: string
  allocation: string
  img?: string
}
