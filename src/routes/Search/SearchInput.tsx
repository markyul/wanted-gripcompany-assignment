import { FormEvent, ChangeEvent } from 'react'

import { AiOutlineSearch } from 'react-icons/ai'
import { useState } from 'hooks'
import styles from './Search.module.scss'

interface Props {
  getMovies: (search: string, pageNum: number) => void
}

const SearchInput = ({ getMovies }: Props) => {
  const [search, setSearch] = useState<string>('')

  const handleSearch = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()

    getMovies(search, 1)
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
  }

  return (
    <form className={styles.searchForm} onSubmit={handleSearch}>
      <div>
        <input value={search} onChange={handleChangeInput} />
        <button type='submit' aria-label='Mute volume'>
          <AiOutlineSearch />
        </button>
      </div>
    </form>
  )
}

export default SearchInput
