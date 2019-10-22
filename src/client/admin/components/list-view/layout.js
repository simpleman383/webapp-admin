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
      <Layout {...props} items={groups || []}>
        { 
          (group, idx) => (
            <ListGroup key={idx} {...group}>
              { (item, idx) => props.children(item, idx) }
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

    return <Layout {...props} items={items ? items.filter(filter) : []} />
  },

  sorted: Layout => (props) => {    
    const { sort } = useContext(Context.Sort)
    const { items } = props

    if (!Array.isArray(items))
      return null

    return <Layout {...props} items={items ? items.sort(sort) : []} />
  },

}


const MainLayout = ({ groupSelector, sortSelector, inputFilter, items, children }) => {

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


const setupPipeline = (ListLayoutComponent, pipeline) => props => {


}


const setupSearch = (List, handleSearchFn) => (props) => {

  
  
  const [ value, setValue ] = useState(null)

  return <List {...props} items={[]} />
}




export default List.filtered(List.grouped(List.sorted( MainLayout )))

