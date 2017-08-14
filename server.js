let http = require('http');
let fs = require('fs');
const imagesPath = '/images';
let server = http.createServer((req, res) => {
	function serve(path, type) {
		res.writeHead(200, {'Content-Type': type});
		fs.createReadStream(path).pipe(res);
	}
	if(req.method == 'GET' && req.url.slice(0,7) == imagesPath) {
		fs.stat(__dirname + req.url, (err, stat) => {
			if(err || !stat.isFile()) {
				res.writeHead(404);
				res.end('not found!');
				return;
			}
			serve(__dirname + req.url, 'application/jpg');
		})
	} else {
		if(req.method == 'GET' && req.url == '/') {
			serve(__dirname + '/index.html', 'text/html');
		}
	}
}).listen(8080, () => console.log('server listens on port 8080'));