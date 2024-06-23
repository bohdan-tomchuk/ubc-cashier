import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/index.css'
import { Provider } from 'react-redux'
import store from './store'
import { ThemeProvider } from 'antd-style'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider themeMode={'auto'}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
