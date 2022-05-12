import { useState, useEffect, useCallback, useRef } from 'hooks'
import styles from './Search.module.scss'

import Header from '../components/Header'
import Card from '../components/Card'
import SearchInput from './SearchInput'
import { IMovieAPIRes, ISearchItem } from '../../types/movie.d'
import { getMovieApi } from '../../services/movies'

const Search = () => {
  //   const [apiResult, setApiResult] = useState<IMovieAPIRes>()
  const [search, setSearch] = useState<string>('')
  const [movieList, setMovieList] = useState<ISearchItem[]>([])
  const [nextPage, setNextPage] = useState<number>(2)
  const [totalResult, setTotalResult] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  // const [errorMessage, setErrorMessage] = useState<string>('검색 결과가 없습니다.')

  const viewport = useRef(null)
  const target = useRef(null)

  const getMovies = useCallback(async (searchText: string, pageNum: number) => {
    await getMovieApi({
      s: searchText,
      page: pageNum,
    }).then((res) => {
      //   setApiResult(res.data)

      // TODO: Response가 False로 올 때 Error 메세지가 2개 있다. 처리할 것
      // Error: 'Too many results.' or 'Movie not found!'
      //   console.log(res.data)
      //   console.log('then에서 에러?')

      if (pageNum === 1) {
        res.data.Search ? setMovieList(res.data.Search) : setMovieList([])
        setTotalResult(res.data.totalResults ? res.data.totalResults : 0)
      } else {
        res.data.Search && res.data.Search?.forEach((item) => setMovieList((prev) => [...prev, item]))
      }
    })
  }, [])

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      // TODO: totalResults 수로 페이지 수가 한계면 멈춤
      if ((nextPage - 1) * 10 < totalResult) {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            // observer.unobserve(entry.target)
            setLoading(true)
            await getMovies(search, nextPage)
            setNextPage((prev) => prev + 1)
            setLoading(false)
            // observer.observe(entry.target)
          }
        })
      }
    },
    [getMovies, nextPage, search, totalResult]
  )

  useEffect(() => {
    const option = {
      root: viewport.current,
      threshold: 0,
    }

    let observer: IntersectionObserver

    if (target.current) {
      observer = new IntersectionObserver(handleIntersection, option)
      observer.observe(target.current)
    }

    return () => observer && observer.disconnect()
  }, [handleIntersection])

  return (
    <>
      <Header>
        <SearchInput search={search} setSearch={setSearch} getMovies={getMovies} />
      </Header>
      <main className={styles.container} ref={viewport}>
        {movieList.length ? (
          <>
            <ul>{movieList && movieList.map((data) => <Card key={data.imdbID} movie={data} isCheck={false} />)}</ul>
            <div className={styles.loading} ref={target}>
              {loading && 'Loading...'}
            </div>
          </>
        ) : (
          <div className={styles.searchEmpty}>검색 결과가 없습니다.</div>
        )}
      </main>
    </>
  )
}

export default Search
