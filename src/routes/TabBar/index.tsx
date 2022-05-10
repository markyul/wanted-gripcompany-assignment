import { NavLink } from 'react-router-dom'

import styles from './TabBar.module.scss'
import { cx } from '../../styles'

const TabBar = () => {
  return (
    <nav className={styles.tabContainer}>
      <ul>
        <li>
          <NavLink to='/' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            Search
          </NavLink>
        </li>
        <li>
          <NavLink to='bookmark' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            Book Mark
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default TabBar
