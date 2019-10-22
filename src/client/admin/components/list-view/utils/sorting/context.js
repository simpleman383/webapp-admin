import React from 'react'

const Sort = React.createContext({ sort: (left, right) => left < right ? -1 : 1 })

export default Sort