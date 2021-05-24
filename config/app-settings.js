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
 * appSettings - all relative to the project root
 */
const appSettings = {
    db_file_name : './data/esp_catalog.db',
    create_sql : {
        model : './scripts/model.sql',
        device : './scripts/device.sql',
        device_component : './scripts/device_component.sql',
        firmware : './scripts/firmware.sql',
    },
    model_file_name : './data/models.csv',
    device_file_name : './data/devices.csv',
    device_component_file_name : './data/device_components.csv',
    firmware_file_name : './data/firmwares.csv',

    server_host : '0.0.0.0',
    server_listen_port : 8000,
};

module.exports = appSettings;