import { HTTPMethod } from '@granch_web/common';
import React from 'react'
import io from "socket.io-client";
import { GitlabEvent } from '../Utils/types/GitlabEvent'
import { useAuth } from './useAuth'
import { useEvent } from './useEvent'
import { useGroupAndProject } from './useGroupAndProject'
import { useRequest } from './useRequest';

export const useWebsocket = () => {
	const { user: { accessToken } } = useAuth()
	const { selectedGroup } = useGroupAndProject()
	const [startedPingingServer, setStartedPingingServer] = React.useState(false)
	const { addEvent } = useEvent()
  const { sendRequest } = useRequest()

	const createUserRoom = React.useCallback((socketInstance) => {
		if (socketInstance.connected) {
			socketInstance?.emit("join", { accessToken: accessToken })
		}
	}, [accessToken])

	const listenToEvents = React.useCallback((socketInstance) => {
		socketInstance?.on("event", (event: GitlabEvent) => {
			if (selectedGroup?.groupId.toString() === event.groupId) {
				addEvent(event)
			}
		})
	}, [selectedGroup, addEvent])

  const connectToWebsocketServer = React.useCallback(() => {
		if (!process.env.REACT_APP_SOCKET_SERVER_URL) throw new Error('REACT_APP_SOCKET_SERVER needs to be set')
		const client = io(process.env.REACT_APP_SOCKET_SERVER_URL, {
			secure: true,
			rejectUnauthorized: false
		})
		createUserRoom(client)
		listenToEvents(client)
	}, [createUserRoom, listenToEvents])

  const pingServer = React.useCallback(() => {
		if (!startedPingingServer) {
			setStartedPingingServer(true)
			setTimeout(async () => {
				await sendRequest({ url: `/events/ping/`, method: HTTPMethod.GET, token: accessToken })
			}, 1000 * 60)
		}	
	}, [sendRequest, accessToken, startedPingingServer])

  return { connectToWebsocketServer, createUserRoom, pingServer }
}
