import { atom } from 'hooks/state'
import { ISearchItem } from 'types/movie'

export const modalOpenState = atom<boolean>({
  key: '#modalOpenState',
  default: false,
})

export const modalContentState = atom<ISearchItem>({
  key: '#modalContentState',
  default: {
    Title: '',
    Year: '',
    imdbID: '',
    Type: '',
    Poster: '',
  },
})
