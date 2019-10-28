const groupItems = (items, selector) => {
  const mapping = items.reduce((acc, item) => {
    const groupKey = selector(item)
  
    acc[groupKey] = acc[groupKey] ? [ ...acc[groupKey], item ] : [ item ]
    return acc
  }, {})       
  
  return Object.keys(mapping).reduce((acc, key) => [ ...acc, { title: key, items: mapping[key] } ], [])
}
export { groupItems }