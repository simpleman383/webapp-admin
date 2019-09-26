import React from 'react'
import Fragment from './__fragment'
import './styles.scss'

const FragmentLayout = ({ children }) => {

    return (
        <div className='fragment-layout'>
            {children}
        </div>
    )
}

FragmentLayout.Fragment = Fragment;


export default FragmentLayout