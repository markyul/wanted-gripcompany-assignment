import { axios } from 'hooks/worker'
import { IMovieAPIRes } from 'types/movie.d'

const MOVIE_BASE_URL = 'http://www.omdbapi.com/'
const API_KEY = process.env.REACT_APP_API_KEY

interface Params {
  search: string
  page: number
}

// http://www.omdbapi.com/?apikey=92e32667&s={검색어}&page={페이지번호(1~100)}
export const getWeatherApi = (params: Params) =>
  axios.get<IMovieAPIRes>(`${MOVIE_BASE_URL}?${API_KEY}&s=${params.search}&page=${params.page}`)
