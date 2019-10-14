import React from 'react'
import cls from 'classnames'
import './styles.scss'

const ListView = ({ className, items, children }) => {
    return (
        <div className={cls('list', className)}>
            { items && items.length && items.map(item => children(item)) }
        </div>
    )
}

export default ListView