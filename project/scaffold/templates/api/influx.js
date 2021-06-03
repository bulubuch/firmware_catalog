let this.influxClient = new Promise((resolve, reject) => {
	let client = influx.init(appSettings.influx_host, appSettings.influx_database, [
	{
		measurement: 'telemetry',
		fields: {
			air_temperature: Influx.FieldType.INTEGER,
			air_humidity: Influx.FieldType.INTEGER,
			soil_temperature: Influx.FieldType.INTEGER,
			soil_moisture: Influx.FieldType.INTEGER,
			battery: Influx.FieldType.INTEGER
		},
		tags: [
			'device_uid'
		]
	}]);
	if (client) {
		resolve(client);
	} else {
		reject(client);
	}
})
this.influxClient.then(res => {
	mqtt.start(res);
	return res;
}).catch(err => {

});
