import { ActionMap } from '../../Utils/types/ActionMap'
import { GroupActions } from '../Group/GroupReducer'
import { UserActions } from '../User/UserReducer'

export enum EventOption {
  SetEvents = "SET_EVENTS",
  AddEvent = "ADD_EVENT",
	RemoveEvents = 'REMOVE_EVENTS',
}

export interface EventAttributes {
	eventType: string;
	groupId: string;
	projectId: string;
	projectUrl: string;
	author: string;
	authorAvatar?: string;
	name: string;
	description: string;
	action?: string;
	date: Date;
	userLastActiveOnSite?: Date
}

export type EventType = {
	events: EventAttributes[]
}

type EventsPayload = {
  [EventOption.SetEvents]: {
		events: EventAttributes[]
  };
  [EventOption.RemoveEvents]: { };
  [EventOption.AddEvent]: { 
		event: EventAttributes
	};
}

export const initialEventState = {
	events: []
}

export type EventActions = ActionMap<EventsPayload>[keyof ActionMap<EventsPayload>]

export const eventReducer = (state: EventType, action: EventActions | UserActions | GroupActions) => {
  switch(action.type) {
    case EventOption.SetEvents:
      return {
        ...state,
        events: action.payload.events
      }
    case EventOption.RemoveEvents:                             
      return {
        ...state,
        events: []
      }
    case EventOption.AddEvent:
			state.events.push(action.payload.event)                       
      return {
        ...state,
      }
    default:
      return state
  }
}
