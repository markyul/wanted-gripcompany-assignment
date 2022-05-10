import { useState, useEffect } from 'hooks'

import styles from './Search.module.scss'
import Header from '../components/Header'
import Card from '../components/Card'
import { IMovieAPIRes, ISearchItem } from '../../types/movie.d'
import { getMovieApi } from '../../services/movies'

const Search = () => {
  //   const [apiResult, setApiResult] = useState<IMovieAPIRes>()
  const [movieList, setMovieList] = useState<ISearchItem[] | undefined>([])

  useEffect(() => {
    getMovieApi({
      s: 'dafasfa',
      page: 1,
    }).then((res) => {
      //   setApiResult(res.data)

      // TODO: Response가 False로 올 때 Error 메세지가 2개 있다. 처리할 것
      // Error: 'Too many results.' or 'Movie not found!'
      //   console.log(res.data)
      //   console.log('then에서 에러?')

      setMovieList(res.data.Search)
    })
  }, [])

  return (
    <>
      <Header>
        <div>내 즐겨찾기</div>
      </Header>
      <main className={styles.container}>
        <ul>{movieList && movieList.map((data) => <Card key={data.imdbID} movie={data} isCheck={false} />)}</ul>
      </main>
    </>
  )
}

export default Search
