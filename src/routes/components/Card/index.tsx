import styles from './Card.module.scss'
import { cx } from '../../../styles'
import { FaStar } from 'react-icons/fa'

interface ICardProps {
  title: string
  image: string
  year: string
  type: string
  isCheck: boolean
}

const Card = (props: ICardProps) => {
  const { title, image, year, type, isCheck } = props

  return (
    <div className={styles.cardContainer}>
      <aside className={styles.poster}>
        <img src={image} alt='poster' />
      </aside>
      <article>
        <dt>{title}</dt>
        <dd>Year: {year}</dd>
        <dd>Type: {type}</dd>
      </article>
      <aside className={styles.bookmark}>
        <FaStar className={cx(styles.bookmarkIcon, { [styles.checkBoolmark]: isCheck })} />
      </aside>
    </div>
  )
}

export default Card
