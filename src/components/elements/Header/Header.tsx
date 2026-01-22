import Navbar from '../Navbar'
import styles from './styles.module.css'

type Props = {
  title?: string
}

export const Header: React.FC<Props> = ({ title = 'Dashboard' }) => {
  return (
    <header className={styles.header}>
      <Navbar title={title} />
    </header>
  )
}
