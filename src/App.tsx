import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
function App() {

  return (
    < BrowserRouter>
      <Routes auth={false} />
    </BrowserRouter>
  )
}

export default App
