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
 * This module handles all routes supported by the application.
 * You should use it as-is with no changes. If you find yourself
 * making changes to this module (unless to fix a bug, in which case
 * please log an issue), you have probably gone off the tracks
 * somewhere.
 */
// Utilities
const utils = require('../utils/utils');
// Logger
const logger = require('../utils/logger');
logger.setLogLevel(logger.Level.DEBUG);

// Route Handlers
const modelsHandler = require('./models-handler');
const firmwaresHandler = require('./firmwares-handler');

/**
 * Handle request for all supported /firmwares paths
 */
function routeFirmwaresRequest(request, parsedUrl) {
    return new Promise((resolve, reject) => {
        logger.debug('Cracking message', 'routeFirmwaresRequest()');
        let urlPath = utils.parseUrl(parsedUrl.pathname).pathComponents;
        switch (urlPath.length) {
            case 1:
                routeFirmwaresOnly(request, resolve, reject, parsedUrl);
                break;
            case 2:
                if (urlPath[1] == "module_update") {
                    routeFirmwaresModuleUpdate(request, resolve, reject, parsedUrl);
                } else {
                    // Handle firmwares with id (e.g., /firmwares/122)
                    routeFirmwaresWithId(request, resolve, reject, parsedUrl, urlPath[1]);
                }
                break;
            default:
                var message = `Invalid path: ${parsedUrl} for method: ${request.method}`;
                logger.error(message, 'routeFirmwaresRequest()');
                reject(message);
                break;
        }    
    });
}

/**
 * Routes request for GET for firmwares only (e.g., /firmwares)
 */
function routeFirmwaresOnly(request, resolve, reject, parsedUrl) {
    switch (request.method) {
        case 'GET':
            // create firmware
            firmwaresHandler.handleFirmwaresFindAll(request, resolve, reject, parsedUrl);
            break;
        case 'POST':
            // create firmware
            firmwaresHandler.handleFirmwaresCreate(request, resolve, reject);
            break;
        default:
            var message = `HTTP Method ${request.method} is not supported for ${parsedUrl.pathname}`;
            logger.error(message, 'routeFirmwaresRequest()');
            reject(message);
            break;
    }
}

/**
 * Routes request for GET for firmwares only (e.g., /firmwares)
 */
function routeFirmwaresModuleUpdate(request, resolve, reject, parsedUrl) {
    switch (request.method) {
        case 'GET':
            firmwaresHandler.handleFirmwaresFindNewVersion(request, resolve, reject, parsedUrl);
            break;
        default:
            var message = `HTTP Method ${request.method} is not supported for ${parsedUrl.pathname}`;
            logger.error(message, 'routeFirmwaresRequest()');
            reject(message);
            break;
    }
}

/**
 * Routes request for GET for firmwares with id (e.g., /firmwares/123)
 */
function routeFirmwaresWithId(request, resolve, reject, parsedUrl, id) {
    switch (request.method) {
        case 'GET':
            // find by id
            firmwaresHandler.handleFirmwaresFindById(request, resolve, reject, id);
            break;
        case 'PUT':
            // update firmware
            firmwaresHandler.handleFirmwaresUpdate(request, resolve, reject, id);
            break;
        case 'DELETE':
            // Delete firmware
            firmwaresHandler.handleFirmwaresDelete(request, resolve, reject, id);
            break;
        default:
            var message = `HTTP Method ${request.method} is not supported for ${parsedUrl.pathname}`;
            logger.error(message, 'routeFirmwaresRequest()');
            reject(message);
            break;
    }
}

/**
 * Route request for all supported /firmwares paths:
 * /model/
 * /model/id (e.g., /model/123)
 */
function routeModelsRequest(request, parsedUrl) {
    return new Promise((resolve, reject) => {
        // Crack on length first, then method (in the next layer)
        let urlPath = utils.parseUrl(parsedUrl.pathname).pathComponents;
        switch (urlPath.length) {
            case 1:
                // Handle model (e.g., /model)
                routeModelsOnly(request, resolve, reject, parsedUrl);
                break;
            case 2:
                // Handle model with id (e.g., /model/123)
                routeModelsWithId(request, resolve, reject, parsedUrl, urlPath[1]);
                break;
            default:
                let message = `Unsupported path: ${parsedUrl.pathname}`;
                logger.error(message, 'routeModelsRequest()');
                reject(message);
        }
    });
}

/**
 * Route request for GET and POST for /models URL only (e.g., /models)
 */
function routeModelsOnly(request, resolve, reject, parsedUrl) {
    switch (request.method) {
        case 'GET':
            // All Model
            modelsHandler.handleModelsFindAll(request, resolve, reject);
            break;
        case 'POST':
            // create Model
            modelsHandler.handleModelsCreate(request, resolve, reject);
            break;
        default:
            var message = `HTTP Method ${request.method} is not supported for ${parsedUrl.pathname}`;
            logger.error(message, 'routeModelsRequest()');
            reject(message);
            break;
    }
}

/**
 * Route request for GET and PUT for /models/id (e.g., /models/123)
 */
function routeModelsWithId(request, resolve, reject, parsedUrl, id) {
    switch (request.method) {
        case 'GET':
            // findById
            modelsHandler.handleModelsFindById(request, resolve, reject, id);
            break;
        case 'PUT':
            // update model
            modelsHandler.handleModelsUpdate(request, resolve, reject, id);
            break;
        case 'DELETE':
            // Delete model
            modelsHandler.handleModelsDelete(request, resolve, reject, id);
            break;
        default:
            var message = `HTTP Method ${request.method} is not supported for ${parsedUrl.pathname}`;
            logger.error(message, 'routeModelsRequest()');
            reject(message);
            break;
    }
}

// What's exported
module.exports.routeFirmwaresRequest = routeFirmwaresRequest;
module.exports.routeModelsRequest = routeModelsRequest;