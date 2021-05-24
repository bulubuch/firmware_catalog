'use strict'

const componentsDao = require('./components-dao-sqlite3');

/**
 * Create a component with the specified values
 */
 function register(device_uid, model_name, type, builtin, active) {
    return componentsDao.register(device_uid, model_name, type, builtin, active);
}

/**
 * Find all the components
 */
function findAll() {
  return componentsDao.findAll();
}

/**
 * Find the component with the specified id
 */
function findById(id) {
  return componentsDao.findById(id);
}

/**
 * Find the component with the specified device_id
 */
function findByDeviceId(device_id) {
	return componentsDao.findByDeviceId(device_id);
}

/**
 * Find the component with the specified type
 */
function findByType(type) {
	return componentsDao.findByType(type);
}

/**
 * Find the component with the specified model_name
 */
function findByModelName(model_name) {
	return componentsDao.findByModelName(model_name);
}

/**
 * Find the component with the specified model name
 * and return all items associated with it
 */
function findByModelName(model_name) {
  return componentsDao.findByModelName(model_name);
}

/**
 * Update the component with the specified id
 * with new field values
 */
function update(id, name, firmware_version) {
    return componentsDao.update(id, name, firmware_version);
}

/**
 * Delete the component with the specified id
 * with new field values
 */
function del(id) {
    return componentsDao.del(id, description);
}

module.exports.register = register;
module.exports.update = update;
module.exports.del = del;
module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.findByDeviceId = findByDeviceId;
module.exports.findByType = findByType;
module.exports.findByModelName = findByModelName;