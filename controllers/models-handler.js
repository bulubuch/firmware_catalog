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

/**
 * This module handles calling the DAO layer on behalf of the routes.
 * You will need to write code to make the DAO calls. Remember, they
 * are asynchronous so you have to "Promise" to carefully think through
 * what to do first.
 */

// TODO: Figure out what require()s you need here
const logger = require('../src/utils/logger');
const utils = require('../src/utils/utils');

const modelsDao = require('../models/models-dao');
/**
 * Handle (that is, resolve() or reject()) request for models
 * to find by Id (e.g., GET /models/123)
 * 
 * Call modelsDao.findById()
 */
function handleModelsFindById(request, resolve, reject, id) {
    // Call modelsDao.findById()
    logger.debug(`Calling modelsDao.findById(${id})`, 'handleModelsFindById()');
    modelsDao.findById(id).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err)
    });
}

/**
 * Handle (that is, resolve() or reject()) request for models
 * to find by Id (e.g., GET /models/123)
 * 
 * Call modelsDao.findByManufacturer()
 */
function handleModelsFindByManufacturer(request, resolve, reject, manufacturer) {
    // Call modelsDao.findByManufacturer()
    logger.debug(`Calling modelsDao.findByManufacturer(${manufacturer})`, 'handleModelsFindByManufacturer()');
    modelsDao.findByManufacturer(manufacturer).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err)
    });
}

/**
 * Handle (that is, resolve() or reject()) request for models
 * to find by Id (e.g., GET /models/123)
 * 
 * Call modelsDao.findByName()
 */
function handleModelsFindByName(request, resolve, reject, name) {
    // Call modelsDao.findByName()
    logger.debug(`Calling modelsDao.findByName(${name})`, 'handleModelsFindByName()');
    modelsDao.findByName(name).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err)
    });
}


/**
 * Handle (that is, resolve() or reject()) request for models
 * to find by Id (e.g., GET /models/123)
 * 
 * Call modelsDao.findAll()
 */
function handleModelsFindAll(request, resolve, reject) {
    // Call modelsDao.findAll()
    logger.debug(`Calling modelsDao.findAll()`, 'handleModelsFindAll()');
    modelsDao.findAll().then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err)
    });
}

/**
 * Handle (i.e., resolve() or reject()) request for models
 * to update the model (e.g., PUT /models/123)
 * 
 * Call modelsDao.update() after getting body using utils.processRequestBody()
 */
function handleModelsUpdate(request, resolve, reject, id) {
    // TODO: WRITE CODE
    utils.processRequestBody(request).then((requestBody) => {
        logger.debug(`Calling modelsDao.update() with request: ${requestBody}`, 'handleModelsUpdate()');
        let requestBodyJson = JSON.parse(requestBody);
        modelsDao.update(id, requestBodyJson.name, requestBodyJson.description, requestBodyJson.manufacturer, requestBodyJson.datasheet).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    }).catch((err) => {
        logger.error(`Error processing request body: ${err.message}`, 'handleModelsUpdate()');
        reject(err);
    });
}

/**
 * Handle (i.e., resolve() or reject()) request for models
 * to find model by name (e.g., POST /models)
 * 
 * Call modelsDao.create() after getting body using utils.processRequestBody()
 */
function handleModelsCreate(request, resolve, reject) {
    utils.processRequestBody(request).then((requestBody) => {
        logger.debug(`Calling modelsDao.create() with request: ${requestBody}`, 'handleModelsCreate()');
        let requestBodyJson = JSON.parse(requestBody);
        modelsDao.create(
        requestBodyJson.name, 
        requestBodyJson.description, 
        requestBodyJson.manufacturer, 
        requestBodyJson.datasheet).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    }).catch((err) => {
        logger.error(`Error processing request body: ${err.message}`, 'handleModelsCreate()');
        reject(err);
    });
}


/**
 * Handle (i.e., resolve() or reject()) request for models
 * to delete the model (e.g., DELETE /models/123)
 * 
 */
function handleModelsDelete(request, resolve, reject, id) {
    modelsDao.del(id).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err);
    });
}


// TODO: Make sure to export the functions you want to be visible to the rest of the app
module.exports.handleModelsCreate = handleModelsCreate;
module.exports.handleModelsUpdate = handleModelsUpdate;
module.exports.handleModelsDelete = handleModelsDelete;
module.exports.handleModelsFindAll = handleModelsFindAll;
module.exports.handleModelsFindById = handleModelsFindById;
module.exports.handleModelsFindByName = handleModelsFindByName;
module.exports.handleModelsFindByManufacturer = handleModelsFindByManufacturer;
