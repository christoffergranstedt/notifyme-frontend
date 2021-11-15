import React from 'react'
import { ProjectSettings } from './Components/ProjectSettings'
import Loader from 'react-loader-spinner'
import { v4 as uuid } from 'uuid'
import { useGroupAndProject } from '../../../Hooks/useGroupAndProject'
import styled from 'styled-components'
import { Project } from '../../../Contexts/Group/GroupReducer'
import { useAuth } from '../../../Hooks/useAuth'

const StyledDiv = styled.div`
	flex: 1 1 75%;
	justify-self: center;

	button.load-more {
		border-radius: 10px;
		border: none;
		padding: 10px 25px;
		margin: 5px;
		cursor: pointer;
		color: white;
		background: rgb(90, 166, 186);
		font-size: 22px;
		margin-left: 20px;

		&:hover {
			background: rgb(117, 188, 206);
		}
	}
`

interface NotificationSettingsProps {

}

const projectsIncrement = 10

export const NotificationSettings: React.FC<NotificationSettingsProps> = (props) => {
	const { projectsInSelectedGroup, selectedGroup } = useGroupAndProject()
	const [projectsToShow, setProjectsToShow] = React.useState<Project[]>([])
	const [numberOfProjectsToShow, setNumberOfProjectsToShow] = React.useState<number>(10)
	const { user } = useAuth()

	React.useEffect(() => {
		if (projectsInSelectedGroup) {
			setProjectsToShow(projectsInSelectedGroup.slice(0, numberOfProjectsToShow))
		}
	}, [projectsInSelectedGroup, numberOfProjectsToShow])

	const loadMore = () => {
		setNumberOfProjectsToShow(numberOfProjectsToShow + projectsIncrement)
	}

	if (!user.hasAuthenticatedSlack) {
		return (
			<StyledDiv>
				<h1>Notification Settings Page</h1>
				<p>Please authenticate your slack account (on profile page) before you can change your notification settings</p>
			</StyledDiv>
		)
	}

	return (
		<StyledDiv>
			<h1>Notification Settings For Group "{selectedGroup?.fullName}"</h1>
			{ !projectsToShow && <Loader type="ThreeDots" color="#cccccc" height={30} /> }
			{ projectsToShow && (
				projectsToShow.map((project: Project, index: number) => {
					return <ProjectSettings key={uuid()} indexOfProject={index}/>
				})
			) }
			{ projectsInSelectedGroup && numberOfProjectsToShow < projectsInSelectedGroup.length && <button className="load-more" onClick={loadMore}>Load more</button>}
		</StyledDiv>
	)
}

export default NotificationSettings