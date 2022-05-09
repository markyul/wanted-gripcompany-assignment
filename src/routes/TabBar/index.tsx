import styles from './TabBar.module.scss'

const TabBar = () => {
  return (
    <nav className={styles.tabContainer}>
      <button type='button'>Search</button>
      <button type='button'>Book Mark</button>
    </nav>
  )
}

export default TabBar
