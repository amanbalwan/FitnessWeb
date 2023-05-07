import { ObjectId } from "mongodb";

const exportedMethods = {
  idValidation(id, varName) {
    if (!id) throw `Error: You must provide an ${varName} id to search for`;
    if (typeof id !== "string") throw `Error:${varName} must be a string`;
    id = id.trim();
    if (id.length === 0)
      throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: ${varName} is invalid object ID`;
    return id;
  },

  stringValidation(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== "string") throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  },
  nameValid(name, varName) {
    let checkName = /^[a-zA-Z]/; // Regular expression to match valid firstName
    if (name.length < 2 || name.length > 25)
      throw `${varName} name should be in length between 2 to 25.`;
    if (!checkName.test(name)) {
      throw `Invalid ${varName} name.`;
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
    if (
      !toUpper.test(password) ||
      !toNumber.test(password) ||
      !toSpecialChar.test(password)
    ) {
      throw `Password must contain at least one uppercase character, one number, and one special character.`;
    }
    return password;
  },
  confirmPaswordValidation(password, confirmPassword) {
    if (password !== confirmPassword) {
      throw "Password and confirm Password must be same.";
    }
    return confirmPassword;
  },

  phoneNumberValidation(phoneNumber) {
    phoneNumber = phoneNumber.replace(/\s+/g, "").replace(/\D/g, "");

    if (phoneNumber.length !== 10) {
      throw "Phone number should be 10 digits long";
    }

    return phoneNumber;
  },

  checkNumber(value, varName) {
    value = value.replace(/\s+/g, "").replace(/\D/g, "");

    if (!value.length) throw `${varName} should contain atleast 1 digit`;

    return value;
  },

  ageValidation(age) {
    // Parse the input string to a Date object
    if (!age) throw `Error: You must supply a age!`;

    if (age < 13) {
      throw new Error("You must be at least 13 years old to use this service");
    }

    return age;
  },

  heightValidation(height) {
    // Check if height is a positive number
    if (isNaN(height) || height <= 0) {
      throw new Error("Please enter a valid height in centimeters");
    }

    // Height is valid
    return height;
  },

  weightValidation(weight) {
    // Check if weight is a positive number
    if (isNaN(weight) || weight <= 0) {
      throw new Error("Please enter a valid weight in kilograms");
    }

    // Weight is valid
    return weight;
  },

  fitnessLevelValidation(fitnessLevel) {
    if (fitnessLevel === "") throw "Please select a fitness level.";

    return fitnessLevel;
  },

  zipCodeValidation(zip) {
    // Remove any whitespace characters from the ZIP code
    zip = zip.replace(/\s+/g, "");

    // Check if ZIP code is a 5-digit number or a 9-digit number with a hyphen
    if (!/^\d{5}(?:-\d{4})?$/.test(zip)) {
      throw new Error("Please enter a valid ZIP code");
    }

    // ZIP code is valid
    return zip;
  },

  checkDate(value, varName) {
    const date = new Date(value);

    if (Object.prototype.toString.call(date) !== "[object Date]" || isNaN(date))
      throw `${varName} is invalid`;

    return date;
  },
};

export default exportedMethods;
