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

const devicesDao = require('../models/devices-dao');
/**
 * Handle (that is, resolve() or reject()) request for devices
 * to find by Id (e.g., GET /devices/123)
 * 
 * Call devicesDao.findById()
 */
function handleDevicesFindById(request, resolve, reject, id) {
    // Call devicesDao.findById()
    logger.debug(`Calling devicesDao.findById(${id})`, 'handleDevicesFindById()');
    devicesDao.findById(id).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err)
    });
}

/**
 * Handle (that is, resolve() or reject()) request for devices
 * to find by Id (e.g., GET /devices/123)
 * 
 * Call devicesDao.findByManufacturer()
 */
function handleDevicesFindByManufacturer(request, resolve, reject, manufacturer) {
    // Call devicesDao.findByManufacturer()
    logger.debug(`Calling devicesDao.findByManufacturer(${manufacturer})`, 'handleDevicesFindByManufacturer()');
    devicesDao.findByManufacturer(manufacturer).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err)
    });
}

/**
 * Handle (that is, resolve() or reject()) request for devices
 * to find by Id (e.g., GET /devices/123)
 * 
 * Call devicesDao.findByName()
 */
function handleDevicesFindByName(request, resolve, reject, name) {
    // Call devicesDao.findByName()
    logger.debug(`Calling devicesDao.findByName(${name})`, 'handleDevicesFindByName()');
    devicesDao.findByName(name).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err)
    });
}


/**
 * Handle (that is, resolve() or reject()) request for devices
 * to find by Id (e.g., GET /devices/123)
 * 
 * Call devicesDao.findAll()
 */
function handleDevicesFindAll(request, resolve, reject) {
    // Call devicesDao.findAll()
    logger.debug(`Calling devicesDao.findAll()`, 'handleDevicesFindAll()');
    devicesDao.findAll().then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err)
    });
}

/**
 * Handle (i.e., resolve() or reject()) request for devices
 * to update the device (e.g., PUT /devices/123)
 * 
 * Call devicesDao.update() after getting body using utils.processRequestBody()
 */
function handleDevicesUpdate(request, resolve, reject, id) {
    // TODO: WRITE CODE
    utils.processRequestBody(request).then((requestBody) => {
        logger.debug(`Calling devicesDao.update() with request: ${requestBody}`, 'handleDevicesUpdate()');
        let requestBodyJson = JSON.parse(requestBody);
        devicesDao.update(
			id,
			requestBodyJson.name,
			requestBodyJson.firmware_version,
			requestBodyJson.active).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    }).catch((err) => {
        logger.error(`Error processing request body: ${err.message}`, 'handleDevicesUpdate()');
        reject(err);
    });
}

/**
 * Handle (i.e., resolve() or reject()) request for devices
 * to find device by name (e.g., POST /devices)
 * 
 * Call devicesDao.create() after getting body using utils.processRequestBody()
 */
function handleDevicesRegister(request, resolve, reject) {
    utils.processRequestBody(request).then((requestBody) => {
        logger.debug(`Calling devicesDao.register() with request: ${requestBody}`, 'handleDevicesRegister()');
        let requestBodyJson = JSON.parse(requestBody);
        devicesDao.register(
		requestBodyJson.uid,
		requestBodyJson.name,
        requestBodyJson.model_name,
        requestBodyJson.firmware_version).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    }).catch((err) => {
        logger.error(`Error processing request body: ${err.message}`, 'handleDevicesRegister()');
        reject(err);
    });
}


/**
 * Handle (i.e., resolve() or reject()) request for devices
 * to delete the device (e.g., DELETE /devices/123)
 * 
 */
function handleDevicesDelete(request, resolve, reject, id) {
    devicesDao.del(id).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err);
    });
}


// TODO: Make sure to export the functions you want to be visible to the rest of the app
module.exports.handleDevicesRegister = handleDevicesRegister;
module.exports.handleDevicesUpdate = handleDevicesUpdate;
module.exports.handleDevicesDelete = handleDevicesDelete;
module.exports.handleDevicesFindAll = handleDevicesFindAll;
module.exports.handleDevicesFindById = handleDevicesFindById;
module.exports.handleDevicesFindByName = handleDevicesFindByName;
module.exports.handleDevicesFindByManufacturer = handleDevicesFindByManufacturer;
