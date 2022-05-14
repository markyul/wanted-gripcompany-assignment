import { atom } from 'hooks/state'
import { ISearchItem } from 'types/movie'

export const movieListState = atom<ISearchItem[]>({
  key: '#movieListState',
  default: [],
})
