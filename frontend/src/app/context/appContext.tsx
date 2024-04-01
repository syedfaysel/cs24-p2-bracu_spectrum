import { createContext, useState , useContext} from 'react'

const AppContext = createContext();


export function AppWrapper({ children }: { children: React.ReactNode }) {
  

  let [state, setState] = useState('hello');

  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  )
}


export function useAppContext() {
  return useContext(AppContext);
}