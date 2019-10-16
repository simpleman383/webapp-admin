import React, { useState } from 'react'
import Payture from '../../services/backend'


import Group from '../list-group'
import SimpleList from  '../simple-list'

import Selector from './__selector'



const ListView = ({ items, actionReducer }) => {

	const { filter, group, sort } = actionReducer 

	const [ actionState, setStateForAction ] = useState({
		filter: filter ? filter.types[0].key : null,
		group: group ? group.types[0].key : null,
		sort: sort ? sort.types[0].key : null,
	})

	const onSelectorClicked = (type, action) => {
		if ( typeof(actionState[action]) !== 'undefined' ) {
			setStateForAction({ [action] : type })
		}
	}

	const process = (items) => {
		if (!items || !items.length) {
			return []
		}

		let preprocessed = [...items]

		if (actionState.filter) {
			preprocessed = filter.process(preprocessed, actionState.filter)
		}
	
		if (actionState.group) {
			preprocessed = group.process(preprocessed, actionState.group)
		}
	
		if (actionState.sort) {
			preprocessed = sort.process(preprocessed, actionState.sort)
		}

		return preprocessed
	}
	

	return (
		<div className='list-view'>
			<div className='list-view__selectors'>
				{ Object.keys(actionReducer).map((action, idx) => <Selector key={idx} label={actionReducer[action].label} types={actionReducer[action].types} onClick={type => onSelectorClicked(type, action)} /> )}
			</div>

			<div className='list-view__body'>
				{ process(items).map(i => <p>{i.title}</p>)}
			</div>
		</div>
	)
}


export default ListView
