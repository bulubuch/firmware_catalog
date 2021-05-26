'use strict'
const DAO = require('../../lib/dao')
const mySQLWrapper = require('../../lib/sqlWraper')
const jwt = require('jsonwebtoken');
const config = require('config');

class Module extends DAO {
}

module.exports.Module = Module;