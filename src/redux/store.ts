import { configureStore } from '@reduxjs/toolkit'

import app from './slices/appSlice'
import auth from './slices/auth'
import category from './slices/category'
import products from './slices/products'
import sales from './slices/sales'
import transaction from './slices/transaction'
import users from './slices/users'

export const store = configureStore({
  reducer: {
    app,
    auth,
    category,
    products,
    sales,
    transaction,
    users,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
