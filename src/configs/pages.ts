import React from 'react'

const NotFound = React.lazy(() => import('@pages/NotFound'))
const Dashboard = React.lazy(() => import('@pages/Dashboard'))
const Settings = React.lazy(() => import('@pages/Settings'))
const Login = React.lazy(() => import('@pages/Login'))
const Transaction = React.lazy(() => import('@pages/Transaction'))
const TransactionDetail = React.lazy(() => import('@pages/TransactionDetail'))
const ProductsCategory = React.lazy(() => import('@pages/ProductCategory'))
const Products = React.lazy(() => import('@pages/Products'))
const ProductsDetail = React.lazy(() => import('@pages/ProductDetail'))
const ProductsAdd = React.lazy(() => import('@pages/ProductAdd'))
const ProductsEdit = React.lazy(() => import('@pages/ProductEdit'))

const PAGES = {
  Dashboard,
  Login,
  NotFound,
  Products,
  ProductsAdd,
  ProductsCategory,
  ProductsDetail,
  ProductsEdit,
  Settings,
  Transaction,
  TransactionDetail,
}

export default PAGES
