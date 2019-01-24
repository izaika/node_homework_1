const http = require('http');

const { getRouteString } = require('./utils');
const routes = require('./routes');
const handlers = require('./handlers');

const server = http.createServer((request, response) => {
  let body = '';
  request.setEncoding('utf8');
  request.on('data', chunk => (body += chunk));

  request.on('end', async () => {
    const handlerName = routes[getRouteString(request)] || 'notFound';
    const responseBody = await handlers[handlerName]();

    response.setHeader('Content-Type', 'application/json');
    response.writeHead(responseBody.statusCode);
    response.end(JSON.stringify(responseBody));
  });
});

server.listen(8000, () => console.log('Server is running on port 8000'));
