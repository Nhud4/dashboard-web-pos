import ICONS from '@configs/icons'
import IMAGES from '@configs/images'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { toggleSideMenu } from '@redux/slices/appSlice'
import { getUserData } from '@storage/index'
import { ROLE_OPTIONS } from '@utils/constants'

import Breadcrumbs from '../Breadcrumbs'
import styles from './styles.module.css'

type Props = {
  title?: string
}

const Navbar: React.FC<Props> = ({ title = 'Dasboard' }) => {
  const dispatch = useAppDispatch()
  const isOpenSideMenu = useAppSelector((state) => state.app.openSideMenu)
  const user = getUserData()
  const selectUser = ROLE_OPTIONS.filter((item) => item.value === user.role)[0]

  return (
    <nav className={`${styles.navbar} ${isOpenSideMenu && styles.open}`}>
      <div className="flex items-center space-x-4">
        <button
          className="transform rotate-180 transition-all"
          onClick={() => dispatch(toggleSideMenu())}
        >
          <ICONS.SidebarFlip1 fill="#247BA0" />
        </button>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <Breadcrumbs />
        </div>
      </div>
      <div className={styles.profile}>
        <div className={styles.wrapper}>
          <div className={styles.user}>
            <div>
              <p className={styles.name}>{user.name}</p>
              <p className="text-sm text-neutral-5">{selectUser.label}</p>
            </div>
            <img alt="Admin" src={IMAGES.Avatar} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export { Navbar }
