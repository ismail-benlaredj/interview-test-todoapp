import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import useCacheData from '@hooks/useCacheData';
import { useState } from 'react';
import { useStoreState, useStoreActions } from './lib/store';
function App() {
  const data = useCacheData<any>("user")
  const { user } = useStoreState((state) => state.user)
  console.log(user, data)
  return (
    < BrowserRouter>
      <Routes auth={user || data ? true : false} />
    </BrowserRouter>
  )
}

export default App
