const telemetryQueries = require('../model/telemetry/queries')

module.exports = {
	search: telemetryQueries.measurements,
	query: telemetryQueries.query
}