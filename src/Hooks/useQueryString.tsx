import {useLocation} from 'react-router-dom'

export const useQueryString = (): URLSearchParams => {
	return new URLSearchParams(useLocation().search)
}
