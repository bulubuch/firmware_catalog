module.exports = (app) => {
	return `{
	"name": "${app.name}",
	"version": "1.0.0",
	"description": "${app.description}",
	"main": "app.js",
	"scripts": {
		"load-db": "node ./utils/load-db",
		"start": "node app.js",
		"start-dev": "nodemon app.js"
	},
	"repository": {
		"type": "git",
		"url": "${app.repo}"
	},
	"keywords": [
		"node",
		"npm"
	],
	"author": "${app.author}",
	"dependencies": {
	}
}`
}
