// acesss the HTML stuff
const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const page2 = fs.readFileSync(`${__dirname}/../client/client2.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);



const getIndex = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(index);
    response.end();
};

const getPage2 = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(page2);
    response.end();
}

const getCSS = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/css' });
    response.write(css);
    response.end();
}

module.exports = {
    getIndex,
    getPage2,
    getCSS,
}