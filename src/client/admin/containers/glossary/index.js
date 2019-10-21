import React from 'react'


import Input from '../../components/input'
import Header from '../../components/header'

import Dropdown from '../../components/dropdown'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux';
import { loadArticleList } from '../../store/glossary/actions'


import ListView from '../../components/list-view';



const sortOptions = [
	{
		key: 'title asc',
		value: 'а - я',
		fn: (a, b) => a.title < b.title ? -1 : 1
	}, 
	{
		key: 'title desc',
		value: 'я - а',
		fn: (a, b) => a.title > b.title ? -1 : 1
	}
]


const groupOptions = [

	{
		key: 'alpha',
		value: 'заголовку',
		fn: items => {

			if (!Array.isArray(items))
				return []
	
			const groups = {}
			for (let item of items) {
				const firstLetter = item.title[0]

				if ( groups[firstLetter] ) {
					groups[firstLetter].push(item)
				} else {
					groups[firstLetter] = [ item ]
				}
			}

			return Object.keys(groups).reduce((acc, cur) => [...acc, { title: cur, items: groups[cur] } ], [])
		
		}
	},

	{
		key: 'date',
		value: 'дате',
		fn: items => {
	
			if (!Array.isArray(items))
				return []

			const groups = {}

			for (let item of items) {
				const date = new Date(item.creationDate).toLocaleDateString('ru-RU')

				if ( groups[date] ) {
					groups[date].push(item)
				} else {
					groups[date] = [ item ]
				}
			}

			return Object.keys(groups).reduce((acc, cur) => [...acc, { title: cur, items: groups[cur] } ], [])
		
		}
	},


]

const filter = value => item => {
	if (typeof(value) !== 'string' || !value.length) 
		return true

	return item.title.toLowerCase().includes(value)

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

				<ListView items={previews} sortOptions={sortOptions} groupOptions={groupOptions} filter={filter}>
					{ (item, key) => <p key={key}>{item.title}</p> }
				</ListView>
			</div>
		)
	} 
}


const mapDispatchToProps = dispatch => bindActionCreators({ loadArticleList }, dispatch)

const mapStateToProps = state => ({
	previews: state.glossary.previews

})

export default connect(mapStateToProps, mapDispatchToProps)(GlossaryEditorPage)