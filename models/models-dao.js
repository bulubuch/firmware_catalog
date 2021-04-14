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

const modelsDao = require('./models-dao-sqlite3');

/**
 * Create a model with the specified description
 */
function create(name, description, manufacturer, datasheet) {
    return modelsDao.create(name, description, manufacturer, datasheet);
}

/**
 * Find all the models
 */
function findAll() {
  return modelsDao.findAll();
}

/**
 * Find the model with the specified id
 */
function findById(id) {
  return modelsDao.findById(id);
}

/**
 * Find the model with the specified name
 * and return all items associated with it
 */
function findByName(name) {
  return modelsDao.findByName(name);
}

/**
 * Find the model with the specified manufacturer
 * and return all items associated with it
 */
function findByManufacturer(manufacturer) {
  return modelsDao.findByManufacturer(manufacturer);
}

/**
 * Update the model with the specified id
 * with new field values
 */
function update(id, name, description, manufacturer, datasheet) {
    return modelsDao.update(id, name, description, manufacturer, datasheet);
}

/**
 * Delete the model with the specified id
 * with new field values
 */
function del(id) {
    return modelsDao.del(id, description);
}

module.exports.findAll = findAll;
module.exports.create = create;
module.exports.update = update;
module.exports.del = del;
module.exports.findById = findById;
module.exports.findByName = findByName;
module.exports.findByManufacturer = findByManufacturer;