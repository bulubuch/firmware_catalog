const telemetryQueries = require('../models/telemetry/queries')
const telemetryMutations = require('../models/telemetry/mutations')

module.exports = {
	create: telemetryMutations.createTelemetry,
	delete: telemetryMutations.deleteTelemetry,
	update: telemetryMutations.updateTelemetry,
	search: telemetryQueries.telemetrys,
}