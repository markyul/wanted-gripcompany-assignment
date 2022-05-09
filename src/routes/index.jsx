import styles from './Routes.module.scss'
import Main from './Main'
import TabBar from './TabBar'

const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles.header}>header</header>
        <Main />
        <TabBar />
      </div>
    </div>
  )
}

export default App
