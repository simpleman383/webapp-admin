import React from 'react'
import cls from 'classnames'

import Input from '../../input'
import Dropdown from '../../dropdown'
import './styles.scss'

const ListOptions = ({ className, options, optionValues = {}, onGroupChange, onSortChange, onFilterChange }) => {

    return (
      <div className={cls('options', className)}>
        <div className='options__left'>
          <Dropdown value={optionValues.group} className='options__group' label='Группировать по:' options={options.group} onChange={key => onGroupChange(key)} />
          <Dropdown value={optionValues.sort} className='options__sort' label='Сортировать по:' options={options.sort} onChange={key => onSortChange(key)} />
        </div>
  
        <div className='options__right'>
          <Input placeholder="поиск" className='options__filter' onChange={e => onFilterChange(e.target.value)} />
        </div>
      </div>
    )
} 

export default ListOptions