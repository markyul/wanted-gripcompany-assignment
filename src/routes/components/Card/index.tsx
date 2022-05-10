import styles from './Card.module.scss'
import { cx } from '../../../styles'
import { FaStar } from 'react-icons/fa'
import { ISearchItem } from '../../../types/movie.d'
import defaultImage from '../../../assets/default_image.jpg'

interface ICardProps {
  movie: ISearchItem
  isCheck: boolean
}

const Card = (props: ICardProps) => {
  const { movie, isCheck } = props
  const { Title: title, Year: year, Type: type, Poster: poster, imdbID } = movie

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImage
  }

  return (
    <li key={imdbID} className={styles.cardContainer}>
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
    </li>
  )
}

export default Card
