type TransactionParams = TableParams & {
  paymentStatus?: string
  date?: string
}

type TransactionUser = {
  name: string
  role: string
}

type TransactionItems = {
  id: number
  name: string
  price: number
  discount: number
  note: string
  qty: number
  subtotal: number
}

type TransactionList = {
  id: number
  code: string
  transactionDate: string
  customerName: string
  paymentMethod: string
  bill: number
  tableNumber: number
  createdAt: string
  paymentStatus: string
  user: TransactionUser
  no: number
}

type TransactionDetail = {
  id: number
  code: string
  transactionDate: string
  createdBy: string
  transactionType: string
  customerName: string
  deliveryType: string
  tableNumber: number
  paymentType: string
  paymentMethod: string
  paymentStatus: string
  subtotal: number
  totalDiscount: number
  ppn: number
  bill: number
  payment: number
  createdAt: string
  user: TransactionUser
  items: TransactionItems[]
}
