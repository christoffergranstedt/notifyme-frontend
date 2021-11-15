import React from 'react'
import { useHistory } from 'react-router'

import { useAuth } from '../../Hooks/useAuth'
import Navbar from '../Navbar/Navbar'
import styled from 'styled-components'
import { LinkDescription } from '../../Utils/types/LinkDescription'
import mainLogo from '../../assets/images/notifyMe.png'

interface HeaderProps {
	links: LinkDescription[]
}

const StyledHeader = styled.header`
	display: flex;
	background: rgb(90, 166, 186);
	justify-content: center;
	align-items: center;
	height: 75px;
	font-size: 22px;

	button {
		height: 30px;
		margin: 50px;
		background: rgb(90, 166, 186);
		border: none;
		cursor: pointer;
		color: white;
		font-size: 22px;

		&:hover {
			color: rgb(230, 230, 230)
		}
	}

	img {
		max-width: 300px;
	}
`

export const Header: React.FC<HeaderProps> = ({ links }) => {
	const { user, signout } = useAuth()
	const history = useHistory()

	const signoutUser = () => {
		signout()
		history.push('/')
	}

	return (
		<StyledHeader>
			<img src={mainLogo} alt="main logo"/>
			<Navbar links={links}/>
			{ user.isSignedIn ? <button onClick={signoutUser}>sign out</button> : null }
		</StyledHeader>
	)
}

export default Header