import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
	width: 160px;
	height: 40px;
	margin-top: 10px;
	margin-right: 10px;
	background: rgb(90, 166, 186);
	border-radius: 8px;
	color: white;
	text-decoration: none;
	font-size: 16px;
	border: none;
	cursor: pointer;

	&:hover {
		background: rgb(117, 188, 206);
	}
`

interface ButtonSubmitProps {
	children: React.ReactNode;
}

const ButtonSubmit = ({children}: ButtonSubmitProps) => {
  return (
    <StyledButton type='submit'>
      {children}
    </StyledButton>
  )
}

export default ButtonSubmit