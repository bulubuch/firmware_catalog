const { 
	GraphQLNonNull,
	GraphQLString,
	GraphQLID
} = require('graphql')
const type = require('./type')
const Firmware = require('./firmware')

// Defines the mutations
module.exports = {
	deleteFirmware: {
		type,
		args: {
			id:   			{ type:new GraphQLNonNull(GraphQLID) }
		},
		resolve: Firmware.deleteFirmware.bind(Firmware)
	}
}