import { ActionMap } from '../../Utils/types/ActionMap'
import { EventActions } from '../Event/EventReducer'
import { GroupActions } from '../Group/GroupReducer'

export enum UserOption {
  SetUser = "SET_USER",
  RemoveUser = "REMOVE_USER",
	UpdateTokens = 'UPDATE_USER_TOKENS',
	HasAuthenticatedGitlab = 'AUTH_GITLAB',
	HasAuthenticatedSlack = 'AUTH_SLACK'
}

export type UserType = {
	isSignedIn: boolean;
	userId: number | null;
	username: string | null;
	accessToken: string | null;
	accessTokenExpirationDate: number | null;
	refreshToken: string | null;
	hasAuthenticatedGitlab: boolean;
	hasAuthenticatedSlack: boolean;
}

type UserPayload = {
  [UserOption.SetUser]: {
		isSignedIn: boolean;
		userId: number;
		username: string;
		accessToken: string;
		accessTokenExpirationDate: number;
		refreshToken: string;
		hasAuthenticatedGitlab: boolean,
		hasAuthenticatedSlack: boolean
  };
  [UserOption.RemoveUser]: { };
  [UserOption.UpdateTokens]: { 
		accessToken: string;
		accessTokenExpirationDate: number;
		refreshToken: string;
	};
  [UserOption.HasAuthenticatedGitlab]: { 
		hasAuthenticatedGitlab: boolean;
	};
  [UserOption.HasAuthenticatedSlack]: { 
		hasAuthenticatedSlack: boolean;
	};
}

export const initialUserState = {
	isSignedIn: false,
	userId: null,
	username: null,
	accessToken: null,
	accessTokenExpirationDate: null,
	refreshToken: null,
	hasAuthenticatedGitlab: false,
	hasAuthenticatedSlack: false
}

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>]

export const userReducer = (state: UserType, action: GroupActions | UserActions | EventActions) => {
  switch(action.type) {
    case UserOption.SetUser:
      return {
        ...state,
        isSignedIn: action.payload.isSignedIn,
        userId: action.payload.userId,
        username: action.payload.username,
        accessToken: action.payload.accessToken,
        accessTokenExpirationDate: action.payload.accessTokenExpirationDate,
				refreshToken: action.payload.refreshToken,
				hasAuthenticatedGitlab: action.payload.hasAuthenticatedGitlab,
				hasAuthenticatedSlack: action.payload.hasAuthenticatedSlack
      }
    case UserOption.RemoveUser:                             
      return {
        ...state,
        isSignedIn: false,
        userId: null,
        username: null,
        accessToken: null,
        accessTokenExpirationDate: null,
				refreshToken: null,
				hasAuthenticatedGitlab: false,
				hasAuthenticatedSlack: false
      }
    case UserOption.UpdateTokens:                             
      return {
        ...state,
        accessToken: null,
        accessTokenExpirationDate: null,
				refreshToken: null
      }
    case UserOption.HasAuthenticatedGitlab:
			return {
				...state,
				hasAuthenticatedGitlab: action.payload.hasAuthenticatedGitlab
			}
    case UserOption.HasAuthenticatedSlack:
			return {
				...state,
				hasAuthenticatedSlack: action.payload.hasAuthenticatedSlack
			}
    default:
      return state
  }
}
