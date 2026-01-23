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
    icon: <ICONS.Home height={24} width={24} />,
    isSidebar: true,
    name: 'Dashboard',
    path: '/',
    requireAuth: true,
  },
  {
    component: <PAGES.Transaction />,
    icon: <ICONS.Bags height={24} width={24} />,
    isSidebar: true,
    name: 'Transaksi',
    path: '/transaksi',
  },
  {
    component: <PAGES.Transaction />,
    name: 'Detail Transaksi',
    path: '/transaksi/detail/:id',
    requireAuth: true,
  },
  {
    component: <PAGES.Dashboard />,
    icon: <ICONS.Menu height={20} width={20} />,
    isSidebar: true,
    name: 'Kategri Product',
    path: '/kategori-product',
    requireAuth: true,
  },
  {
    component: <PAGES.Dashboard />,
    icon: <ICONS.Archive height={24} width={24} />,
    isSidebar: true,
    name: 'Product',
    path: '/product',
    requireAuth: true,
  },
  {
    component: <PAGES.Dashboard />,
    icon: <ICONS.Settings1 height={24} width={24} />,
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
