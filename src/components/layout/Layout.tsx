import Header from '@components/elements/Header'
import Notify from '@components/elements/Notify'
import Sidebar from '@components/elements/Sidebar'
import { NotifyContext } from '@contexts/NotifyContext'
import { useAppSelector } from '@redux/hooks'
import { clsx } from '@utils/index'
import { useContext, useEffect } from 'react'

import styles from './styles.module.css'

type Props = {
  children: React.ReactNode
  title?: string
  withSidebar?: boolean
}

const Layout: React.FC<Props> = ({ children, title = 'Dashboard' }) => {
  const { setNotify } = useContext(NotifyContext)
  const isOpenSideMenu = useAppSelector((state) => state.app.openSideMenu)

  useEffect(() => {
    window.addEventListener('offline', () => {
      setNotify({
        color: 'warning',
        isOpen: true,
        message: 'Kamu sepertinya sedang offline. Cek kembali koneksi internet',
      })
    })

    window.addEventListener('online', () => {
      setNotify({
        color: 'success',
        isOpen: true,
        message: 'Kembali terhubung ke internet',
      })
    })
  }, [setNotify])

  return (
    <div className={`${styles.container} ${styles.withSidebar}`}>
      <Sidebar />
      <main className={styles.content}>
        <Header title={title} />
        <div
          className={clsx([
            styles.mainContent,
            isOpenSideMenu ? styles.open : '',
          ])}
        >
          {children}
        </div>
      </main>
      <Notify />
    </div>
  )
}
export { Layout }
