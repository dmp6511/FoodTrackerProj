// Server JS
const http = require('http');
const url = require('url');
const query = require('querystring');


// Handlers
const jsonHandler = require('./jsonResponses');
const htmlHandler = require('./htmlResponses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// parsing the body text
const parseBody = (request, response, handler) => {
    const body = [];

    request.on('error', (err) => {
        console.dir(err);
        response.statusCode = 400;
        response.end();
    })


    // used whenever we get a 'chunk' of data
    request.on('data', (chunk) => {
        body.push(chunk); // will push the chunks together in received order
    });

    // turns the body array into a string when the request is finished
    request.on('end', () => {
        const bodyString = Buffer.concat(body).toString();
        const bodyParams = query.parse(bodyString);

        handler(request, response, bodyParams);
    });
};



// GET handler function
const handleGet = (request, response, parsedURL) => {

    // path routes
    if (parsedURL.pathname === '/style.css') {
        htmlHandler.getCSS(request, response);
    } else if (parsedURL.pathname === '/page2') {
        htmlHandler.getPage2(request, response);
    } else {
        htmlHandler.getIndex(request, response);
    }
};

const onRequest = (request, response) => {
    console.log(request);
    const parsedURL = url.parse(request.url);

    // checking the method of the request
    handleGet(request, response, parsedURL);
}


http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.01:${port}`);
})