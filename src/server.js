// Server JS
const http = require('http');
const url = require('url');
const query = require('querystring');


const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
    console.log(request);
}


http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127..0.01:${port}`);
})