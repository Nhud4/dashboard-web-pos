import ICONS from '@configs/icons'
import PAGES from '@configs/pages'

const routes: Route[] = [
  {
    component: <PAGES.Dashboard />,
    icon: <ICONS.Home />,
    isSidebar: true,
    name: 'Dashboard',
    path: '/',
    requireAuth: true,
  },
  {
    component: <PAGES.Login />,
    name: 'Login',
    path: '/login',
  },
  {
    component: <PAGES.NotFound />,
    name: 'Not Found',
    path: '*',
  },
]

// exports
export { routes }
