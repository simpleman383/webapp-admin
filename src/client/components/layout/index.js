import React, { useState } from 'react'
import Menu from '../menu'
import cls from 'classnames'

import './styles.scss'


const Layout = ({ children }) => {

    const [state, setState] = useState(true)

    let layoutModifier = state ? 'layout--side-view-enabled' : 'layout--side-view-disabled'

    return (
        <div className={cls('layout', layoutModifier)}>
            
            <div className='layout__side-view'>
                <Menu 
                    enabled={state} 
                    onClose={() => setState(false)} 
                    onToggle={() => setState(!state)} 
                />
            </div>


            <div className='layout__main-view'>
                <div className='layout__container-main'>{children}</div>
            </div>

        </div>
    )
}


export default Layout