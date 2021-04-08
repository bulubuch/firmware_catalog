/*
   Copyright 2018 Makoto Consulting Group, Inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
'use strict'

const firmwaresDao = require('./firmwares-dao-sqlite3');
const modelsDao = require('./models-dao-sqlite3');

/**
 * Find the firmware object by the specified ID
 * using the underlying implementation.
 * 
 * @param id - the ID of the firmware record (SQL) or document (NoSQL)
 * to locate
 * 
 * @return Promise - 
 *  resolve(): the Firmware object that matches the id
 *          or null if one could not be located for that id 
 *  reject(): the err object from the underlying data store
 */
function findById(id) {
    return firmwaresDao.findById(id);
}

/**
 * Find all Firmwares objects that match the specified
 * partial description.
 * 
 * @return Promise - 
 *  resolve(): all Firmware objects that contain the partial
 *          descriptin provided or an empty array if nothing
 *          could not be located for that partialDescription 
 *  reject(): the err object from the underlying data store
 */
function findByDescription(partialDescription) {
  return firmwaresDao.findByDescription(partialDescription);
}

/**
 * Create a firmware with the specified params
 */
function create(model_id, version, description, url) {
  return firmwaresDao.create(model_id, version, description, url);
}

/**
 * Update a firmware with the specified params
 */
function update(id, model_id, version, description, url) {
  return firmwaresDao.update(id, model_id, version, description, url);
}

/**
 * Delete a firmware with the specified id
 */
function del(id) {
  return firmwaresDao.del(id);
}

/**
 * Find all Firmwares objects that match the specified
 * Nodel name.
 * 
 * @return Promise - 
 *  resolve(): all Firmware objects that contain the partial
 *          descriptin provided or an empty array if nothing
 *          could not be located for that partialDescription 
 *  reject(): the err object from the underlying data store
 */
function findByModelName(modelName) {
  return firmwaresDao.findByModelName(modelName);
}

/**
 * Find all Firmwares objects that match the specified
 * version.
 * 
 * @return Promise - 
 *  resolve(): all Firmware objects that match the model
 *          name provided or an empty array if nothing
 *          could not be located for that model name 
 *  reject(): the err object from the underlying data store
 */
function findByVersion(version) {
  return firmwaresDao.findByVersion(version);
}

/**
 * Find the last Firmwares object with version  higher than 
 * the specified version and with matching model.
 * 
 * @return Promise - 
 *  resolve(): the lstest Firmware objects that match the model
 *          name provided or an empty array if no newer version 
 *          could be located for that model name 
 *  reject(): the err object from the underlying data store
 */
function findNewVersion(version) {
  return firmwaresDao.findNewVersion(version);
}

module.exports.create = create;
module.exports.update = update;
module.exports.del = del;
module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.findByDescription = findByDescription;
module.exports.findByModelName = findByModelName;
module.exports.findByVersion = findByVersion;
module.exports.findNewVersion = findNewVersion;
