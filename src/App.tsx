import {BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './Components/Header/Header'
import PrivateRoute from './Components/PrivateRoute/PrivateRoutes'
import { useAuth } from './Hooks/useAuth'
import { useWebsocket } from './Hooks/useWebsocket'
import DashboardPage from './Pages/DashboardPage/DashboardPage'
import HomePage from './Pages/HomePage/HomePage'
import ProfilePage from './Pages/ProfilePage/ProfilePage'
import SignInPage from './Pages/SignInPage/SignInPage'
import SignUpPage from './Pages/SignUpPage/SignUpPage'
import { LinkDescription } from './Utils/types/LinkDescription'

function App() {
	const { user, isSignedIn } = useAuth()
	const { pingServer } = useWebsocket()

	let routes, links: LinkDescription[]
	if (!isSignedIn()) {
		routes = (
			<Switch>
				<Route path='/' exact><HomePage/></Route>
				<Route path='/auth/signin' exact><SignInPage/></Route>
				<Route path='/auth/signup' exact><SignUpPage/></Route>
				<Redirect to='/auth/signin'/>
			</Switch>
		)

		links = [{ name: 'start', link: '/' }, { name: 'sign in', link: '/auth/signin' }, { name: 'sign up', link: '/auth/signup' }]
	} else if (!user.hasAuthenticatedGitlab) {
		routes = (
			<Switch>
				<PrivateRoute path='/profile/:userId' exact={true} component={ProfilePage}/>
				<Redirect to={`/profile/${user.userId}`}/>
			</Switch>
		)

		links = [{ name: 'profile', link: `/profile/${user.userId}` }]
	} else {
		pingServer()
		routes = (
			<Switch>
				<PrivateRoute path='/profile/:userId' exact={true} component={ProfilePage}/>
				<PrivateRoute path='/dashboard/:userId/:subId' exact={true} component={DashboardPage}/>
				<Redirect to={`/dashboard/${user.userId}/events`}/>
			</Switch>
		)

		links = [{ name: 'dashboard', link: `/dashboard/${user.userId}/events` }, { name: 'profile', link: `/profile/${user.userId}` }
      ]
	}

  return (
    <div className="App">
			<Router>
				<Header links={links}/>
				{routes}
			</Router>
    </div>
  )
}

export default App

