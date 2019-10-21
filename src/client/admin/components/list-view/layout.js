import React, { useContext } from 'react'

import * as Context from './context'
import ListGroup from './__group'

const List = {
  grouped: Layout => (props) => {
    const { group } = useContext(Context.Group)    
    const { items } = props

    if (!Array.isArray(items))
      return null

    const groups = group(items)    
    
    return (
      <Layout {...props} items={groups}>
        { 
          (group, key) => (
            <ListGroup key={key} {...group}>
              { (item, key) => props.children(item, key) }
            </ListGroup>
          ) 
        }
      </Layout>
    ) 
  },

  filtered: Layout => (props) => {
    const { filter } = useContext(Context.Filter)
    const { items } = props

    if (!Array.isArray(items))
      return null

    return <Layout {...props} items={items && items.length && items.filter(filter)} />
  },

  sorted: Layout => (props) => {    
    const { sort } = useContext(Context.Sort)
    const { items } = props

    if (!Array.isArray(items))
      return null

    return <Layout {...props} items={items && items.length && items.sort(sort)} />
  },

}


const Base = ({ groupSelector, sortSelector, inputFilter, items, children }) => {

  return (
    <div className='list-view'>

      <div className='list-view__options'>
        { typeof(groupSelector) === 'function' && groupSelector() }
        { typeof(sortSelector) ==='function' && sortSelector() }
        { typeof(inputFilter) ==='function' && inputFilter() }

      </div>

      <div className='list-view__body'>
        { items && items.map( (item, idx) => children(item, idx) ) }
      </div>
    </div>
  )
}

export default List.filtered(List.grouped(List.sorted( Base )))

