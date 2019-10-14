import React from 'react'
import Payture from '../../services/payture-admin'


import Selector from './__group-selector'

import ListView from '../../components/list-view'
import Group from '../../components/list-group'


class GroupingList extends React.Component {
    constructor(props) {
        super(props)
        this.handleGroupSelectorClick = this.handleGroupSelectorClick.bind(this)
        this.handleFilterSelectorClick = this.handleFilterSelectorClick.bind(this)

        const { groupReducers = [], filterReducers = [] } = props;

        this.state = {}
    }

    handleGroupSelectorClick(type) {
        this.setState({ groupBy: type })
    }

    handleFilterSelectorClick(type) {
        this.setState({ filterBy: type })
    }

    render() {
        const { groupReducers, items, children, className } = this.props;

        const itemGroups = (items)
 
        return (
            <div className='grouping-list'>
                <div className='grouping-list__selectors'>
                    <Selector label="Группировать по" types={} onClick={} />
                    <Selector label="Сортировать по" types={} onClick={} />
                </div>

                <ListView items={itemGroups}>
                    { 
                        itemGroups && itemGroups.map(group => {
                            return (
                                <Group className='grouping-list__group' {...group} >
                                    { item => children(item) }
                                </Group>
                            )
                        })
                    }
                </ListView>
            </div>
        )
    }
}

export default GroupingList