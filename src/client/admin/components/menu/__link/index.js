import React from 'react'
import { NavLink } from 'react-router-dom';
import './styles.scss'

export default ({ to, text }) => {
    return (
        <div className='menu__item'>

            <NavLink className='menu__link' exact to={to} activeClassName='menu__link--active'>{text}</NavLink>
        </div>
    )
}