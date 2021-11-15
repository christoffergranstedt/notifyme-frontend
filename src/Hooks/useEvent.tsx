import { HTTPMethod } from '@granch_web/common'
import React from 'react'
import { AppContext } from '../Contexts/App/AppContext'
import { useAuth } from './useAuth'
import { useRequest } from './useRequest'
import { EventAttributes, EventOption } from '../Contexts/Event/EventReducer'
import { useGroupAndProject } from './useGroupAndProject'

interface GetAllEvents {
	events: EventAttributes[]
}

export const useEvent = () => {
	const { state: { event }, dispatch } = React.useContext(AppContext)
	const { user } = useAuth()
	const { selectedGroup } = useGroupAndProject()
	const { sendRequest } = useRequest()

	const { hasAuthenticatedGitlab, accessToken } = user

	const sortEvents = React.useCallback((events: EventAttributes[]) => {
		if (events && events.length > 0) {
			events.sort((a: EventAttributes, b: EventAttributes) => {
				return new Date(b.date).getTime() - new Date(a.date).getTime()
			})
			return events
		} 
  }, [])

	const fetchEvents = React.useCallback(async () => {
		try {
			if (hasAuthenticatedGitlab && selectedGroup) {
				const data: GetAllEvents = await sendRequest({ url: `/api/events/groups/${selectedGroup.groupId}`, method: HTTPMethod.GET, token: accessToken })
				return data.events
			}
		} catch (error) {
			console.log(error)
		}
	}, [hasAuthenticatedGitlab, accessToken, sendRequest, selectedGroup])

	const setEvents = React.useCallback(async (events: EventAttributes[]) => {
		try {
			const sortedEvents = sortEvents(events)
			if (!sortedEvents) return
			dispatch({ type: EventOption.SetEvents, payload: { events: sortedEvents }})
		} catch (error) {
			console.log(error)
		}
  }, [dispatch, sortEvents])
	
	const addEvent = React.useCallback(async (eventData: EventAttributes) => {
		try {
			if (eventData) dispatch({ type: EventOption.AddEvent, payload: { event: eventData } })
			const copyEvents = event.events.slice()

			const sortedEvents = sortEvents(copyEvents)
			if (!sortedEvents) return
			dispatch({ type: EventOption.SetEvents, payload: { events: sortedEvents }})

		} catch (error) {
			console.log(error)
		}
  }, [dispatch, sortEvents, event.events])

	const removeEvents = React.useCallback(async () => {
		try {
			if (event.events) dispatch({ type: EventOption.RemoveEvents, payload: { } })
		} catch (error) {
			console.log(error)
		}
  }, [dispatch, event.events])

	

	return {
		events: event.events,
		fetchEvents,
		setEvents,
		addEvent,
		removeEvents
	}
}

