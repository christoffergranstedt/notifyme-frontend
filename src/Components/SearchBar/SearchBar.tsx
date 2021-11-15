import React from 'react'
import { v4 as uuid } from 'uuid'
import { Group } from '../../Contexts/Group/GroupReducer'
import { useGroupAndProject } from '../../Hooks/useGroupAndProject'
import { ActionMap } from '../../Utils/types/ActionMap'
import styled from 'styled-components'

export enum SearchBarOption {
  Set = "SET",
  Reset = "RESET",
}

export type SearchBarType = {
	activeSuggestion: number
	filteredSuggestions: Group[]
	showSuggestions: boolean
	value: string | null
}

type SearchBarPayload = {
  [SearchBarOption.Set]: {
		activeSuggestion: number
		filteredSuggestions: Group[]
		showSuggestions: boolean
		value: string
  };
  [SearchBarOption.Reset]: { };
}

export const initialUserState = {
	activeSuggestion: 0,
	filteredSuggestions: [],
	showSuggestions: false,
	value: ''
}

export type SearchBarActions = ActionMap<SearchBarPayload>[keyof ActionMap<SearchBarPayload>]

export const inputReducer = (state: SearchBarType, action: SearchBarActions) => {
  switch(action.type) {
		case SearchBarOption.Set: 
      return {
        ...state,
        activeSuggestion: action.payload.activeSuggestion,
        filteredSuggestions: action.payload.filteredSuggestions,
        showSuggestions: action.payload.showSuggestions,
        value: action.payload.value
      }
		case SearchBarOption.Reset: 
      return {
        ...state,
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        value: ''
      }
    default:
      return state
  }
}

interface SearchbarProps {
	suggestions: Group[],
	setSearchInput: Function,
	disabled: boolean,
	label: string
}

const StyledDiv = styled.div`

	label {
		font-weight: 700;
		display: block;
	}

	input {
		width: 95%;
		height: 30px;
		border: 1px solid rgb(200, 200, 200);
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		background: rgb(255, 255, 255);

		&:hover {
			background: rgb(250, 250, 250);
			border: 1px solid rgb(90, 166, 150)	
		}

		&:active {
			outline: none;
		}
		&:focus {
			outline: none;
		}
	}

	ul {
		width: 98%;
		position: relative;
		z-index: 99;
		background: white;
		border-bottom: 1px solid rgb(150, 150, 150);
		border-left: 1px solid rgb(150, 150, 150);
		border-right: 1px solid rgb(150, 150, 150);
		margin: 0px;

		li {
			margin: 0px;
			border-bottom: 1px solid rgb(200, 200, 200);
			
			&.selected {
				background: rgb(90, 166, 186);
				color: white;
			}

			&:hover {
				background: rgb(90, 166, 186);
				cursor: pointer;
				color: white;
			}

		}
	}
`

export const SearchBar = ({ suggestions = [], setSearchInput, disabled = false, label }: SearchbarProps) => {
	const { selectedGroup }  = useGroupAndProject()
  const [, setPlaceHolder] = React.useState(true)
  const [ search, dispatchSearch ] = React.useReducer(inputReducer, initialUserState)
	const inputRef = React.useRef<HTMLInputElement>(null)

  const { filteredSuggestions, showSuggestions, value, activeSuggestion } = search

	React.useEffect(() => {
		if (selectedGroup) dispatchSearch({ type: SearchBarOption.Set, payload: { value: selectedGroup.fullName, filteredSuggestions: [], showSuggestions: false, activeSuggestion: -1 } })
	}, [selectedGroup, suggestions])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.length < 2) {
      dispatchSearch({ type: SearchBarOption.Set, payload: { value: event.currentTarget.value, filteredSuggestions: [], showSuggestions: false, activeSuggestion: -1 } })
    } else { 
      const filteredSuggestions = suggestions.filter(suggestion => {
        return suggestion.fullName.toLowerCase().indexOf(event.currentTarget.value.toLowerCase()) > -1
      }).slice(0, 10)
      dispatchSearch({ type: SearchBarOption.Set, payload: { filteredSuggestions: filteredSuggestions, showSuggestions: true, activeSuggestion: -1, value: event.currentTarget.value } })
    }
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchInput(filteredSuggestions[activeSuggestion])
      return dispatchSearch({ type: SearchBarOption.Set, payload: { value: filteredSuggestions[activeSuggestion].fullName, activeSuggestion: -1, filteredSuggestions: [], showSuggestions: false } }) 
    } else if (event.key === 'ArrowUp') {
      if (filteredSuggestions.length === 0 || activeSuggestion <= 0) {
        return dispatchSearch({ type: SearchBarOption.Set, payload: { value: event.currentTarget.value, activeSuggestion: -1, filteredSuggestions: filteredSuggestions, showSuggestions: true } })
      }
      return dispatchSearch({ type: SearchBarOption.Set, payload: { activeSuggestion: activeSuggestion - 1, filteredSuggestions: filteredSuggestions, showSuggestions: true, value: filteredSuggestions[activeSuggestion - 1].fullName } })
    } else if (event.key === 'ArrowDown') {
      if (filteredSuggestions.length === 0 || activeSuggestion + 1 === filteredSuggestions.length) {
        return
      }
      return dispatchSearch({ type: SearchBarOption.Set, payload: { activeSuggestion: activeSuggestion + 1, filteredSuggestions: filteredSuggestions, showSuggestions: true, value: filteredSuggestions[activeSuggestion + 1].fullName } })
    } else if (event.key === 'Escape') {
      return dispatchSearch({ type: SearchBarOption.Set, payload: { activeSuggestion: -1, filteredSuggestions: [], showSuggestions: false, value: event.currentTarget.value } })
    } else if (event.key === 'Tab') {
			setSearchInput(filteredSuggestions[activeSuggestion])
      dispatchSearch({ type: SearchBarOption.Set, payload: { activeSuggestion: -1, filteredSuggestions: [], showSuggestions: false, value: event.currentTarget.value } })
    }
  }

  const onClick = (event: React.MouseEvent<HTMLLIElement>) => {
		const dataIndex = event.currentTarget.getAttribute('data-index')
		if (!dataIndex) throw new Error('Data-index is not set')
		const index: number = parseInt(dataIndex)

    setSearchInput && setSearchInput(filteredSuggestions[index])
    dispatchSearch({ type: SearchBarOption.Set, payload: { value: filteredSuggestions[index].fullName, activeSuggestion: -1, filteredSuggestions: [], showSuggestions: false } })
  }

  const onFocus = (event : React.FocusEvent<HTMLInputElement>) => {
    setPlaceHolder(false)
  }

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setPlaceHolder(true)
    suggestions.find(({ fullName }) => fullName.toLowerCase() === event.currentTarget.value.toLowerCase())
  }

  
  let suggestionsListComponent

  if (showSuggestions && value) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
				<ul className='suggestions'>
          {filteredSuggestions.map((suggestion, index) => {
            return (
              <li
								className={activeSuggestion === index ? 'selected' : ''}
                key={uuid()}
                onClick={onClick}
                data-index={index}
              >
                {suggestion.fullName}
              </li>
            )
          })}
        </ul>
      )
    }
  }

  return (
    <StyledDiv>
      <label>{label}</label>
      <input 
				ref={inputRef} 
				className={showSuggestions ? 'show' : ''} 
				type="text" 
				onChange={onChange} 
				onKeyDown={onKeyDown} 
				value={value ? value : ''} 
				disabled={disabled} 
				onFocus={onFocus} 
				onBlur={onBlur}
			/>
      {suggestionsListComponent}
    </StyledDiv>
  )
}

export default SearchBar