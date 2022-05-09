export interface ISearchItem {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface IMovieAPIRes {
  Search: ISearchItem[]
  totalResults: number // 검색 결과 전체 개수
  Response: bool
}
