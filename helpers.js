import {ObjectId} from 'mongodb';

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
            throw `name should be in length between 2 to 25.`;
        if(!checkName.test(name)){
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

        phoneNumberValidation(phoneNumber) {
          
            phoneNumber = phoneNumber.replace(/\s+/g, '').replace(/\D/g, '');
          
            if (phoneNumber.length !== 10) {
              throw ('Phone number should be 10 digits long');
            }
            if (!/^[789]\d{9}$/.test(phoneNumber)) {
              throw ('Phone number should start with 7, 8, or 9');
            }
            return phoneNumber;
          },

        dobValidation(dob) {
            // Parse the input string to a Date object
            const date = new Date(dob);
          
            // Check if the date is valid
            if (isNaN(date.getTime())) {
              throw new Error('Invalid date format. Please enter a valid date in the format YYYY-MM-DD');
            }
          
            // Check if the person is at least 18 years old
            const today = new Date();
            const age = today.getFullYear() - date.getFullYear();
            const monthDiff = today.getMonth() - date.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
              age--;
            }
            if (age < 13) {
              throw new Error('You must be at least 18 years old to use this service');
            }
          
            // Date of birth is valid
            return true;
          }

      

};

export default exportedMethods;