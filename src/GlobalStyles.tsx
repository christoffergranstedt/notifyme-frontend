import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html, body, div, header, nav, main, footer, section, h1, h2, h3, h4, h5, h6, p, ul, li {
    margin: 0px;
    padding: 0px;
    display: block;
    box-sizing: border-box;
  }

  body {
    background: rgb(245, 245, 245);
    font-size: 12px;
		height: 100vh;
		font-family: 'Lato', sans-serif;
		font-family: 'Noto Sans JP', sans-serif;
  }

  h1, h2, h3, h4, h5, p {
    font-weight: 400;
  }

	h1 {
		font-size: 28px;
		margin: 12px 10px;
	}
`