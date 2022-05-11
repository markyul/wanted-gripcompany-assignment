import { useState, useCallback } from 'hooks'
import styles from './Search.module.scss'

import Header from '../components/Header'
import Card from '../components/Card'
import SearchInput from './SearchInput'
import { IMovieAPIRes, ISearchItem } from '../../types/movie.d'
import { getMovieApi } from '../../services/movies'

const Search = () => {
  //   const [apiResult, setApiResult] = useState<IMovieAPIRes>()
  const [movieList, setMovieList] = useState<ISearchItem[]>([])

  // useEffect(() => {}, [])

  const getMovies = useCallback((search: string, pageNum: number) => {
    getMovieApi({
      s: search,
      page: pageNum,
    }).then((res) => {
      //   setApiResult(res.data)

      // TODO: Response가 False로 올 때 Error 메세지가 2개 있다. 처리할 것
      // Error: 'Too many results.' or 'Movie not found!'
      //   console.log(res.data)
      //   console.log('then에서 에러?')

      if (pageNum === 1) {
        setMovieList(res.data.Search)
      } else {
        res.data.Search?.forEach((item) => setMovieList((prev) => [...prev, item]))
      }
    })
  }, [])

  return (
    <>
      <Header>
        <SearchInput getMovies={getMovies} />
      </Header>
      <main className={styles.container}>
        {movieList.length ? (
          <ul>{movieList && movieList.map((data) => <Card key={data.imdbID} movie={data} isCheck={false} />)}</ul>
        ) : (
          <div className={styles.searchEmpty}>검색 결과가 없습니다.</div>
        )}
      </main>
    </>
  )
}

export default Search
