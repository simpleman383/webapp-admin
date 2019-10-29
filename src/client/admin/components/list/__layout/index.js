import React, { useEffect, useState } from 'react'
import cls from 'classnames'
import './styles.scss'

const setLayoutType = (type) => {
    switch (type) {
        case 'grid':
            return 'layout--grid'
        case 'linear':
        default:
            return 'layout--linear'
    }
}

const Layout = ({ items, type, children, className }) => {

    const [ loaded, setLoaded ] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])

    return (
        <div className={cls('layout', className, setLayoutType(type))}>
        { items && items.map((item, idx) => {

            const delay = idx * .1

            return (
                <div className={cls('layout__item', loaded && 'layout__item--loaded')} style={{ transitionDelay: `${delay}s` }} key={idx}>
                    { children(item) }
                </div>    
            )

        }) }
        </div>
    )

}

export default Layout