import ICONS from '@configs/icons'
import PAGES from '@configs/pages'

const routes: Route[] = [
  {
    component: <PAGES.Login />,
    name: 'Login',
    path: '/login',
  },
  {
    component: <PAGES.Dashboard />,
    icon: <ICONS.Home />,
    isSidebar: true,
    name: 'Dashboard',
    path: '/',
    requireAuth: true,
  },
  {
    component: <PAGES.Dashboard />,
    icon: <ICONS.Bags />,
    isSidebar: true,
    name: 'Transaksi',
    path: '/transaksi',
    requireAuth: true,
  },
  {
    component: <PAGES.Dashboard />,
    icon: <ICONS.Menu />,
    isSidebar: true,
    name: 'Kategri Product',
    path: '/kategori-product',
    requireAuth: true,
  },
  {
    component: <PAGES.Dashboard />,
    icon: <ICONS.Archive />,
    isSidebar: true,
    name: 'Product',
    path: '/product',
    requireAuth: true,
  },
  {
    component: <PAGES.Dashboard />,
    icon: <ICONS.Settings1 />,
    isSidebar: true,
    name: 'Pengaturan',
    path: '/pengaturan',
    requireAuth: true,
  },
  {
    component: <PAGES.NotFound />,
    name: 'Not Found',
    path: '*',
  },
]

// exports
export { routes }
