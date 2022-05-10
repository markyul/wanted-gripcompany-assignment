import { Routes, Route } from 'react-router-dom'

import styles from './Routes.module.scss'
import Main from './Main'
import Header from './components/Header'
import TabBar from './components/TabBar'

const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header>
          <div>내 즐겨찾기</div>
        </Header>
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
