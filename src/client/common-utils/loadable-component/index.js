import React from 'react'

const load = (type) => {
	let ComponentBlock = null;

	try {
		ComponentBlock = require(`./loadable-blocks/${type}`).default		

	} catch (e) {
		console.error(`Loadable block with type = ${type} not found`)
		return () => null
	}

	return ComponentBlock
}

export default ({ blocks }) => {
	if (!blocks) {
		return null;
	}			
	
  return Object.values(blocks).map((block, idx) => {
		const { type, data: attrs } = block		

		const ComponentBlock = load(type)		

		return (
			<ComponentBlock key={`loadable-component-block-${idx}`} {...attrs} />
		)

	})
}