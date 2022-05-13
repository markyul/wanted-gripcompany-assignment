import { Routes, Route } from 'react-router-dom'
import { useRecoil } from 'hooks/state'

import styles from './Routes.module.scss'
import Search from './SearchPage'
import TabBar from './components/TabBar'
import BookmarkModal from './components/BookmarkModal'
import { modalOpenState } from 'states/bookmarkModal'

const App = () => {
  const [openModal] = useRecoil(modalOpenState)

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='bookmark' element={<Search />} />
        </Routes>
        <TabBar />
        {openModal && <BookmarkModal />}
      </div>
    </div>
  )
}

export default App
