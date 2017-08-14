let url = require('url');
let fs = require('fs');
function route(req, res, handle) {
	let pathname = url.parse(req.url).pathname;
	if(typeof handle[pathname] == 'function') {
		handle[pathname](req, res);
	} else {
		// request for static resource(maybe should check first, coz some files are forbidden to access)
		fs.stat(__dirname + pathname, (err, stat) => {
			if(err || ! stat.isFile()) {
				res.writeHead(404);
				res.end('404 not found for ' + pathname);
				return;
			}
			res.writeHead(200, {'Content-Type': 'application/jpg'});
			fs.createReadStream(__dirname + pathname).pipe(res);
		})
	}
}
exports.route = route;