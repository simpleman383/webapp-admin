import React from 'react'
import cls from 'classnames'

const GroupListSelector = ({ types, className, active, label, onClick }) => {
   
    return (
        <div className={cls('selector list-view__selector', className)}>
            <label className={'selector__item selector__label'}>{label}</label>
            { types.map( (item, idx) => 
                <a 
                    key={`selector-${idx}`} 
                    className={cls('selector__item', item.key == active && 'selector__item--active') } 
                    onClick={() => onClick(item.key) }>
                    {item.label}
                </a> ) 
            }
        </div>
    )
}

export default GroupListSelector