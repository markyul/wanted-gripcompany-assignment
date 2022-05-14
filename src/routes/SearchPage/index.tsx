import { useState, useEffect, useCallback, useRef } from 'hooks'
import { useRecoil } from 'hooks/state'

import styles from './SearchPage.module.scss'
import Header from '../components/Header'
import Card from '../components/Card'
import SearchInput from './SearchInput'
import { getMovieApi } from '../../services/movies'
import { movieListState } from 'states/movieList'
import { setBookmarkMovies } from 'utils/bookmark'

const SearchPage = () => {
  const [searchText, setSearchText] = useState<string>('')
  const [nextPage, setNextPage] = useState<number>(2)
  const [totalResult, setTotalResult] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('검색 결과가 없습니다.')

  const [movieList, setMovieList] = useRecoil(movieListState)

  const viewport = useRef(null)
  const target = useRef(null)

  // API 결과를 가져와 추가 처리를 하기 위해 만듬
  const getMovies = useCallback(
    async (text: string, pageNum: number) => {
      await getMovieApi({
        s: text,
        page: pageNum,
      }).then((res) => {
        const { Response, Error, Search, totalResults } = res.data

        const tooManyError = '검색 결과가 너무 많습니다.\n\n자세히 검색해주세요.'
        const notFoundError = '검색 결과가 없습니다.'
        const elseError = '서버에 문제가 있습니다.'

        // Response가 False로 올 때 Error 메세지가 여러 개 있다.
        if (Response === 'False') {
          setMovieList([])
          if (Error === 'Too many results.') {
            setErrorMessage(tooManyError)
          } else if (Error === 'Movie not found!') {
            setErrorMessage(notFoundError)
          } else {
            setErrorMessage(elseError)
          }
        } else if (Response === 'True') {
          if (pageNum === 1) {
            Search ? setMovieList(setBookmarkMovies(Search)) : setMovieList([])
            setTotalResult(totalResults || 0)
          } else {
            Search && setMovieList((prev) => [...prev, ...setBookmarkMovies(Search)])
          }
        }
      })
    },
    [setMovieList]
  )

  // 무한 스크롤 콜백 함수
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      // totalResults 수로 페이지 수가 한계면 멈춤
      if ((nextPage - 1) * 10 < totalResult) {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            setLoading(true)
            await getMovies(searchText, nextPage)
            setNextPage((prev) => prev + 1)
            setLoading(false)
          }
        })
      }
    },
    [getMovies, nextPage, searchText, totalResult]
  )

  // 무한 스크롤을 위한 초기화
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
        <SearchInput search={searchText} setSearch={setSearchText} getMovies={getMovies} />
      </Header>
      <main className={styles.container} ref={viewport}>
        {movieList.length ? (
          <>
            <ul>{movieList && movieList.map((data) => <Card key={data.imdbID} movie={data} />)}</ul>
            <div className={styles.loading} ref={target}>
              {loading && 'Loading...'}
            </div>
          </>
        ) : (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
      </main>
    </>
  )
}

export default SearchPage
