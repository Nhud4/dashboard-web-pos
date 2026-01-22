import ICONS from '@configs/icons'
import routes from '@routes/index'
import { useWindowWidth } from '@utils/hooks'
import { clsx } from '@utils/index'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { mappedPath, slicePath } from './helper'
import styles from './styles.module.css'

const disabledMenu = routes
  .filter((item) => item.disabled)
  .map((item) => item.path?.split('/')[1])

export const Breadcrumbs: React.FC = () => {
  const location = useLocation()
  const [params] = useSearchParams()
  const fullPath = mappedPath(location.pathname)
  const navigate = useNavigate()
  const windowWidth = useWindowWidth()
  const isMobile = windowWidth <= 640

  const validationMenu = fullPath.filter(
    (item) => !disabledMenu.includes(item.path)
  )
  const menu = isMobile ? validationMenu.slice(-2) : validationMenu

  return (
    <ul className={styles.container}>
      {!isMobile || menu.length === 1 ? (
        <li className={styles.pages}>
          <button className="font-medium" onClick={() => navigate(`/`)}>
            Dashboard
          </button>
        </li>
      ) : null}

      {menu.map(({ name, path }, index) => {
        return (
          <li className={styles.pages} key={path}>
            {menu.length - 1 !== index ? (
              <div className="flex justify-around">
                {!isMobile ? (
                  <ICONS.Chevron
                    className="-mt-1 transform scale-75 -rotate-90"
                    fill="#247BA0"
                  />
                ) : null}

                <button
                  className="font-medium"
                  onClick={() => {
                    window.location.href = slicePath(location.pathname, index)
                  }}
                >
                  {params.get(`breadcrumb-${index}`) || name}
                </button>
              </div>
            ) : (
              <div className="flex justify-around items-center">
                <ICONS.Chevron
                  className={clsx([
                    'transform scale-75 -rotate-90',
                    isMobile ? '' : '-mt-1',
                  ])}
                  fill="#737373"
                />{' '}
                <p className="text-neutral-500">
                  {params.get('breadcrumb') || name}
                </p>
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
