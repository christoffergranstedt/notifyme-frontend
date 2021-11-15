import React from 'react'
import { NavLink } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import styled from 'styled-components'
import { LinkDescription } from '../../Utils/types/LinkDescription'

const StyledNav = styled.nav`
	display: block;

	ul {
		
		li {
			display: inline-block;
			margin: 50px;

			a {
				color: white;
				text-decoration: none;

				&:hover {
					color: rgb(220, 220, 220)
				}
			}
		}

	}	
`

interface NavbarProps {
	links: LinkDescription[]
}

export const Navbar: React.FC<NavbarProps> = ({ links }) => {

	return (
		<StyledNav>
			<ul>
				{links.map(link => <li key={uuid()}><NavLink to={link.link} activeClassName='active' exact>{link.name}</NavLink></li>)}
			</ul>
		</StyledNav>
	)
}

export default Navbar