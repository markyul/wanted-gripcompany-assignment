import { NavLink } from 'react-router-dom'

import styles from './TabBar.module.scss'
import { cx } from '../../../styles'

const TabBar = () => {
  return (
    <nav className={styles.tabContainer}>
      <ul>
        <li>
          <NavLink to='/' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            검색
          </NavLink>
        </li>
        <li>
          <NavLink to='bookmark' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            즐겨찾기
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default TabBar
