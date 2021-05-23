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
// Node HTTP module
const http = require('http');
// Node URL module
const url = require('url');// To avoid confusion
const fs = require('fs')
// Logger
const logger = require('./utils/logger');
logger.setLogLevel(logger.Level.DEBUG);
// Utilities
const utils = require('./utils/utils');
// App settings
const appSettings = require('./config/app-settings');
// Routing
const routes = require('./controllers/routes');
// var nstatic = require('node-static');

// var file = new(nstatic.Server)(__dirname + "public/");

/**
 * Creates an HTTP server that acts as the entry point
 * to the REST services:
 * 
 * - Firmwares requests (e.g., /firmwares?id=123)
 * - Models requests (e.g., /lists/123, lists/123/firmwares/567)
 */
http.createServer(((request, response) => {
//    file.serve(request.response);
    let parsedUrl = url.parse(request.url, true);
    // Routing is really not super easy with Vanilla Node
    logger.debug(`CREATING SERVER: ${parsedUrl.pathname}`, 'http.createServer:on(request)');
    if (parsedUrl.pathname.startsWith('/firmwares')) {
        logger.debug(`Greetings from pathname: ${parsedUrl.pathname}`, 'http.createServer:on(request)');
        // Route /firmwares URL
        routes.routeFirmwaresRequest(request, parsedUrl).then((results) => {
            utils.writeServerJsonResponse(response, results.data, results.statusCode);
        }).catch((rejectReason) => {
            utils.writeServerResponse(response, rejectReason, 400);
        });
    } else if (parsedUrl.pathname.startsWith('/models')) {
        logger.debug(`Greetings from pathname: ${parsedUrl.pathname}`, 'http.createServer:on(request)');
        // Route /models URL
        routes.routeModelsRequest(request, parsedUrl).then((results) => {
            utils.writeServerJsonResponse(response, results.data, results.statusCode);
        }).catch((rejectReason) => {
            utils.writeServerResponse(response, rejectReason, 400);
        });
    } else if (parsedUrl.pathname.startsWith('/dashboard')) {
        logger.debug(`Greetings from pathname: ${parsedUrl.pathname}`, 'http.createServer:on(request)');
        // Route /dashboard URL
		response.writeHead(200, { 'content-type': 'text/html' })
		fs.createReadStream('views/dashboard.html').pipe(response)
        // routes.routeModelsRequest(request, parsedUrl).then((results) => {
        //     utils.writeServerJsonResponse(response, results.data, results.statusCode);
        // }).catch((rejectReason) => {
        //     utils.writeServerResponse(response, rejectReason, 400);
        // });
    } else {
        // Anything else gets an error message
        let errorMessage = `Unknown pathname: ${parsedUrl.pathname}', cannot continue.`;
        console.log('HTTP Server running on port 8000');
         logger.error(errorMessage, 'http.createServer:on(request)');
        utils.writeServerResponse(response, errorMessage, 404);
    }
})).listen({ port : appSettings.server_listen_port, host : appSettings.server_host });
