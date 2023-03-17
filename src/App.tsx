import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import useCacheData from '@hooks/useCacheData';
import { useStoreState, useStoreActions } from './lib/store';
import { useEffect } from 'react';
function App() {
  const data = useCacheData<any>("user")
  const { user } = useStoreState((state) => state.user)
  const { setUser } = useStoreActions((actions) => actions.user)

  useEffect(() => {
    if (!user && data && data.length > 0) {
      setUser({
        id: data[0].id,
        email: data[0].email,
        auth: true
      })
    }
  }, [data])
  return (
    < BrowserRouter>
      <Routes auth={user || data ? true : false} />
    </BrowserRouter>
  )
}

export default App
