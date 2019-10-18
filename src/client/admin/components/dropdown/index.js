import React, { useState } from 'react'
import cls from 'classnames'
import './styles.scss'

const Dropdown = ({ className, value: controlledValue, defaultValue, label, options, disabled = false, onChange }) => {

  if (defaultValue) {
    var [ valueState, setValue ] = useState(defaultValue)
  }

  const handleChange = (e, data) => {
    const value = e.target.value
    if (defaultValue) {
      setValue(value)
    }

    typeof (onChange) === 'function' && onChange(value)
  }


  const value = controlledValue || valueState
  

  return (
    <div className={cls('dropdown', className)}>
      <label className='dropdown__label'>{label}</label>
      <select className='dropdown__select' onChange={handleChange} value={value} disabled={disabled}>
        { options && options.map((option, idx) => {
          const { key, value: label } = option
          return <option key={'option-' + idx} value={key}>{label}</option>
        }) }
      </select>
    </div>
  )
}

export default Dropdown