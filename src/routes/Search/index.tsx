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
  const [page, setPage] = useState<number>(2)
  const [totalResult, setTotalResult] = useState<number>(0)

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
        setPage(2)
      } else {
        res.data.Search && res.data.Search?.forEach((item) => setMovieList((prev) => [...prev, item]))
      }
    })
  }, [])

  useEffect(() => {
    const option = {
      root: viewport.current,
      threshold: 0,
    }
    console.log(movieList.length)
    console.log(page)

    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      // TODO: totalResults 수로 페이지 수가 한계면 멈춤

      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          // observer.unobserve(entry.target)
          await getMovies(search, page)
          setPage((prev) => prev + 1)
          // observer.observe(entry.target)
        }
      })
    }

    let observer: IntersectionObserver

    if (target.current) {
      observer = new IntersectionObserver(handleIntersection, option)
      observer.observe(target.current)
    }

    return () => observer && observer.disconnect()
  }, [target, movieList, page, getMovies, search])

  return (
    <>
      <Header>
        <SearchInput search={search} setSearch={setSearch} getMovies={getMovies} />
      </Header>
      <main className={styles.container} ref={viewport}>
        {movieList.length ? (
          <>
            <ul>{movieList && movieList.map((data) => <Card key={data.imdbID} movie={data} isCheck={false} />)}</ul>
            <div ref={target}>마지막줄</div>
            {/* TODO: 로딩 Component */}
          </>
        ) : (
          <div className={styles.searchEmpty}>검색 결과가 없습니다.</div>
        )}
      </main>
    </>
  )
}

export default Search
