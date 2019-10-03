import React from 'react'
import cls from 'classnames'
import './styles.scss'

const Type = {
    Warning: 'warning',
    Error: 'error'
}

export default (props) => {
    const { status } = props;

    let modifier = '';
    switch (status) {
        case Type.Warning: 
            modifier = 'input--warning';
            break;
        case Type.Error: 
            modifier = 'input--error';
            break;
        default: 
            break;            
    }

    return <input {...props} className={cls('input', props.className, modifier)} />

}