import React, { useState, useLayoutEffect } from 'react'
import cls from 'classnames'

import * as Context from './context'


import Filter from './__filter'
import Selector from './__selector'

import ListLayout from './layout'


 
const ListView = ({ 
  groupOptions, 
  groupLabel = 'Группировать по:', 
  groupKeyDefault,
  sortOptions, 
  sortLabel = 'Упорядочить по:', 
  sortKeyDefault,
  items = [], 
  filter,
  children }) => {

  const [ groupFn, setGroupFn ] = useState({ group: groupOptions[0].fn })
  const [ sortFn, setSortFn ] = useState({ sort: sortOptions[0].fn })
  const [ filterFn, setFilterFn ] = useState({ filter: filter(null) })


  const onSelectorChanged = (selectorType, fn) => {
    switch(selectorType) { 
      case 'sort' : {
        setSortFn({ sort: fn })
        break
      }
      case 'group' : {
        setGroupFn({ group: fn })
        break
      }
      default:
        break;
    }
  }

  const onFilterChanged = (filterValue) => {
    setFilterFn({ filter: filter(filterValue) })
  }

    
  const groupSelector = () => <Selector label={groupLabel} options={groupOptions} defaultValue={groupKeyDefault || groupOptions[0].key} onChange={val => onSelectorChanged('group', val)} /> 
  const sortSelector = () => <Selector label={sortLabel} options={sortOptions} defaultValue={sortKeyDefault || sortOptions[0].key} onChange={val => onSelectorChanged('sort', val)} /> 
  const inputFilter = () => <Filter onChange={(value) => onFilterChanged(value) } />

  return (
    <Context.Filter.Provider value={filterFn}>
      <Context.Sort.Provider value={sortFn}>
        <Context.Group.Provider value={groupFn}>
      
          <ListLayout items={items} groupSelector={groupSelector} sortSelector={sortSelector} inputFilter={inputFilter}>
            { (item, idx) => children(item, idx) }
          </ListLayout>

        </Context.Group.Provider>
      </Context.Sort.Provider>
    </Context.Filter.Provider>

  )
}




export default ListView