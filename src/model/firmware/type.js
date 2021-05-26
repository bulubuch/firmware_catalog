
let {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLNonNull,
} = require('graphql')
const { GraphQLTime } = require('graphql-iso-date')

// Defines the type
module.exports = new GraphQLObjectType({
    name: 'Firmware',
    description: 'Module firmware',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        model: {
            type: new GraphQLNonNull(GraphQLString)
        },
        version: {
            type: new GraphQLNonNull(GraphQLString)
        },
        size: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        file: {
            type: new GraphQLNonNull(GraphQLString)
        },
        created_at: {
            type: GraphQLTime
        },
    }
})