import React from 'react'

import './styles.scss'

const Fragment = ({ children }) => {
    
    return (
        <div className='fragment-layout__fragment'>
            { children }
        </div>
    )
}



export default Fragment