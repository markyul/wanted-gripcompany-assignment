import { Routes, Route } from 'react-router-dom'

import styles from './Routes.module.scss'
import Search from './Search'
import TabBar from './components/TabBar'

const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='bookmark' element={<Search />} />
        </Routes>
        <TabBar />
      </div>
    </div>
  )
}

export default App
