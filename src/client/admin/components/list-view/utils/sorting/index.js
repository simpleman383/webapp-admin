import React, { useContext } from 'react'

import Context from './context'

const withSortedContext = Layout => props => {    
  const { sort } = useContext(Context)
  const { items } = props

  if (!Array.isArray(items))
    return null

  return <Layout {...props} items={items ? items.sort(sort) : []} />
},


export default withSortedContext

