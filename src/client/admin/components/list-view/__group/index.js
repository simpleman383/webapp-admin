import React from 'react'

const ListGroup = ({ items, key, title, children }) => (
  <div key={key} className='group list-view__group'>
    <h1 className='group__title'>{title}</h1>
    <div className='group__body'>
      { items && items.map( (item, idx) => children(item, idx) ) }
    </div>
  </div>
)

export default ListGroup