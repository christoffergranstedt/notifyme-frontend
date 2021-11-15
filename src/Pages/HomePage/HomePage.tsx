import styled from 'styled-components'

const StyledDiv = styled.div`
	background: rgb(35, 94, 145);
	color: white;
	height: 95vh;

	h1 {
		text-align: center;
		font-size: 72px;
		font-weight: 300;
		padding-top: 300px;
		margin: 0;

	}

	h4 {
		text-align: center;
		font-size: 24px;
		margin: 0;
	}
`

interface HomePageProps {

}

export const HomePage: React.FC<HomePageProps> = (props) => {

	return (
		<StyledDiv>
			<h1>Notifyme</h1>
			<h4>your Gitlab event notifier</h4>
		</StyledDiv>
	)
}

export default HomePage