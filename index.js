const http = require('http');
const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/data.json`, 'utf-8');
const productData = JSON.parse(data);

const server = http.createServer((request, response) => {
    const path = request.url;
    console.log(path);
    
    if(path === '/' || path === '/overview') {
        response.end('Overview');
    } else if (path === '/product') {
        response.end('Product');
    } else if (path === '/api') {
        response.writeHead(200, {
            'Content-type': 'application/json'
        });

        response.end(data);
    } else {
        response.writeHead(404, {
            'Content-type': 'text/html',
            'Customer-Header': 'Hello World!'
        });
        response.end('<h1>Page not found</h1>');
    }

    console.log(request.url);
    
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening on port 8000');
});