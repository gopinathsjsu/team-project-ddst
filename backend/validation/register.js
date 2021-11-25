const Validator = require('validator');
const isEmpty = require('is-empty');
module.exports = function validateRegisterInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.emailID = !isEmpty(data.emailID) ? data.emailID : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    // Name checks
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = 'Name field is required';
    }
    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last Name field is required';
    }
    // Email checks
    if (Validator.isEmpty(data.emailID)) {
        errors.emailID = 'Email field is required';
    } else if (!Validator.isEmail(data.emailID)) {
        errors.emailID = 'Email is invalid';
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters';
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
};
