import React from 'react'
import styled from 'styled-components'
import { useGroupAndProject } from '../../../Hooks/useGroupAndProject'
import { v4 as uuid } from 'uuid'
import EventAttributes, { EventInfo } from './Components/EventInfo'
import { useEvent } from '../../../Hooks/useEvent'

const StyledDiv = styled.div`
	flex: 1 1 75%;

	div.new {
		background: rgb(90, 166, 186);
		height: 10px;
		width: 10px;
		border-radius: 50%;
		display: inline-block;
	}

`

interface EventsProps {
	events: EventAttributes[]
}

export const Events: React.FC<EventsProps> = ({ events }) => {
	const { selectedGroup } = useGroupAndProject()
		const { fetchEvents, setEvents }  = useEvent()

		React.useEffect(() => {
		const fetch = async () => {
			const fetchedEvents = await fetchEvents()
			if (fetchedEvents && fetchedEvents.length > 0) setEvents(fetchedEvents)
		}

		if (selectedGroup) fetch()
	}, [selectedGroup, fetchEvents, setEvents])

	return (
		<StyledDiv>
			<p></p>
			<h1>Events - {selectedGroup?.fullName}</h1>
			{events.map(event => {
				return <EventInfo key={uuid()} event={event}/>
			})}
		</StyledDiv>
	)
}

export default Events

