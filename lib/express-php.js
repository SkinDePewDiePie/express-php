/*!
 * express-php
 * Copyright(c) 2021 Matteo C.
 * MIT Licensed
*/

"use strict";

module.exports = (options) =>{
	options = options || {};
	var platform = (process.platform === "win32" ? "windows" : "linux");

	this.binaryPath = options.binaryPath || `./php/${platform}/php${platform === "windows" ? "-win.exe" : ""}`;
	this.runnerPath = options.runnerPath;

	this.displayErrors = typeof options.displayErrors === "undefined" ? true : options.displayErrors;
	
	this.engine = require("./engine").bind(this);
	this.router = require("./router").bind(this);
};