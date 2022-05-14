import store from 'store'
import { ISearchItem } from 'types/movie'

// 즐겨찾기 되어 있는 영화 목록 체크
export const setBookmarkMovies = (searchItems: ISearchItem[]) => {
  const bookmarkMovies: ISearchItem[] = store.get('bookmark')
  let copySearch = searchItems

  bookmarkMovies.forEach((bookmarkMovie) => {
    copySearch = copySearch.map((movie) =>
      movie.imdbID === bookmarkMovie.imdbID ? { ...movie, isBookmark: true } : movie
    )
  })

  return copySearch
}

// 즐겨찾기 등록, 해제
export const changeBookmark = (searchItems: ISearchItem[], cancelId: string, isBookmark: boolean) => {
  let copySearch = searchItems

  copySearch = copySearch.map((movie) => (movie.imdbID === cancelId ? { ...movie, isBookmark: !isBookmark } : movie))

  return copySearch
}
