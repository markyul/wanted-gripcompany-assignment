import { useState } from 'hooks'
import { useRecoil } from 'hooks/state'
import { FaStar } from 'react-icons/fa'

import styles from './Card.module.scss'
import { cx } from '../../../styles'
import { ISearchItem } from '../../../types/movie.d'
import defaultImage from '../../../assets/default_image.jpg'
import BookmarkModal from '../BookmarkModal'
import { modalOpenState, modalContentState } from 'states/bookmarkModal'

interface ICardProps {
  movie: ISearchItem
  isCheck: boolean
}

const Card = (props: ICardProps) => {
  const [, setOpenModal] = useRecoil(modalOpenState)
  const [, setContent] = useRecoil(modalContentState)

  const { movie, isCheck } = props
  const { Title: title, Year: year, Type: type, Poster: poster, imdbID } = movie

  // 포스터 이미지를 불러오지 못했을 때 기본 이미지로 대체
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImage
  }

  const handleClick = () => {
    setOpenModal((prev) => !prev)
    setContent(movie)
  }

  return (
    <button type='button' key={imdbID} className={styles.cardContainer} onClick={handleClick}>
      <aside className={styles.poster}>
        <img src={poster} alt='poster' onError={handleImageError} />
      </aside>
      <article>
        <dt>{title}</dt>
        <dd>Year: {year}</dd>
        <dd>Type: {type}</dd>
      </article>
      <aside className={styles.bookmark}>
        <FaStar className={cx(styles.bookmarkIcon, { [styles.checkBoolmark]: isCheck })} />
      </aside>
    </button>
  )
}

export default Card
