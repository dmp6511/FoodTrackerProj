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

const getUsers = (request, response) => {
    const responseJSON = {
        users,
    };

    return respondJSON(request, response, 200, responseJSON);
};

// creating a user
const createProfile = (request, response, body) => {
    const responseJSON = {
        message: 'One or more fields are empty. Please fill out all fields.',
    };

    // if the fields are empty
    if (!body.firstName || !body.lastName || !body.age || !body.diet || !body.weight || !body.height) {
        responseJSON.id = 'missingParams'; // error message
        return respondJSON(request, response, 400, responseJSON);
    };

    let responseCode = 204; // Updated

    // create the user, if not existing
    if (!users[body.firstName]) {
        users[body.firstName] = {};
        users[body.firstName].firstName = body.firstName;
        users[body.firstName].lastName = body.lastName;
        users[body.firstName].age = body.age;
        users[body.firstName].diet = body.diet;
        users[body.firstName].weight = body.weight;
        users[body.firstName].height = body.height;
        users[body.firstName].createdAt = Date.now();
        responseCode = 201; // Created

        if (responseCode === 201) {
            responseJSON.message = `Profile for ${users[body.firstName]} has created successfully.`;
            return respondJSON(request, response, responseCode, responseJSON);
        }
    }
};