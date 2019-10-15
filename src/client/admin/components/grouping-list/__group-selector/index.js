import React from 'react'

const GroupListSelector = ({ types, active, label, onClick }) => {
   
    return (
        <div className='group-selector grouping-list__group-selector'>
            <label className={'group-selector__label'}>{label}</label>
            { types.map( (item, idx) => 
                <a 
                    key={`group-selector-${idx}`} 
                    className={'group-selector__item', item.type == active && 'group-selector__item--active' } 
                    onClick={() => onClick(type) }>
                    {item.title}
                </a> ) 
            }
        </div>
    )
}

export default GroupListSelector