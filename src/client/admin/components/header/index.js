import React from 'react'
import cls from 'classnames'

import './styles.scss'

export default ({ title, level, className }) => {
    let effectiveLevel = 6;

    if (typeof(level) === 'number' && 1 <= level && level <= 6) {
        effectiveLevel = level;
    } 

    return React.createElement("h" + effectiveLevel, { className: cls('header', className) }, title.toString())
}
