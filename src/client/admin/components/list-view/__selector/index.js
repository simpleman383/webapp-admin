import React from 'react'
import Dropdown from '../../dropdown'
import cls from 'classnames'

const Selector = ({ options, className, defaultValue, onChange, label }) => {

  const getSelectorFn = (key) => options.find(item => item.key === key) || {}
  const onSelectorChange = (value) => onChange(getSelectorFn(value).fn)

  return (
    <Dropdown label={label} className={cls('selector', className)} options={options} defaultValue={defaultValue} onChange={onSelectorChange} />
  )
}
export default Selector