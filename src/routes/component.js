const router = require('express').Router()
const schema = require('../schema/module')

router.post('/', graphqlHTTP({
    schema,
    graphiql: true
}))

module.exports = router