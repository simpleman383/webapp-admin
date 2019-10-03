import React from 'react'

import Logo from './__logo'
import NavLink from './__link'

import './styles.scss'

const Menu = (props) => {

    return (
        <div className='menu'>
            <div className='menu__side-bg' />
            <Logo />
            <nav className='menu__nav'>
                <NavLink to='/' text='Главная' />
                <NavLink to='/glossary' text='Глоссарий' />

            </nav>
        </div>
    )
}

export default Menu