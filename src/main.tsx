import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { StoreProvider } from 'easy-peasy';
import store from './lib/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>
)
