import React from 'react'

import Header from '../../header'
import Layout from '../__layout'
import './styles.scss'


const Group = ({ title, children, items, layoutType = 'linear', ...rest }) => (
    <div className='grouped-items' {...rest}>
        <Header level={4} className='grouped-items__title' title={title} />
        <Layout type={layoutType} className='grouped-items__layout' children={children} items={items} />
    </div>
)

export default Group