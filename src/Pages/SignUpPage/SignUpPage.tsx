import { HTTPMethod } from '@granch_web/common'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useRequest } from '../../Hooks/useRequest'

import SignUpForm, { UserInput } from "./Components/SignUpForm"
import styled from 'styled-components'

const StyledDiv = styled.div`
	padding: 0 10%;
`

interface SignUpPageProps {

}

export const SignUpPage: React.FC<SignUpPageProps> = (props) => {
	const history = useHistory()
	const [isLoading] = React.useState<boolean>(false)
	const { sendRequest } = useRequest()

	const onFormSubmit = async (userInput: UserInput) => {
		try {
			console.log('hej på dig')
			await sendRequest({ url: '/accounts/register', method: HTTPMethod.POST, body: userInput, token: null })
			history.push('/auth/signin')
		} catch (error) {
			console.log(error)
		}		
	}

	return (
		<StyledDiv>
			<h1>Sign Up</h1>
			<SignUpForm onFormSubmit={onFormSubmit} isLoading={isLoading}/>
		</StyledDiv>
	)
}

export default SignUpPage