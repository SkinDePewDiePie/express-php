/*!
 * express-php
 * Copyright(c) 2021 Matteo C.
 * MIT Licensed
*/

"use strict";
module.exports = (request, response) =>{
	response.render(request.path.slice(1), {
		method: request.method,
		get: request.query,
		post: request.body
	});
};