import { ObjectId } from 'mongodb';

const exportedMethods = {
    idValidation(id, varName) {
        if (!id) throw `Error: You must provide an ${varName} id to search for`;
        if (typeof id !== 'string') throw `Error:${varName} must be a string`;
        id = id.trim();
        if (id.length === 0) throw `Error: ${varName} cannot be an empty string or just spaces`;
        if (!ObjectId.isValid(id)) throw `Error: ${varName} is invalid object ID`;
        return id;
    },
    stringValidation(strVal, varName) {

        if (!strVal) throw `Error: You must supply a ${varName}!`;
        if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
        strVal = strVal.trim();
        if (strVal.length === 0) throw `Error: ${varName} cannot be an empty string or string with just spaces`;
        if (!isNaN(strVal)) throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
        return strVal;
    },
    nameValid(name, varName) {
        let checkName = /^[a-zA-Z]/; // Regular expression to match valid firstName
        if (name.length < 2 || name.length > 25)
            throw `${varName} name should be in length between 2 to 25.`;
        if (!checkName.test(name)) {
            throw `Invalid ${varName} name.`
        }
        return name;
    },
    emailValidation(email) {
        const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailCheck.test(email)) {
            throw `Must have format as example@example.com`;
        }
        const toLower = email.toLowerCase();
        return toLower;
    },

    passwordValidation(password) {
        if (!password || password.length < 8 || password.includes(" ")) {
            throw `Password must be at least 8 characters long and cannot contain empty spaces.`;
        }
        const toUpper = /[A-Z]/;
        const toNumber = /[0-9]/;
        const toSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if (!toUpper.test(password) || !toNumber.test(password) || !toSpecialChar.test(password)) {
            throw `Password must contain at least one uppercase character, one number, and one special character.`;
        }
        return password;
    },
    confirmPaswordValidation(password, confirmPassword) {
        if (password !== confirmPassword) {
            throw 'Password and confirm Password must be same.'
        }
        return confirmPassword;
    },

    phoneNumberValidation(phoneNumber) {

        phoneNumber = phoneNumber.replace(/\s+/g, '').replace(/\D/g, '');

        if (phoneNumber.length !== 10) {
            throw ('Phone number should be 10 digits long');
        }

        return phoneNumber;
    },

    zipCodeValidation(zip) {
        // Remove any whitespace characters from the ZIP code
        zip = zip.replace(/\s+/g, '');

        // Check if ZIP code is a 5-digit number or a 9-digit number with a hyphen
        if (!/^\d{5}(?:-\d{4})?$/.test(zip)) {
            throw new Error('Please enter a valid ZIP code');
        }

        // ZIP code is valid
        return zip;
    },

    ratingValidation(rating) {
        if (rating >= 1 && rating <= 5) {
            return rating;
        }
        else throw new Error('please enter valid rating between 1 to 5')
       

    }





};

export default exportedMethods;