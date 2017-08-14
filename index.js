let server = require('./server.js');
let requestHandlers = require('./requestHandlers.js');
let router = require('./router.js');
let handle = {};

// first letter of method that lead to a new page should be capital
handle['/'] = requestHandlers.Index;
handle['/index'] = requestHandlers.Index;
server.start(router.route, handle);
