import { Link } from 'react-router-dom'
import styled from 'styled-components'
import SearchBar from '../../../Components/SearchBar/SearchBar'
import { Group } from '../../../Contexts/Group/GroupReducer'
import { useAuth } from '../../../Hooks/useAuth'
import { useGroupAndProject } from '../../../Hooks/useGroupAndProject'

const StyledDiv = styled.div`
	padding: 5px;
	flex: 1 1 25%;
	background: rgb(235, 235, 235);
	border-right: 1px solid rgb(150, 150, 150);
	justify-self: center;
	text-align: center;

	ul.sidebar {
		margin-left: 10px;
		margin-top: 20px;
		text-align: left;

		li {
			margin: 20px 0px;
			
			a {
				font-size: 22px;
				color: rgb(35, 94, 145);
				text-decoration: none;

				&:hover {
					color: rgb(56, 116, 168);
				}
			}
		}
	}
`

interface SidebarProps {

}

export const Sidebar: React.FC<SidebarProps> = (props) => {

	const { user } = useAuth()
	const { groups, setSelectedGroup } = useGroupAndProject()

	const setSearchInput = (group: Group) => {
		setSelectedGroup(group)
	}


	return (
		<StyledDiv>
			{ user.isSignedIn && groups && groups.length > 0 && <SearchBar suggestions={groups} setSearchInput={setSearchInput} disabled={false} label='Choose a group (search group by typing..)' /> }
			<ul className="sidebar">
				<li><Link to={`/dashboard/${user.userId}/events`}>Events</Link></li>
				<li><Link to={`/dashboard/${user.userId}/notifications`}>Notifications</Link></li>
			</ul>
		</StyledDiv>
	)
}

export default Sidebar

