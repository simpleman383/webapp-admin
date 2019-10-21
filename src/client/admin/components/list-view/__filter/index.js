import React from 'react'

import cls from 'classnames'
import Input from '../../input'

const InputFilter = ({ className, onChange }) => <Input className={cls('list-view__filter')} onChange={(e) => onChange(e.target.value) } />

export default InputFilter