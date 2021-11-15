import Loader from 'react-loader-spinner'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import Input from '../../../Components/Input/Input'
import ButtonSubmit from '../../../Components/ButtonSubmit/ButtonSubmit'

const StyledDiv = styled.div`
	display: block;
`

interface SignUpFormProps {
	onFormSubmit: Function;
	isLoading: boolean;
}

export type UserInput = {
	username: string;
	password: string;
}

const SignUpForm = ({onFormSubmit, isLoading}: SignUpFormProps) => {
	const { register, handleSubmit } = useForm<UserInput>()

  const onSubmit = (data: UserInput) => {
    onFormSubmit(data)
  }


	return (
		<StyledDiv>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input label='Username' register={register} name='username'/>
				<Input type='password' label='Password' register={register} name='password'/>
				<ButtonSubmit>{isLoading ? <Loader type="ThreeDots" color="#cccccc" height={10} /> : 'Sign up' }</ButtonSubmit>
			</form>
		</StyledDiv>
	)

}

export default SignUpForm

