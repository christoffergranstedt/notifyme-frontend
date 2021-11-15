import React from 'react'
import { useCookies } from 'react-cookie'
import { CookieName } from '../../Utils/enums/CookieName'
import styled from 'styled-components'
import { useAuth } from '../../Hooks/useAuth'
import { useQueryString } from '../../Hooks/useQueryString'
import { useGroupAndProject } from '../../Hooks/useGroupAndProject'

const StyledDiv = styled.div`
	padding: 0 10%;
	text-align: center;

	h1 {
		font-size: 36px;
	}

	button {
		cursor: pointer;
		margin: 20px;
		background: rgb(90, 166, 186);
		color: white;
		font-size: 22px;
		padding: 15px 35px;
		border-radius: 5px;
		border: none;

		&:hover {
			background: rgb(117, 188, 206);
		}

		&.disabled {
			background: rgb(200, 200, 200);

			&:hover {
				background: rgb(200, 200, 200);
			}
		}
	}
`

interface ProfilePageProps {

}

export const ProfilePage: React.FC<ProfilePageProps> = (props) => {
	const { user, hasAuthenticatedGitlab, hasAuthenticatedSlack } = useAuth()
	const { fetchGroups, setSelectedGroup } = useGroupAndProject()
	const { hasAuthenticatedGitlab: isAuthenticatedGitlab, hasAuthenticatedSlack: isAuthenticatedSlack } = user

	const setCookie = useCookies([CookieName.JWT])[1]
	const queries = useQueryString()

	React.useEffect(() => {
		const authGitlab = queries.get('auth-gitlab')
		const authSlack = queries.get('auth-slack')

		const fetch = async () => {
			const groups = await fetchGroups()
			if (groups) setSelectedGroup(groups[0])
		}

		if (authGitlab === 'true' && !isAuthenticatedGitlab) {
			hasAuthenticatedGitlab(true)
			fetch()
		} 
		if (authSlack === 'true' && !isAuthenticatedSlack) hasAuthenticatedSlack(true)

	}, [hasAuthenticatedGitlab, hasAuthenticatedSlack, queries, isAuthenticatedGitlab, isAuthenticatedSlack, fetchGroups, setSelectedGroup])

	const authenticateGitlabAccount = async () => {
		setCookie(CookieName.JWT, user.accessToken, { sameSite: 'lax', path: '/' })
		setTimeout(() => {
			window.location.replace('/accounts/gitlab/authenticate')
		}, 500)	
	}

	const authenticateSlackAccount = async () => {	
		setCookie(CookieName.JWT, user.accessToken, { sameSite: 'lax', path: '/' })
		setTimeout(() => {
			window.location.replace('/accounts/slack/authenticate')
		}, 500)	
	}

	return (
		<StyledDiv>
			<h1>Profile Page - {user.username}</h1>
			{ !user.hasAuthenticatedGitlab ? <button onClick={authenticateGitlabAccount}>Authenticate Gitlab</button> : <button className="disabled" disabled={true}>Gitlab is authenticated</button> }
			{ !user.hasAuthenticatedSlack ? <button onClick={authenticateSlackAccount}>Authenticate Slack</button> :	<button className="disabled" disabled={true}>Slack is authenticated</button> }
		</StyledDiv>
	)
}

export default ProfilePage