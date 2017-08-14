let fs = require('fs');
function Index(res) {
	// serve(__dirname + '/index.html', 'text/html');
	res.writeHead(200, {'Content-Type': 'text/html'});
	fs.createReadStream(__dirname + '/index.html').pipe(res);
}
function staticSource(req, res) {
		fs.stat(__dirname + req.url, (err, stat) => {
			if(err || !stat.isFile()) {
				// console.log(err);
				res.writeHead(404);
				res.end('not found');
				// why write a return statement?
				return;
			}
		res.writeHead(200, 'application/jpg');
		fs.createReadStream(__dirname + req.url).pipe(res);
		})
}
exports.Index = Index;
exports.staticSource = staticSource;