import React, { useState } from 'react'
import Menu from '../menu'
import cls from 'classnames'

import './styles.scss'


const Layout = ({ children }) => {

    const [state, setState] = useState({ mobileOverlay: false })

    const modifier = state.mobileOverlay ? 'layout--mobile-overlayed' : ''

    return (
        <div className={cls('layout', modifier)}>
            
            <div className='layout__side-view'>
                <Menu 
                    enabled={state}
                    onClose={() =>  setState({ ...state, mobileOverlay: false })} 
                    onToggle={() => setState({ ...state, mobileOverlay: !state.mobileOverlay })} 
                />
            </div>


            <div className='layout__main-view'>
                <div className='layout__container-main'>{children}</div>
            </div>

        </div>
    )
}


export default Layout