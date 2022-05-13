import { useRecoil } from 'hooks/state'

import styles from './BookmarkModal.module.scss'
import { modalOpenState, modalContentState } from 'states/bookmarkModal'
import defaultImage from 'assets/default_image.jpg'

const BookmarkModal = () => {
  const [, setOpenModal] = useRecoil(modalOpenState)
  const [content] = useRecoil(modalContentState)

  // 포스터 이미지를 불러오지 못했을 때 기본 이미지로 대체
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImage
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
          <button type='button'>즐겨찾기</button>
          <button type='button'>닫기</button>
        </div>
      </div>
    </div>
  )
}

export default BookmarkModal
