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

const logger = require('../src/utils/logger');

const firmwaresDao = require('../models/firmwares-dao');

 /**
  * Handle (that is, resolve() or reject()) request for firmwares search
  * (e.g., /firmwares?upc=123456789012)
  * 
  * @param request - the original request
  * @param resolve - the resolve() function to the promise: 
  *     { data : the_result_json_data, 
  *       statusCode = http_status_code }
  * @param reject - the reject() function of the promise
  * @param parsedUrl - the parsed url from the caller
  */
 function handleFirmwaresSearch(request, resolve, reject, parsedUrl) {
    // Now get the query string from the URL
    let query = parsedUrl.query;
    // By description?
    if (query.description) {
        // Node developer: use this as a template for the other DAO calls
        logger.debug(`Query by description: ${query.description}`, 'handleFirmwaresSearch()');
        // Query DAO: 
        firmwaresDao.findByDescription(query.description).then((result) => {
            resolve(result);// ok if query results in no data
        }).catch((err) => {
            reject(err);
        });
    // By upc?
    } else if (query.version) {
        logger.debug(`Query by Version: ${query.version}`, 'handleFirmwaresSearch()');
        // Query DAO: 
        firmwaresDao.findByVersion(query.version).then((result) => {
            resolve(result);// exact match or not found
        }).catch((err) => {
            reject(err);
        });
    // By model?
    } else if (query.model) {
        logger.debug(`Query by model: ${query.model}`, 'handleFirmwaresSearch()');
        // Query DAO: 
        firmwaresDao.findByModelName(query.model).then((result) => {
            resolve(result);// exact match or not found
        }).catch((err) => {
            reject(err);
        });
    // By id?
    } else if (query.id) {
        logger.debug(`Query by ID: ${query.id}`, 'handleFirmwaresSearch()');
        firmwaresDao.findById(query.id).then((result) => {
            resolve(result);// exact match or not found
        }).catch((err) => {
            reject(err);
        });
    } else {
        let message = `Unsupported search param: ${parsedUrl.search}`;
        logger.error(message, 'handleFirmwaresSearch()');
        reject(message);
    }
}
/**
 * Handle (that is, resolve() or reject()) request for firmwares
 * to find by Id (e.g., GET /firmwares/123)
 * 
 * Call firmwaresDao.findById()
 */
function handleFirmwaresFindById(request, resolve, reject, id) {
    // Call firmwaresDao.findById()
    logger.debug(`Calling firmwaresDao.findById(${id})`, 'handleFirmwaresFindById()');
    firmwaresDao.findById(id).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err)
    });
}

/**
 * Handle (that is, resolve() or reject()) request for firmwares
 * to find by Id (e.g., GET /firmwares/123)
 * 
 * Call firmwaresDao.findByFirmwareName()
 */
function handleFirmwaresFindByModelName(request, resolve, reject, modelName) {
    // Call firmwaresDao.findByModelName()
    logger.debug(`Calling firmwaresDao.findByModelName(${modelName})`, 'handleFirmwaresFindByModelName()');
    firmwaresDao.findByModelName(modelName).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err)
    });
}

/**
 * Handle (that is, resolve() or reject()) request for firmwares
 * to find by Id (e.g., GET /firmwares/123)
 * 
 * Call firmwaresDao.findByVersion()
 */
function handleFirmwaresFindByVersion(request, resolve, reject, version) {
    // Call firmwaresDao.findByVersion()
    logger.debug(`Calling firmwaresDao.findByVersion(${version})`, 'handleFirmwaresFindByVersion()');
    firmwaresDao.findByVersion(modelName).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err)
    });
}

/**
 * Handle (that is, resolve() or reject()) request for firmwares
 * to find by Id (e.g., GET /firmwares/123)
 * 
 * Call firmwaresDao.findNewVersion()
 */
function handleFirmwaresFindNewVersion(request, resolve, reject, parsedUrl) {
    // Call firmwaresDao.findNewVersion()
    let query = parsedUrl.query;
    if (query.model && query.version) {
        logger.debug(`Calling firmwaresDao.findNewVersion(${query.model}, ${query.version})`, 'handleFirmwaresFindNewVersion()');
        firmwaresDao.findNewVersion(query.model, query.version).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err)
        });
    }
    logger.debug(`NOT Calling firmwaresDao.findNewVersion`, 'handleFirmwaresFindNewVersion()');
}

/**
 * Handle (that is, resolve() or reject()) request for firmwares
 * to find by Id (e.g., GET /firmwares/123)
 * 
 * Call firmwaresDao.findAll()
 */
function handleFirmwaresFindAll(request, resolve, reject) {
    // Call firmwaresDao.findAll()
    logger.debug(`Calling firmwaresDao.findAll()`, 'handleFirmwaresFindAll()');
    firmwaresDao.findAll().then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err)
    });
}

/**
 * Handle (i.e., resolve() or reject()) request for firmwares
 * to update the firmware (e.g., PUT /firmwares/123)
 * 
 * Call firmwaresDao.update() after getting body using utils.processRequestBody()
 */
function handleFirmwaresUpdate(request, resolve, reject, id) {
    utils.processRequestBody(request).then((requestBody) => {
        logger.debug(`Calling firmwaresDao.update() with request: ${requestBody}`, 'handleFirmwaresUpdate()');
        let requestBodyJson = JSON.parse(requestBody);
        firmwaresDao.update(id,
        requestBodyJson.model_id, 
        requestBodyJson.version, 
        requestBodyJson.description, 
        requestBodyJson.url).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    }).catch((err) => {
        logger.error(`Error processing request body: ${err.message}`, 'handleFirmwaresUpdate()');
        reject(err);
    });
}

/**
 * Handle (i.e., resolve() or reject()) request for firmwares
 * to delete the firmware (e.g., DELETE /firmwares/123)
 * 
 */
function handleFirmwaresDelete(request, resolve, reject, id) {
    firmwaresDao.del(id).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err);
    });
}

/**
 * Handle (i.e., resolve() or reject()) request for firmwares
 * to find firmware by name (e.g., POST /firmwares)
 * 
 * Call firmwaresDao.create() after getting body using utils.processRequestBody()
 */
function handleFirmwaresCreate(request, resolve, reject) {
    utils.processRequestBody(request).then((requestBody) => {
        logger.debug(`Calling firmwaresDao.create() with request: ${requestBody}`, 'handleFirmwaresCreate()');
        let requestBodyJson = JSON.parse(requestBody);
        firmwaresDao.create(
        requestBodyJson.model_id, 
        requestBodyJson.version, 
        requestBodyJson.description, 
        requestBodyJson.url).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    }).catch((err) => {
        logger.error(`Error processing request body: ${err.message}`, 'handleFirmwaresCreate()');
        reject(err);
    });
}

module.exports.handleFirmwaresSearch = handleFirmwaresSearch;
module.exports.handleFirmwaresCreate = handleFirmwaresCreate;
module.exports.handleFirmwaresUpdate = handleFirmwaresUpdate;
module.exports.handleFirmwaresDelete = handleFirmwaresDelete;
module.exports.handleFirmwaresFindAll = handleFirmwaresFindAll;
module.exports.handleFirmwaresFindById = handleFirmwaresFindById;
module.exports.handleFirmwaresFindByVersion = handleFirmwaresFindByVersion;
module.exports.handleFirmwaresFindNewVersion = handleFirmwaresFindNewVersion;
