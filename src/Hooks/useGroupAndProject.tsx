import { HTTPMethod } from '@granch_web/common'
import React from 'react'
import { AppContext } from '../Contexts/App/AppContext'
import { Group, GroupOption, Project } from '../Contexts/Group/GroupReducer'
import { useAuth } from './useAuth'
import { useRequest } from './useRequest'

interface GetAllGroups {
	groups: Group[]
}

interface GetAllGroupProjects {
	projects: Project[]
}

export const useGroupAndProject = () => {
	const { state: { group }, dispatch } = React.useContext(AppContext)
	const { user } = useAuth()
	const { sendRequest } = useRequest()

	const { hasAuthenticatedGitlab, accessToken } = user
	const { selectedGroup } = group

	const fetchGroups = React.useCallback(async () => {
		try {
			if (hasAuthenticatedGitlab) {
				const data: GetAllGroups = await sendRequest({ url: '/api/groups', method: HTTPMethod.GET, token: accessToken })
				return data.groups
			}
		} catch (error) {
			console.log(error)
		}
	}, [hasAuthenticatedGitlab, accessToken, sendRequest])

	const fetchProjectsInGroup = React.useCallback(async () => {
		try {
			if (hasAuthenticatedGitlab && selectedGroup) {
				const data: GetAllGroupProjects = await sendRequest({ url: `/api/groups/${selectedGroup.groupId}/projects`, method: HTTPMethod.GET, token: accessToken })
				return data.projects
			} 
		} catch (error) {
			console.log(error)
		}
	}, [selectedGroup, hasAuthenticatedGitlab, accessToken, sendRequest])

	const setProjectsInSelectedGroup = React.useCallback(async (projects: Project[]) => {
		try {
			if (projects && projects.length > 0) dispatch({ type: GroupOption.SetProjectsInSelectedGroup, payload: { projectsInSelectedGroup: projects }})
		} catch (error) {
			console.log(error)
		}
  }, [dispatch])

	const setSelectedGroup = React.useCallback(async (selectedGroup: Group) => {
		try {
			if (selectedGroup) dispatch({ type: GroupOption.SetSelectedGroup, payload: { selectedGroup: selectedGroup }})
		} catch (error) {
			console.log(error)
		}
  }, [dispatch])

	const setGroups = React.useCallback(async (groups: Group[]) => {
		try {
			dispatch({ type: GroupOption.SetGroups, payload: { groups: groups }})
		} catch (error) {
			console.log(error)
		}
  }, [dispatch])
	
	const updateProjectNotifications = React.useCallback(async (notificationSettings: { projectId: string, wantsIssueEvents?: boolean, wantsReleaseEvents?: boolean }) => {
		try {
			if (notificationSettings) dispatch({ type: GroupOption.UpdateProjectNotifications, payload: notificationSettings })
			if (selectedGroup) await sendRequest({ url: `/api/groups/${selectedGroup.groupId}/projects/${notificationSettings.projectId}`, method: HTTPMethod.PUT, token: accessToken, body: notificationSettings })
		} catch (error) {
			console.log(error)
		}
  }, [dispatch, sendRequest, selectedGroup, accessToken])

	return { 
		groups: group.groups, 
		selectedGroup: group.selectedGroup, 
		projectsInSelectedGroup: group.projectsInSelectedGroup, 
		setGroups, 
		setSelectedGroup, 
		setProjectsInSelectedGroup,
		fetchGroups,
		fetchProjectsInGroup,
		updateProjectNotifications,
	}
}
