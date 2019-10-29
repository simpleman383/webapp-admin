import React from 'react'
import cls from 'classnames'

import Options from './__options'

import Group from './__group'
import Layout from './__layout'


const List = ({ className, optionValues, options, children, items, layoutType = 'linear', onGroupChange, onSortChange, onFilterChange }) => {

    return (
        <div className={cls('list-view', className)}>

            { 
                options && 
                <Options 
                    className='list-view__options' 
                    optionValues={optionValues} 
                    options={options} 
                    onGroupChange={onGroupChange} 
                    onSortChange={onSortChange} 
                    onFilterChange={onFilterChange} 
                /> 
            }

            <Layout className='list-view__layout' type={layoutType} children={children} items={items} />
        </div>
    )
}

List.Layout = Layout
List.Group = Group

export default List