'use strict'

const devicesDao = require('./devices-dao-sqlite3');

/**
 * Create a device with the specified values
 */
 function register(uid, name, model_name, firmware_version) {
    return devicesDao.register(uid, name, model_name, firmware_version);
}

/**
 * Find all the devices
 */
function findAll() {
  return devicesDao.findAll();
}

/**
 * Find the device with the specified id
 */
function findById(id) {
  return devicesDao.findById(id);
}

/**
 * Find the device with the specified id
 */
function findByUid(id) {
	return devicesDao.findByUid(id);
}

/**
 * Find the device with the specified name
 * and return all items associated with it
 */
function findByName(name) {
  return devicesDao.findByName(name);
}

/**
 * Find the device with the specified model name
 * and return all items associated with it
 */
function findByModel(model_name) {
  return devicesDao.findByModel(model_name);
}

/**
 * Find the device with the specified manufacturer
 * and return all items associated with it
 */
function findByManufacturer(manufacturer) {
	return devicesDao.findByManufacturer(manufacturer);
}

/**
 * Update the device with the specified id
 * with new field values
 */
function update(id, name, firmware_version, active) {
    return devicesDao.update(id, name, firmware_version, active);
}

/**
 * Delete the device with the specified id
 * with new field values
 */
function del(id) {
    return devicesDao.del(id, description);
}

module.exports.findAll = findAll;
module.exports.register = register;
module.exports.update = update;
module.exports.del = del;
module.exports.findById = findById;
module.exports.findByUid = findByUid;
module.exports.findByName = findByName;
module.exports.findByManufacturer = findByManufacturer;