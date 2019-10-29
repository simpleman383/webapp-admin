import React, { useEffect } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getArticleList, handleGroupChange, handleSortChange, handleFilterChange } from '../../store/glossary/actions'


import ListView from '../../components/list'
import ArticleCard from '../../components/article-card'

const options = {
  group: [
    { key: 'title', value: 'названию' },
    { key: 'creationDate', value: 'дате создания' },
  ],
  sort: [
    { key: 'asc', value: 'возрастанию' },
    { key: 'desc', value: 'убыванию' },
  ],
}

const formatTitle = (title, groupKey) => {

  switch (groupKey) {
    case 'creationDate':
    case 'lastEditDate': {
      if (title === 'unknown_date')
        return title

      const names = [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Ноябрь', 'Декабрь' ]
      const [ month, year ] = title.split('/')

      return `${names[month].toLowerCase()} ${year} г.`
    }
    default:
      return title
  }
}


const Test = ({ group, filter, sort, items: groups, getArticleList, handleGroupChange, handleFilterChange, handleSortChange }) => {

  useEffect(() => {
    getArticleList(filter, group, sort)
  }, [ group, filter, sort ])

 
  return (
    <div className='glossary'>
 
      <ListView 
        items={groups} 
        options={options}
        onGroupChange={handleGroupChange} onFilterChange={handleFilterChange} onSortChange={handleSortChange} 
      >
        { 
          g => (
            <ListView.Group items={g.items} title={formatTitle(g.title, group)} layoutType='grid'>
              { item => <ArticleCard title={item.title} date={item.lastEditDate} /> }
            </ListView.Group>
          ) 
        }
      </ListView>
    </div>
  )
}

class GlossaryContainer extends React.Component {

  componentDidMount() {
    const { group, filter, sort, getArticleList } = this.props
    getArticleList(filter, group, sort)
  }

  shouldComponentUpdate(nextProps) {
    const { group, filter, sort, items } = this.props
    const { group: nextGroup, filter: nextFilter, sort: nextSort, items: nextItems } = nextProps

    if (items !== nextItems)
      return true
    
    if ( group !== nextGroup || filter !== nextFilter || sort !== nextSort ) {
      this.props.getArticleList(nextFilter, nextGroup, nextSort)
      return false
    }

  }

  render() {
    const { group, filter, sort, items: groups, getArticleList, handleGroupChange, handleFilterChange, handleSortChange } = this.props

    return (
      <div className='glossary'>
   
        <ListView 
          items={groups} 
          options={options}
          optionValues={{ group, filter, sort }}
          onGroupChange={handleGroupChange} onFilterChange={handleFilterChange} onSortChange={handleSortChange} 
        >
          { 
            g => (
              <ListView.Group items={g.items} title={formatTitle(g.title, group)} layoutType='grid'>
                { item => <ArticleCard title={item.title} date={item.lastEditDate} /> }
              </ListView.Group>
            ) 
          }
        </ListView>
      </div>
    )
  }
}


const mapStateToProps = state => ({
    group:  state.glossary.listView.group,
    filter:  state.glossary.listView.filter,
    sort:  state.glossary.listView.sort,
    items: state.glossary.listView.data
})

const mapDispatchToProps = dispatch => bindActionCreators({ getArticleList, handleGroupChange, handleSortChange, handleFilterChange }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GlossaryContainer)


