import { Routes, Route } from 'react-router-dom'

import styles from './Routes.module.scss'
import Main from './Main'
import TabBar from './TabBar'

const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles.header}>header</header>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='bookmark' element={<Main />} />
        </Routes>
        <TabBar />
      </div>
    </div>
  )
}

export default App
