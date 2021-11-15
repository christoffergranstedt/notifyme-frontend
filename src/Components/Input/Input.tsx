import styled from 'styled-components'
const StyledDiv = styled.div`
	display: block;
	margin: 10px 0px;
	font-size: 14px;
	
	label {
		display: block;
		width: 100%
	}

	input {
		display: block;
		width: 100%;
		border: 1px solid rgb(200, 200, 200);
		border-radius: 5px;
		height: 30px;
		text-indent: 5px;
		font-size: 14px;
		background: white;

		&:hover {
			border: 1px solid rgb(5, 88, 105) 
		}
	}
`

interface InputProps {
	name: string;
	label: string;
	type?: string;
	errorText?: string;
	disabled?: boolean;
	error?: string;
	register: any;
}

const Input = ({ name, label, type = 'text', errorText, disabled, error, register }: InputProps) => {
  return (
    <StyledDiv>
      <label htmlFor={name}>
        {label}
      </label>
      <input type={type} name={name} disabled={disabled} {...register(name)}/>
      <section>
        {error && <p>{errorText}</p>}
      </section>
    </StyledDiv>
  )
}

export default Input