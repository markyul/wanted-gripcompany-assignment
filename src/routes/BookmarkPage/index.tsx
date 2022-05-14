import store from 'store'

import styles from './BookmarkPage.module.scss'
import Header from '../components/Header'
import Card from '../components/Card'
import { ISearchItem } from 'types/movie.d'

const SearchPage = () => {
  const bookmarkList: ISearchItem[] = store.get('bookmark')

  return (
    <>
      <Header>내 즐겨찾기</Header>
      <main className={styles.container}>
        {bookmarkList.length ? (
          <ul>{bookmarkList && bookmarkList.map((data) => <Card key={data.imdbID} movie={data} />)}</ul>
        ) : (
          <div className={styles.errorMessage}>즐겨찾기 목록이 없습니다.</div>
        )}
      </main>
    </>
  )
}

export default SearchPage
