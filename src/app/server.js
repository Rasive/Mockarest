var http = require('http');

var handleRequest = (request, response) => {
    console.log('recieved request from url: ' + request.url);
    response.writeHead(200);
    response.end('Hello World!');
};

var www = http.createServer(handleRequest);
www.listen(8888);
