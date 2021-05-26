const graphqlHTTP = require('express-graphql')
const router = require('express').Router()
const schema = require('../schema/device')

router.post('/', graphqlHTTP({
    schema,
    graphiql: true
}))

module.exports = router