// JSON responses

// user object where profiles will be stored
const users = {};

const respondJSON = (request, response, status, object) => {
    // content types for the headers
    const headers = {
        'Content-Type': 'application/json'
    };

    // write to the page
    response.writeHead(status, headers);
    response.write(JSON.stringify(object));
    response.end();
};

