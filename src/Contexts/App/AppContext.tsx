import React, { Dispatch } from "react";
import { EventActions, EventType, initialEventState, eventReducer } from "../Event/EventReducer";
import { GroupActions, GroupType, initialGroupState, groupReducer } from "../Group/GroupReducer";
import { userReducer, UserActions, UserType,	initialUserState } from '../User/UserReducer'

type InitialStateType = {
  user: UserType;
	group: GroupType;
	event: EventType
}

const initialState = {
  user: initialUserState,
	group: initialGroupState,
	event: initialEventState
}

export const AppContext = React.createContext<{
  state: InitialStateType;
  dispatch: Dispatch<UserActions | GroupActions | EventActions>;
}>({
  state: initialState,
  dispatch: () => null
})

const mainReducer = (
  { user, group, event }: InitialStateType,
  action: UserActions | GroupActions | EventActions
) => ({
  user: userReducer(user, action),
	group: groupReducer(group, action),
	event: eventReducer(event, action)
})

export const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(mainReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}