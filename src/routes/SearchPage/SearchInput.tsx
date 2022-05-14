import { FormEvent, ChangeEvent, SetStateAction } from 'react'

import { AiOutlineSearch } from 'react-icons/ai'

import styles from './SearchPage.module.scss'

interface Props {
  search: string
  setSearch: React.Dispatch<SetStateAction<string>>
  getMovies: (search: string, pageNum: number) => void
}

const SearchInput = ({ search, setSearch, getMovies }: Props) => {
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
