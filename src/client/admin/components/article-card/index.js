import React from 'react' 
import './styles.scss'

const parseDate = date => {
    if (typeof (date) !== 'string' ) 
        return ''

    return (new Date(date)).toLocaleDateString()
    
}


const ArticleCard = ({ title, date, ...rest }) => {
    

    return (
        <div className='article-card' {...rest}>
            <div className='article-card__title'>{title}</div>
            
            <div className='article-card__date'>
                <span>Опубликовано: </span>
                <span>{parseDate(date)}</span>
            </div>
        </div>
    )
}

export default ArticleCard