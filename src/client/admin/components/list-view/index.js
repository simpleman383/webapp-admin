import React, { useState, useLayoutEffect } from 'react'
import cls from 'classnames'

import Dropdown from '../dropdown'
import Input from '../input'

const stateType = {
  ORIGINAL: 'original',
  FILTERED: 'filtered',
  GROUPED: 'grouped',
  SORTED: 'sorted'
}


const processorDefault = (currentStateType, incomingAction) => items => items


const Selectors = ({ label, type, presets, onClick = () => null }) => (
  <div className={`list-view__${type}-selectors`}>
    <label>{label}</label>
    {
      presets.map((item, idx) => <a key={`label-${idx}`} onClick={() => onClick(type, item.key)}>{item.label}</a>)
    }
  </div>
)


const groupPresets = [
  {
    type: 'creationDate',
    label: 'чему-то',
    reduce: (items) => {

    }
  }
]


const DropdownSelector = ({ className }) => (
  <select className={'dropdown-selector'}>

  </select>
)


const ListView = ({ items, children }) => {

  const [ groupState, setGroupState ] = useState({ type: 'creationDate' })

  return (
    <div className='list-view'>
      <div className='list-view__control control'>
        <div className='control__left'>
          <Dropdown defaultValue='date' label="Группировать по" options={[ {key: 'name', value : "названию"}, {key: 'date', value : "дате создания"}, ]} />
          <Dropdown label="Сортировать по" options={[ {key: 'name asc', value : "A-Z"}, {key: 'name desc', value : "Z-A"}, ]} />
        </div>

        <div className='control__right'>
          <Input />
        </div>
      </div>
      





{/*       <div className='list-view__body'>
        {items && items.map(item => children(item))}
      </div>
 */}
    </div>
  )
}



export default ListView