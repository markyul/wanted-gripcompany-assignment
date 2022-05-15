import { useRecoil } from 'hooks/state'
import { FaStar } from 'react-icons/fa'

import styles from './Card.module.scss'
import defaultImage from 'assets/default_image.jpg'
import { cx } from 'styles'
import { modalOpenState, modalContentState } from 'states/bookmarkModal'
import { ISearchItem } from 'types/movie.d'

interface ICardProps {
  movie: ISearchItem
}

const Card = ({ movie }: ICardProps) => {
  const [, setOpenModal] = useRecoil(modalOpenState)
  const [, setContent] = useRecoil(modalContentState)

  const { Title: title, Year: year, Type: type, Poster: poster, imdbID, isBookmark } = movie

  // 포스터 이미지를 불러오지 못했을 때 기본 이미지로 대체
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImage
  }

  const handleClick = () => {
    setOpenModal((prev) => !prev)
    setContent(movie)
    // console.log(movie)
  }

  return (
    <li className={styles.cardContainer}>
      <button type='button' key={imdbID} className={styles.card} onClick={handleClick}>
        <div className={styles.poster}>
          <img src={poster} alt='poster' onError={handleImageError} />
        </div>
        <article>
          <header>{title}</header>
          <dl>
            <dt>Year:</dt>
            <dd>{year}</dd>
          </dl>
          <dl>
            <dt>Type:</dt>
            <dd>{type}</dd>
          </dl>
        </article>
        <div className={styles.bookmark}>
          <FaStar size={16} className={cx(styles.bookmarkIcon, { [styles.checkBoolmark]: isBookmark })} />
        </div>
      </button>
    </li>
  )
}

export default Card
