import IMAGES from '@configs/images'
import { useAppSelector } from '@redux/hooks'
import routes from '@routes/index'
import { clsx, splitUrl } from '@utils/index'
import { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import styles from './styles.module.css'

export const Sidebar: React.FC = () => {
  const isOpenSideMenu = useAppSelector(({ app }) => app.openSideMenu)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const navRef = useRef<HTMLUListElement | null>(null)

  const menus = routes.filter(({ isSidebar }) => isSidebar)

  const isActive = (path?: string) => {
    return pathname === path ? styles.active : ''
  }

  const isActiveDetail = ({ path }: IsActiveDropDown) => {
    const validatePath = splitUrl(pathname, path)
    return validatePath ? styles.active : ''
  }

  return (
    <section>
      <div
        className={clsx([
          styles.container,
          !isOpenSideMenu ? styles.close : styles.open,
        ])}
      >
        <div className={styles.brand}>
          <div className={styles.app}>
            <img
              alt="tepi-logo"
              className="bg-primary-4 rounded-lg w-12 h-12"
              src={IMAGES.RestoLogo}
            />
            <div>
              <h1>SaR-1</h1>
              <p>Cafe and Resto</p>
            </div>
          </div>
        </div>
        <ul className={styles.nav} ref={navRef}>
          {menus.map((menu) => {
            const menuPath = menu.path as string
            return (
              <li
                className={clsx([
                  styles.nav__item,
                  isActive(menu.path),
                  isActiveDetail({ path: menu.path }),
                ])}
                key={menu.path}
              >
                <button
                  disabled={menu.disabled}
                  onClick={() => navigate(menuPath)}
                >
                  {menu.icon}
                  <p>{menu.name}</p>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
