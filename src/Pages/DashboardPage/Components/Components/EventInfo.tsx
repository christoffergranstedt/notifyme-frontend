import styled from 'styled-components'
import moment from 'moment'

const StyledDiv = styled.div`
	text-align: center;
	background: white;
	margin: 10px 0px;
	display: block;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.15);

	div.new {
		background: rgb(90, 166, 186);
		height: 10px;
		width: 10px;
		border-radius: 50%;
		display: inline-block;
	}
`

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

interface EventProps {
	event: EventAttributes
}

export const EventInfo: React.FC<EventProps> = ({ event }) => {

	return (
		<StyledDiv>
			{ event.userLastActiveOnSite && new Date(event.date).getTime() > new Date(event.userLastActiveOnSite).getTime() && <div className="new"/>}
			<p>Event Type: {event.eventType} </p>
			<p>Project Id: {event.projectId} </p>
			<p>Title: {event.name}</p>
			<p>Description: {event.description}</p>
			<p>Author: {event.author}</p>
			<p>Date: {moment(event.date).format('YYYY-MM-DD HH:mm')} </p>
		</StyledDiv>
	)
}

export default EventAttributes

