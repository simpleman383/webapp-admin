import React from 'react'


import Input from '../../components/input'
import Header from '../../components/header'
import SortableList from '../../components/grouping-list'


const groupingRules = [
    {
        type: 'Title',
        title: 'названию',
        group: (items) => {}
    }

]


export default (props) => {

    return (
        <div className='glossary'>

            <Header level={1} title='Глоссарий' />
            
            <SortableList group={(items) => items}>
                { 
                    (group, index) => {
                        return (
                            <div key={`glossary-article-list-item-${index}`} className="glossary__list-group">
                                
                            </div>
                        )
                    }
                }
            </SortableList>

        </div>

    )
}