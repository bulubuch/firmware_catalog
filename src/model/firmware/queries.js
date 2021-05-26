const { GraphQLList,
	GraphQLID,
	GraphQLString,
	GraphQLFloat } = require('graphql')
const type = require('./type')
const Firmware = require("./firmware")

// Defines the queries
module.exports = {
firmwares: {
	type: new GraphQLList(type),
	args: {
		model: {
			type: GraphQLString
		},
		file: {
			type: GraphQLFloat
		}
	},
	resolve: Firmware.findMatching.bind(Firmware)
},
firmware: {
	type,
	args: {
		id: {
			type: GraphQLID
		}
	},
	resolve: Firmware.getByID.bind(Firmware)
}
}