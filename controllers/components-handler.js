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
const logger = require('../utils/logger');
const utils = require('../utils/utils');

const componentsDao = require('../models/components-dao');
/**
 * Handle (that is, resolve() or reject()) request for components
 * to find by Id (e.g., GET /components/123)
 * 
 * Call componentsDao.findById()
 */
function handleComponentsFindById(request, resolve, reject, id) {
    // Call componentsDao.findById()
    logger.debug(`Calling componentsDao.findById(${id})`, 'handleComponentsFindById()');
    componentsDao.findById(id).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err)
    });
}

/**
 * Handle (that is, resolve() or reject()) request for components
 * to find by Id (e.g., GET /components/123)
 * 
 * Call componentsDao.findByDeviceId()
 */
 function handleComponentsFindByDeviceId(request, resolve, reject, devicd_id) {
    // Call componentsDao.findByDeviceId()
    logger.debug(`Calling componentsDao.findByDeviceId(${devicd_id})`, 'handleComponentsFindByDeviceId()');
    componentsDao.findByDeviceId(devicd_id).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err)
    });
}

function handleComponentsFindByDeviceUid(request, resolve, reject, devicd_uid) {
    // Call componentsDao.findByDeviceUid()
    logger.debug(`Calling componentsDao.findByDeviceUid(${devicd_uid})`, 'handleComponentsFindByDeviceUid()');
    componentsDao.findByDeviceUid(devicd_uid).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err)
    });
}

/**
 * Handle (that is, resolve() or reject()) request for components
 * to find by Id (e.g., GET /components/123)
 * 
 * Call componentsDao.findByType()
 */
 function handleComponentsFindByType(request, resolve, reject, type) {
    // Call componentsDao.findByType()
    logger.debug(`Calling componentsDao.findByType(${type})`, 'handleComponentsFindByType()');
    componentsDao.findByType(type).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err)
    });
}

/**
 * Handle (that is, resolve() or reject()) request for components
 * to find by Id (e.g., GET /components/123)
 * 
 * Call componentsDao.findByModelName()
 */
 function handleComponentsFindByModelName(request, resolve, reject, model_name) {
    // Call componentsDao.findByModelName()
    logger.debug(`Calling componentsDao.findByModelName(${model_name})`, 'handleComponentsFindByModelName()');
    componentsDao.findByModelName(model_name).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err)
    });
}

/**
 * Handle (that is, resolve() or reject()) request for components
 * to find by Id (e.g., GET /components/123)
 * 
 * Call componentsDao.findByModelName()
 */
function handleComponentsFindByModelName(request, resolve, reject, model_name) {
    // Call componentsDao.findByModelName()
    logger.debug(`Calling componentsDao.findByModelName(${name})`, 'handleComponentsFindByModelName()');
    componentsDao.findByModelName(model_name).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err)
    });
}


/**
 * Handle (that is, resolve() or reject()) request for components
 * to find by Id (e.g., GET /components/123)
 * 
 * Call componentsDao.findAll()
 */
function handleComponentsFindAll(request, resolve, reject) {
    // Call componentsDao.findAll()
    logger.debug(`Calling componentsDao.findAll()`, 'handleComponentsFindAll()');
    componentsDao.findAll().then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err)
    });
}

/**
 * Handle (i.e., resolve() or reject()) request for components
 * to update the component (e.g., PUT /components/123)
 * 
 * Call componentsDao.update() after getting body using utils.processRequestBody()
 */
function handleComponentsUpdate(request, resolve, reject, id) {
    // TODO: WRITE CODE
    utils.processRequestBody(request).then((requestBody) => {
        logger.debug(`Calling componentsDao.update() with request: ${requestBody}`, 'handleComponentsUpdate()');
        let requestBodyJson = JSON.parse(requestBody);
        componentsDao.update(
			id,
			requestBodyJson.name,
			requestBodyJson.firmware_version).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    }).catch((err) => {
        logger.error(`Error processing request body: ${err.message}`, 'handleComponentsUpdate()');
        reject(err);
    });
}

/**
 * Handle (i.e., resolve() or reject()) request for components
 * to find component by name (e.g., POST /components)
 * 
 * Call componentsDao.create() after getting body using utils.processRequestBody()
 */
function handleComponentsRegister(request, resolve, reject) {
    utils.processRequestBody(request).then((requestBody) => {
        logger.debug(`Calling componentsDao.register() with request: ${requestBody}`, 'handleComponentsRegister()');
        let requestBodyJson = JSON.parse(requestBody);
        componentsDao.register(
		requestBodyJson.uid,
        requestBodyJson.model_name,
		requestBodyJson.type,
		requestBodyJson.builtin,
        requestBodyJson.active).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    }).catch((err) => {
        logger.error(`Error processing request body: ${err.message}`, 'handleComponentsRegister()');
        reject(err);
    });
}


/**
 * Handle (i.e., resolve() or reject()) request for components
 * to delete the component (e.g., DELETE /components/123)
 * 
 */
function handleComponentsDelete(request, resolve, reject, id) {
    componentsDao.del(id).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err);
    });
}


// TODO: Make sure to export the functions you want to be visible to the rest of the app
module.exports.handleComponentsRegister = handleComponentsRegister;
module.exports.handleComponentsUpdate = handleComponentsUpdate;
module.exports.handleComponentsDelete = handleComponentsDelete;
module.exports.handleComponentsFindAll = handleComponentsFindAll;
module.exports.handleComponentsFindById = handleComponentsFindById;
module.exports.handleComponentsFindByDeviceId = handleComponentsFindByDeviceId;
module.exports.handleComponentsFindByDeviceUid = handleComponentsFindByDeviceUid;
module.exports.handleComponentsFindByType = handleComponentsFindByType;
module.exports.handleComponentsFindByModelName = handleComponentsFindByModelName;
