import React from 'react'


import Input from '../../components/input'
import Header from '../../components/header'
import SortableList from '../../components/grouping-list'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux';
import { loadArticleList } from '../../store/glossary/actions'


const groupingRules = [
	{
		type: 'Title',
		title: 'названию',
		group: (items) => {}
	}

]


class GlossaryEditorPage extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.loadArticleList()
	}


	render() {

		return (
			<div className='glossary'>
				<Header level={1} title='Глоссарий' />
	
				<div>
					{ this.props.articles.map( a => <p>{a.title}</p> )}
				</div>
			</div>
		)
	} 
}


const mapDispatchToProps = dispatch => bindActionCreators({ loadArticleList }, dispatch)

const mapStateToProps = state => ({
	articles: state.glossary.articles

})

export default connect(mapStateToProps, mapDispatchToProps)(GlossaryEditorPage)