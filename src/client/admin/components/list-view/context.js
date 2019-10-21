import React from 'react'

const Group = React.createContext({ group: x => x })
const Filter = React.createContext({ filter: (item, idx) => true })
const Sort = React.createContext({ sort: (left, right) => left < right ? -1 : 1 })

export { Group, Filter, Sort }