/*!
 * express-php
 * Copyright(c) 2021 Matteo C.
 * MIT Licensed
*/

"use strict";
var path = require("path"),
    util = require("util"),
    querystring = require("querystring"),
    { exec } = require("child_process");

module.exports = (filePath, options, callback) =>{
	var binaryPath = this.binaryPath,
		runnerPath = this.runnerPath,
		displayErrors = this.displayErrors,

		method = options.method || "GET",
		get = options.get || {},
		post = options.post || {},

		query = options.query || querystring.stringify(get),
		body = options.body || querystring.stringify(post),

		environment = {
			REQUEST_METHOD: method,
			CONTENT_LENGTH: body.length,
			QUERY_STRING: query
		};

	var command = util.format(
		"%s %s %s %s",
		(body ? util.format("echo \"%s\" | ", body) : "") + binaryPath,
		runnerPath,
		path.dirname(filePath),
		filePath
	);

	exec(command, { env: environment }, (error, stdout, stderr) =>{
		if(error){
			if(displayErrors && stdout) callback(stdout);
			else callback(error);
		} else if(stdout) callback(null, stdout);
		else if(stderr) callback(stderr);
		else callback(null, null);
	});
};