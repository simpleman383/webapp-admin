import React, { useContext } from 'react'

import Context from './context'

const withFilteredContent = Layout => props => {
  const { filter } = useContext(Context)
  const { items } = props

  if (!Array.isArray(items))
    return null

  return <Layout {...props} items={items ? items.filter(filter) : []} />
}


export default withFilteredContent