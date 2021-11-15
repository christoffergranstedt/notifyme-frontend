import React from 'react'
import styled from 'styled-components'

import Sidebar from './Components/Sidebar'
import { useParams } from 'react-router'
import Events from './Components/Events'
import { Subs } from './Subs'
import NotificationSettings from './Components/NotificationSettings'
import { useGroupAndProject } from '../../Hooks/useGroupAndProject'
import { useEvent } from '../../Hooks/useEvent'
import { useWebsocket } from '../../Hooks/useWebsocket'

interface DashboardPageProps {

}

const StyledDiv = styled.div`
	display: flex;
	height: 100vh;
	justify-content: center;

	h1 {
		display: block;
		text-align: center;
		flex: 1 1 100%;
	}
`

interface Params {
	userId: string;
	subId: string;
}

export const DashboardPage: React.FC<DashboardPageProps> = (props) => {
	const{ subId } = useParams<Params>()
	const { fetchGroups, setSelectedGroup, selectedGroup, fetchProjectsInGroup ,setProjectsInSelectedGroup, setGroups } = useGroupAndProject()
	const { events }  = useEvent()
	const { pingServer } = useWebsocket()

	React.useEffect(() => {
		const fetch = async () => {
			const groups = await fetchGroups()
			if (groups) {
				setGroups(groups)
				setSelectedGroup(groups[0])
			} 
		}
		if (!selectedGroup) fetch()
	}, [fetchGroups, setGroups, setSelectedGroup, selectedGroup])

	React.useEffect(() => {
		const fetch = async () => {
			const projects = await fetchProjectsInGroup()
			if (projects) setProjectsInSelectedGroup(projects)
		}

		if (selectedGroup) fetch()
	}, [selectedGroup, fetchProjectsInGroup, setProjectsInSelectedGroup])

/* 	React.useEffect(() => {
		connectToWebsocketServer()
	}, [connectToWebsocketServer]) */

	React.useEffect(() => {
		setTimeout(async () => {
			await pingServer()
		}, 1000 * 60)
	}, [pingServer])

	let componentToShow
	if (subId === Subs.Events) componentToShow = <Events events={events}/>
	if (subId === Subs.Notifications) componentToShow = <NotificationSettings/>

	return (
		<StyledDiv>
			<Sidebar/>
			{componentToShow}
		</StyledDiv>
	)
}

export default DashboardPage