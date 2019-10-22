import React, { useState, useEffect } from 'react'

const withTransition = ListComponent => props => {

  return (
    <ListComponent {...props}>
      {
        (item, idx) => (
          <div className='transition-cell'>{ props.children(item, idx) }</div>
        )
      }
    </ListComponent>
  )
}

export default withTransition