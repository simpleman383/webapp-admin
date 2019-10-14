import React from 'react'
import cls from 'classnames'

import Header from '../header'
import ListView from '../list-view'

const ListGroup = ({ key, className, title, children, items }) => {

    return (
        <div key={key} className={cls('list-group', className)}>
            <Header className='list-group__header' level={3} title={title} />
            <ListView className='list-group__list-view' items={items}>
                { (item, index) => children(item, index) }
            </ListView>
        </div>
    )
}

export default ListGroup