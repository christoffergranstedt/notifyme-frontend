import { HTTPMethod } from '@granch_web/common'
import React from 'react'
import { AppContext } from '../Contexts/App/AppContext'
import { UserOption } from '../Contexts/User/UserReducer'
import { useRequest } from './useRequest'

interface UserPayload {
	isSignedIn: boolean;
	userId: number;
	username: string;
	accessToken: string;
	accessTokenExpirationDate: number;
	refreshToken: string;	
	hasAuthenticatedGitlab: boolean;
	hasAuthenticatedSlack: boolean;
}

interface AuthenticateData {
	user: {
		userId: number;
		username: string;
		accessToken: string;
		accessTokenExpirationDate: number;
		refreshToken: string;
		hasAuthenticatedGitlab: boolean;
		hasAuthenticatedSlack: boolean;
	}
}

interface RefreshData {
	user: {
		accessToken: string;
		accessTokenExpirationDate: number;
		refreshToken: string;
	}
}

enum LocalStorageName {
	UserData = 'userData'
}

export const useAuth = () => {
	
	const { state: { user }, dispatch } = React.useContext(AppContext)
	const { sendRequest } = useRequest()

	const isSignedIn = React.useCallback(() => {
		if (user.isSignedIn) return true

		const rawUserData = localStorage.getItem(LocalStorageName.UserData)
		if (!rawUserData) return false
    const userData = JSON.parse(rawUserData)

    if (userData.accessToken && userData.accessTokenExpirationDate > new Date().getTime()) {
			return true
    }
		return false
  }, [user])

	const signin = React.useCallback(async (userInput) => {
		try {
			const data : AuthenticateData = await sendRequest({ url: '/api/accounts/authenticate', method: HTTPMethod.POST, body: userInput, token: null })
			const userPayload: UserPayload = { isSignedIn: true, ...data.user }
			dispatch({ 
				type: UserOption.SetUser, 
				payload: userPayload
			})
			localStorage.setItem(LocalStorageName.UserData,JSON.stringify(userPayload))
		} catch (error) {
			console.log(error)
		}
  }, [dispatch, sendRequest])

	const signout = React.useCallback(async () => {
		try {
			if (!user.accessToken) return
			localStorage.removeItem(LocalStorageName.UserData)
			dispatch({ 
				type: UserOption.RemoveUser, 
				payload: { } 
			})
			await sendRequest({ url: '/api/accounts/signout', method: HTTPMethod.GET, token: user.accessToken })


		} catch (error) {
			console.log(error)
		}

  }, [dispatch, user, sendRequest])

	const refreshAccessToken = React.useCallback(async () => {
		try {
			if (!user.refreshToken) return
			const data : RefreshData = await sendRequest({ url: '/api/accounts/refresh', method: HTTPMethod.POST, token: user.refreshToken })
			dispatch({ 
				type: UserOption.UpdateTokens, 
				payload: data.user
			})
			localStorage.setItem(LocalStorageName.UserData,JSON.stringify({ ...user, ...data.user }))
		} catch (error) {
			console.log(error)
		}

  }, [dispatch, sendRequest, user])

	const hasAuthenticatedGitlab = React.useCallback((isAuth: boolean) => {
		const rawUserData = localStorage.getItem(LocalStorageName.UserData)
		if (!rawUserData) return
    const userData = JSON.parse(rawUserData)

		const userPayload ={ 
				...userData,
				isSignedIn: true, 
				hasAuthenticatedGitlab: isAuth,
			}
			dispatch({ 
				type: UserOption.SetUser, 
				payload: userPayload
			})

			localStorage.setItem(LocalStorageName.UserData,JSON.stringify(userPayload))

  }, [dispatch])

	const hasAuthenticatedSlack = React.useCallback((isAuth: boolean) => {
		const rawUserData = localStorage.getItem(LocalStorageName.UserData)
		if (!rawUserData) return
    const userData = JSON.parse(rawUserData)

		const userPayload ={ 
				...userData,
				isSignedIn: true, 
				hasAuthenticatedSlack: isAuth,
			}
			dispatch({ 
				type: UserOption.SetUser, 
				payload: userPayload
			})

			localStorage.setItem(LocalStorageName.UserData,JSON.stringify(userPayload))
  }, [dispatch])

	React.useEffect(() => {
		if (user.isSignedIn) return

		const rawUserData = localStorage.getItem(LocalStorageName.UserData)
		if (!rawUserData) return
    const userData = JSON.parse(rawUserData)

    if (userData.accessToken && userData.accessTokenExpirationDate > new Date().getTime()) {
			const userPayload ={ 
				...userData,
				isSignedIn: true, 
				hasAuthenticatedGitlab: user.hasAuthenticatedGitlab ? user.hasAuthenticatedGitlab : userData.hasAuthenticatedGitlab,
				hasAuthenticatedSlack: user.hasAuthenticatedSlack ? user.hasAuthenticatedSlack : userData.hasAuthenticatedSlack
			}
			dispatch({ 
				type: UserOption.SetUser, 
				payload: userPayload
			})

			localStorage.setItem(LocalStorageName.UserData,JSON.stringify(userPayload))
    }
  }, [user, dispatch])

  React.useEffect(() => {
		if (!user.isSignedIn || !user.accessTokenExpirationDate) return

    let signoutTimer
    if (user.accessToken && user.accessTokenExpirationDate < new Date().getTime()) {
      const remainingTime = user.accessTokenExpirationDate - new Date().getTime()
      signoutTimer = setTimeout(refreshAccessToken, remainingTime)
    } else {
      clearTimeout(signoutTimer)
    }
  }, [user, refreshAccessToken])

	return { user, signin, signout, isSignedIn, hasAuthenticatedGitlab, hasAuthenticatedSlack }
}

