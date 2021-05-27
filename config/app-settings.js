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
	app_name: "modulabAPI",
    db_file_name : './data/esp_catalog.db',
    create_sql : {
        model : './sql/model.sql',
        device : './sql/device.sql',
        component : './sql/component.sql',
        firmware : './sql/firmware.sql',
    },
    model_file_name : './data/models.csv',
    device_file_name : './data/devices.csv',
    component_file_name : './data/components.csv',
    firmware_file_name : './data/firmwares.csv',

    mqtt_broker : '192.168.1.137',
    mqtt_client_id : 'modulabAPI',
    influx_host : '192.168.1.137',
    influx_database : 'modulab',
    server_host : '0.0.0.0',
    server_listen_port : 8000,
	private_key: "ModuLabPrivateKey"
};

module.exports = appSettings;