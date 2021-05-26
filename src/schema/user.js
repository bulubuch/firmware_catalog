const { GraphQLObjectType } = require('graphql')
const userQueries = require('../model/user/queries')
const userMutations = require('../model/user/mutations')
const { GraphQLSchema } = require('graphql')
const query = require('./queries')

module.exports = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'AuthQueryType',
		fields: {
			user: userQueries.user,
		}
	}),
	mutation: new GraphQLObjectType({
		name: 'AuthMutationType',
		fields: {
			login: userMutations.login,
			registerUser: userMutations.registerUser
		}
	})
});