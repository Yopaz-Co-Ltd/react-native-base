import {createContext} from 'react'

export type GlobalContextType = {
  setLoading: (isLoading: boolean) => void
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

export const Context = createContext<GlobalContextType>({
  setLoading: () => {},
  setIsLoggedIn: () => {},
})
