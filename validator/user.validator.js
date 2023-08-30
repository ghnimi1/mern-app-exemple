const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateUser(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : "";
    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (!validator.isEmail(data.email)) {
        errors.email = "Format Email required";
    }
    if (validator.isEmpty(data.email)) {
        errors.email = "Required Email";
    }
    if (validator.isEmpty(data.username)) {
        errors.username = "Required Username";
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "Required Password";
    }
    if (data.password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};