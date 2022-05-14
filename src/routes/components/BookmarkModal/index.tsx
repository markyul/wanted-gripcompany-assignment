import { useRecoil } from 'hooks/state'
import store from 'store'

import styles from './BookmarkModal.module.scss'
import defaultImage from 'assets/default_image.jpg'
import { ISearchItem } from 'types/movie.d'
import { movieListState } from 'states/movieList'
import { modalOpenState, modalContentState } from 'states/bookmarkModal'
import { changeBookmark } from 'utils/bookmark'

const BookmarkModal = () => {
  const [, setOpenModal] = useRecoil(modalOpenState)
  const [content] = useRecoil(modalContentState)
  const [moiveList, setMovieList] = useRecoil(movieListState)

  // 포스터 이미지를 불러오지 못했을 때 기본 이미지로 대체
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImage
  }

  const handleClose = () => {
    setOpenModal((prev) => !prev)
  }
  const handleBookmark = () => {
    const bookmarkMovies: ISearchItem[] = store.get('bookmark')

    if (content.isBookmark) {
      // 즐겨찾기 해제
      const filterMovies = bookmarkMovies.filter((movie) => movie.imdbID !== content.imdbID)
      store.set('bookmark', filterMovies)
    } else {
      // 즐겨찾기 등록
      const addContent = { ...content, isBookmark: true }

      bookmarkMovies ? store.set('bookmark', [...bookmarkMovies, addContent]) : store.set('bookmark', [addContent])
    }
    setMovieList(changeBookmark(moiveList, content.imdbID, content.isBookmark))
    setOpenModal((prev) => !prev)
  }

  return (
    <div role='presentation' className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.contentContainer}>
          <aside className={styles.poster}>
            <img src={content.Poster} alt='poster' onError={handleImageError} />
          </aside>
          <article>
            <dt>{content.Title}</dt>
            <dd>Year: {content.Year}</dd>
            <dd>Type: {content.Type}</dd>
          </article>
        </div>
        <div className={styles.buttonContainer}>
          <button type='button' onClick={handleBookmark}>
            {content.isBookmark ? '즐겨찾기 제거' : '즐겨찾기'}
          </button>
          <button type='button' onClick={handleClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookmarkModal
