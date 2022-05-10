import { ReactNode } from 'react'
import styles from './Header.module.scss'

interface Props {
  children: ReactNode
}

const Header = ({ children }: Props) => {
  return <header className={styles.container}>{children}</header>
}

export default Header
