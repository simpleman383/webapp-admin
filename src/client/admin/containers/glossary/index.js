import React from 'react'


import Input from '../../components/input'
import Header from '../../components/header'
import ListView from '../../components/list-view'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux';
import { loadArticleList } from '../../store/glossary/actions'


const reducer = {

	sort: {

		label: 'Сортировать по:',

		process: (items, type) => {
			switch (type) {
				case 'title' : 
					return items.sort((left, right) => left.title < right.title ? -1 : 1)
				case 'creationDate' :
					return items.sort((left, right) => left.creationDate < right.creationDate ? -1 : 1)
				default:
					return items
			}
		},

		types: [
				{ key: 'title', label: 'названию' },
				{ key: 'creationDate', label: 'дате создания' },

			]
			
		},
}


class GlossaryEditorPage extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.loadArticleList()
	}


	render() {

		const { previews } = this.props

		return (
			<div className='glossary'>
				<Header level={1} title='Глоссарий' />

				<ListView actionReducer={reducer} items={previews} />

	

			</div>
		)
	} 
}


const mapDispatchToProps = dispatch => bindActionCreators({ loadArticleList }, dispatch)

const mapStateToProps = state => ({
	previews: state.glossary.previews

})

export default connect(mapStateToProps, mapDispatchToProps)(GlossaryEditorPage)