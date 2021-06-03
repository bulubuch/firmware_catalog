/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   scaffold.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbuch <bulubuch@gmail.com>                 +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/05/30 22:33:18 by mbuch             #+#    #+#             */
/*   Updated: 2021/05/30 22:33:18 by mbuch            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/*
**	Scaffold Tool
**
**	Node js application generator
**
*/

const application = require("./src/application");
const server = require("./src/client");
const storrage = require("./src/storrage");
const dataModel = require("./src/dataModel");
const dataField = require("./src/dataField");
const types = require('./src/dataType');
const fs = require('fs')
const path = require('path');

let input_file = null;
let api_output_dir = '.';
let admin_output_dir = './admin/';

if (process.argv.length > 2) {
	input_file = process.argv[2];
	if (process.argv.length > 3) {
		api_output_dir = process.argv[3];
		if (process.argv.length > 4) {
			admin_output_dir = process.argv[3];

		}
	}
} else {
	return
}

function error(err)
{
	if (err)
		console.log("Error: " + err);
}

function scaffoldFile(file) {
	let obj = require(path.resolve(file));
	sql.scaffold(obj, api_output_dir);
	api.scaffold(obj.type, api_output_dir);
	cli.scaffold(obj.type, admin_output_dir);
	fs.copyFile(file, `${api_output_dir}/src/model/${obj.type.name}/type.js`, error);
}


// let dir = `${api_output_dir}/src`;
// if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
// dir = `${api_output_dir}/src/model`;
// if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
// dir = `${api_output_dir}/src/routes`;
// if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
// dir = `${api_output_dir}/src/schema`;
// if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
// dir = `${api_output_dir}/sql`;
// if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }

// scaffoldFile(file);

module.exports.scaffoldFile = scaffoldFile;
module.exports.application = application;
module.exports.storrage = storrage;
module.exports.server = server;
module.exports.dataModel = dataModel;