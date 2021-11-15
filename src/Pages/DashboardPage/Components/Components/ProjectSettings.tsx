import React from 'react'
import styled from 'styled-components'
import { Project } from '../../../../Contexts/Group/GroupReducer'
import { useGroupAndProject } from '../../../../Hooks/useGroupAndProject'

const StyledDiv = styled.div`
	text-align: center;
	background: white;
	margin: 10px 0px;
	display: block;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.15);

	button {
		border-radius: 10px;
		border: none;
		padding: 5px 15px;
		margin: 5px;
		cursor: pointer;
		color: white;

		&.subscribe {
			background: #13aa13;

			&:hover {
				background: #20b920;
			}
		}

		&.unsubscribe {
			background: #c22b2b;

			&:hover {
				background: #cc3a3a;
			}
		}
	}
`

interface ProjectSettingsProps {
	indexOfProject: number;
}

export const ProjectSettings = ({ indexOfProject }: ProjectSettingsProps) => {
	const [project, setProject] = React.useState<Project | null>()
	const { updateProjectNotifications, projectsInSelectedGroup } = useGroupAndProject()

	React.useEffect(() => {
		if (projectsInSelectedGroup) setProject(projectsInSelectedGroup[indexOfProject] ? projectsInSelectedGroup[indexOfProject] : null)
	}, [projectsInSelectedGroup, indexOfProject])

	if (!project) {
		return (
			<StyledDiv>
				<p>No project could be found</p>
			</StyledDiv>
		)

	} else {
		return (
			<StyledDiv>
				<h2>{project.name}</h2>
				<p>Issue Events: {project.wantsIssueEvents ? 
					<button className="unsubscribe" onClick={() => updateProjectNotifications({ projectId: project.projectId, wantsIssueEvents: false }) }>Unsubscribe</button> : 
					<button className="subscribe" onClick={() => updateProjectNotifications({ projectId: project.projectId, wantsIssueEvents: true })}>Subscribe</button> 
				} </p>
				<p>Release Events: {project.wantsReleaseEvents ? 
					<button className="unsubscribe" onClick={() => updateProjectNotifications({ projectId: project.projectId, wantsReleaseEvents: false }) }>Unsubscribe</button> : 
					<button className="subscribe" onClick={() => updateProjectNotifications({ projectId: project.projectId, wantsReleaseEvents: true })}>Subscribe</button> 
				} </p>
			</StyledDiv>
		)
	}
}

export default ProjectSettings
