const router = require('express').Router()
const schema = require('../schema/user')

router.post('/', graphqlHTTP({
    schema,
    graphiql: true
}))

router.get('/', graphqlHTTP({
    schema,
    graphiql: true
}))

module.exports = router