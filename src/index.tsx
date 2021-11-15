import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { QueryClientProvider, QueryClient } from 'react-query'
import { CookiesProvider } from 'react-cookie'

import { AppProvider } from './Contexts/App/AppContext'
import {GlobalStyles} from './GlobalStyles'

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
		<AppProvider>
			<QueryClientProvider client={queryClient}>
				<CookiesProvider>
					<GlobalStyles/>
					<App/>
				</CookiesProvider>
			</QueryClientProvider>
		</AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)