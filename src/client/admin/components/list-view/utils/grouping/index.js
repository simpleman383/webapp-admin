import React, { useContext } from 'react'

import Context from './context'
import ListGroup from '../../__group'

const withGroupedContent = Layout => props => {
  const { group } = useContext(Context)    
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
}

export default withGroupedContent