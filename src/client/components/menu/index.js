import React from 'react'

import Logo from './__logo'
import Toggle from './__toggle-arrow'
import CloseButton from './__close-button'

import NavLink from './__link'

import './styles.scss'

const Menu = ({ enabled, onToggle, onClose }) => {

    return (
        <div className='menu'>
            {/* <div className='menu__side-bg' /> */}

            <CloseButton onClick={onClose} />

            {
                enabled ? <Logo /> : <Toggle onClick={onToggle} />
            }
            
            <nav className='menu__nav'>
                <NavLink to='/' text='Главная' />
                <NavLink to='/glossary' text='Глоссарий' />

            </nav>
        </div>
    )
}

export default Menu