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

    // create the meal object
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

    // log the meal
    if (users[body.firstName]) {
        users[body.firstName].logs = users[body.firstName].logs || {};
        users[body.firstName].logs[Date.now()] = newMeal;

        responseJSON.message = `Meal has been logged for ${body.firstName}.`;
        return respondJSON(request, response, 200, responseJSON);
    }
}


// view the log section of the user object
const viewLogs = (request, response, body) => {
    const responseJSON = {
        message: "user not found",
    };

    if (users[body.firstName]) {
        responseJSON.message = `Logs for ${body.firstName}:`;
        responseJSON.logs = users[body.firstName].logs;
        return respondJSON(request, response, 200, responseJSON);
    }

    responseJSON.message = "No logs found for user.";
    return respondJSON(request, response, 200, responseJSON);
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