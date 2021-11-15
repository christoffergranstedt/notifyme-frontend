import React from 'react'

import { UserInput } from "./Components/SignInForm"
import SignInForm from "./Components/SignInForm"
import { useAuth } from '../../Hooks/useAuth'
import styled from 'styled-components'

const StyledDiv = styled.div`
	padding: 0 10%;

`

interface SignInpageProps {

}

export const SignInPage: React.FC<SignInpageProps> = (props) => {
	const [isLoading] = React.useState<boolean>(false)
	const { signin } = useAuth()

	const onFormSubmit = async (userInput: UserInput) => {
		const signingIn = async () => {
			try {
				await signin(userInput)
			} catch (error) {
				console.log(error)
			}
		}

		signingIn()

	}

	return (
		<StyledDiv>
			<h1>Sign In</h1>
			<SignInForm onFormSubmit={onFormSubmit} isLoading={isLoading}/>
		</StyledDiv>
	)
}

export default SignInPage