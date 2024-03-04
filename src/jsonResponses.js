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
    }

    let responseCode = 204; // Updated

    // create the user, if not existing
    if (!users[body.firstName]) {
        users[body.firstName] = {};
        responseCode = 201; // Created
    }

    // applying the user's data
    users[body.firstName].firstName = body.firstName;
    users[body.firstName].lastName = body.lastName;
    users[body.firstName].age = body.age;
    users[body.firstName].diet = body.diet;
    users[body.firstName].weight = body.weight;
    users[body.firstName].height = body.height;
    users[body.firstName].createdAt = Date.now();
    users[body.firstName].logs = {};


    if (responseCode === 201) {
        responseJSON.message = `Profile for '${users[body.firstName].firstName + " " + users[body.firstName].lastName}' has been created successfully.`;
        return respondJSON(request, response, responseCode, responseJSON);
    }
};


// post a meal log
const logMeal = (request, response, body) => {

    const responseJSON = {
        message: 'User not found.',
    };

    // Find the user in the users array
    const userIndex = users.findIndex(user => user.firstName === body.firstName);

    // If the user is found
    if (userIndex !== -1) {
        // Add the meal to the user's meals array
        if (!users[userIndex].logs) {
            users[userIndex].logs = [];
        }
        users[userIndex].logs.push(body.dishName + " " + body.mealTime + " " + body.date + " " + body.dishDesc + " " + body.calCount);

        responseJSON.message = `Meal has been logged for ${body.firstName}.`;
        return respondJSON(request, response, 200, responseJSON);
    };

    const newMeal = {
        date: body.date,
        meal: body.dishName,
        time: body.mealTime,
        description: body.dishDesc,
        calories: body.calCount,
        createdAt: Date.now(),
    };

    // if the fields are empty
    if (!newMeal.date || !newMeal.meal || !newMeal.time || !newMeal.description || !newMeal.calories) {
        const responseJSON = {
            message: 'One or more fields are empty. Please fill out all fields.',
            id: 'missingParams',
        };
        return respondJSON(request, response, 400, responseJSON);
    }


}


// view the log section of the user object
const viewLogs = (request, response, body) => {
    const responseJSON = {
        message: 'One or more fields are empty. Please fill out all fields.',
    };

    // if the search fields are empty
    if (!body.firstNameSearch || !body.lastNameSearch) {
        responseJSON.id = 'missingParams'; // error message
        return respondJSON(request, response, 400, responseJSON);
    }

    let responseCode = 204; // Updated
    users[body.firstName].logs = body.logs;

    // show the logs
    if (responseCode === 204) {
        responseJSON.message = `Logs for '${users[body.firstName].firstName + " " + users[body.firstName].lastName}' have been updated successfully.`;
        return respondJSON(request, response, responseCode, responseJSON);
    }
}


// not found
const notFound = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };

    return respondJSON(request, response, 404, responseJSON);
};


// exporting the functions
module.exports = {
    getUsers,
    createProfile,
    notFound,
    viewLogs,
    logMeal,
};