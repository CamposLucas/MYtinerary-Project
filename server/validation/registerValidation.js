const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username: "";
    data.email = !isEmpty(data.email) ? data.email: "";
    data.password = !isEmpty(data.password) ? data.password: "";
    data.firstName = !isEmpty(data.firstName) ? data.firstName: "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName: "";
    data.country = !isEmpty(data.country) ? data.country: "";

    if(Validator.isEmpty(data.username)) {
        errors.username = "Username field is required";
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = "password field is required";
    }

    if(Validator.isEmpty(data.firstName)) {
        errors.firstName = "Name field is required";
    }

    if(Validator.isEmpty(data.lastName)) {
        errors.lastName = "Last Name field is required";
    }

    if(Validator.isEmpty(data.country)) {
        errors.country = "country field is required";
    }

    if(!Validator.isLength(data.password, {min:6, max:30})) {
        errors.password = "Password must be at least 6 characters";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}