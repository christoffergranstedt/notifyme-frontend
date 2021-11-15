import { ActionMap } from '../../Utils/types/ActionMap'
import { EventActions } from '../Event/EventReducer'
import { UserActions } from '../User/UserReducer'

export enum GroupOption {
  SetGroups = "SET_GROUPS",
  SetSelectedGroup = "SET_SELECTED_GROUP",
	SetProjectsInSelectedGroup = 'SET_PROJECTS_IN_SELECTED_GROUP',
	ResetGroups = 'RESET_GROUPS',
	ResetSelectedGroup = 'RESET_SELECTED_GROUP',
	ResetProjectsInSelectedGroup = 'RESET_PROJECTS_IN_SELECTED_GROUP',
	UpdateProjectNotifications = 'UPDATE_PROJECTS_NOTIFICATIONS'
}

export interface UpdateProjectNotifications {
	projectId: string;
	wantsIssueEvents: boolean;
	wantsReleaseEvents: boolean;
}

export interface Notifications {
	id: string;
	wantsReleaseEvents: boolean;
	wantsIssueEvents: boolean;
}

export interface Group {
	groupId: number,
	fullName: string
}

export interface Project {
	projectId: string,
	name: string,
	nameWithNameSpace: string,
	url: string,
	wantsReleaseEvents: boolean,
	wantsIssueEvents: boolean
}

export interface ProjectNotifications {
	id: string,
	projectId: string,
	name: string,
	nameWithNameSpace: string,
	url: string,
	wantsReleaseEvents: boolean,
	wantsIssueEvents: boolean
}

export type GroupType = {
	groups: Group[] | null
	selectedGroup: Group | null
	projectsInSelectedGroup: Project[] | null
}

type GroupsPayload = {
  [GroupOption.SetGroups]: {
		groups: Group[]
  };
  [GroupOption.SetSelectedGroup]: {
		selectedGroup: Group
	 };
  [GroupOption.SetProjectsInSelectedGroup]: { 
		projectsInSelectedGroup: Project[]
	};
  [GroupOption.ResetGroups]: {};
  [GroupOption.ResetSelectedGroup]: {};
  [GroupOption.ResetProjectsInSelectedGroup]: {};
  [GroupOption.UpdateProjectNotifications]: {
		projectId: string;
		wantsIssueEvents?: boolean;
		wantsReleaseEvents?: boolean;	
	};
}

export const initialGroupState = {
	groups: [],
	selectedGroup: null,
	projectsInSelectedGroup: null
}

export type GroupActions = ActionMap<GroupsPayload>[keyof ActionMap<GroupsPayload>]

export const groupReducer = (state: GroupType, action: GroupActions | UserActions | EventActions) => {
  switch(action.type) {
    case GroupOption.SetGroups:
      return {
        ...state,
        groups: action.payload.groups
      }
    case GroupOption.SetSelectedGroup:                             
      return {
        ...state,
        selectedGroup: action.payload.selectedGroup,
				projectsInSelectedGroup: null
      }
    case GroupOption.SetProjectsInSelectedGroup:                             
      return {
        ...state,
        projectsInSelectedGroup: action.payload.projectsInSelectedGroup
      }
    case GroupOption.ResetGroups:                             
      return {
        ...state,
				groups: [],
				selectedGroup: null,
				projectsInSelectedGroup: null
      }
    case GroupOption.ResetSelectedGroup:                             
      return {
        ...state,
				selectedGroup: null,
				projectsInSelectedGroup: null
      }
    case GroupOption.ResetProjectsInSelectedGroup:                             
      return {
        ...state,
				projectsInSelectedGroup: null
      }
    case GroupOption.UpdateProjectNotifications:
			const projectId = action.payload.projectId                            

			const index = state.projectsInSelectedGroup?.findIndex(project => project.projectId === projectId)
			const project = state.projectsInSelectedGroup && state.projectsInSelectedGroup.find(stateProject => stateProject.projectId === projectId)

			if (!project) throw new Error()
			const wantsIssueEvents = action.payload.wantsIssueEvents === undefined ? project.wantsIssueEvents : action.payload.wantsIssueEvents
			const wantsReleaseEvents = action.payload.wantsReleaseEvents === undefined ? project.wantsReleaseEvents : action.payload.wantsReleaseEvents



			if (wantsIssueEvents === undefined || wantsReleaseEvents === undefined) throw new Error()
			const newProject = { projectId: project.projectId, name: project.name, nameWithNameSpace: project.nameWithNameSpace, url: project.url, wantsIssueEvents, wantsReleaseEvents }

			if (!state.projectsInSelectedGroup) throw new Error()

			if (index === undefined) throw new Error()
			state.projectsInSelectedGroup[index] = newProject

			return {
				...state
				}
    default:
      return state
  }
}
