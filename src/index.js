import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App'
import { FavoritesContextProvider } from './store/favorites-context'

ReactDOM.render(
  /* The `<FavoritesContextProvider>` component is wrapping the entire application, including the `<App>`
component, with the context provider for the favorites context. This means that all components
within the application will have access to the favorites data and functionality provided by the
context. */
  <FavoritesContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FavoritesContextProvider>,
  document.getElementById('root')
)
