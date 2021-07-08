var jwt = require("jsonwebtoken");

const generateAuthToken = (user) => {
    const token = jwt.sign({ id: user._id }, 'hamza_movie_app')
    return token
}

module.exports = generateAuthToken;