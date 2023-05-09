
 function idValidation(id, varName) {
    if (!id) throw `Error: You must provide an ${varName} id to search for`;
    if (typeof id !== 'string') throw `Error:${varName} must be a string`;
    id = id.trim();
    if (id.length === 0) throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: ${varName} is invalid object ID`;
    return id;
  };
  function checkNumber(value, varName) {
    value = value.replace(/\s+/g, "").replace(/\D/g, "");

    if (!value.length) throw `${varName} should contain atleast 1 digit`;

    return value;
  };
  function storeNameValid(storeName, varName) {
    if(!storeName) throw `Error: You must supply a ${varName}!`;
    if (typeof storeName !== 'string') throw `Error: ${varName} must be a string!`;
    storeName = storeName.trim();
    if (storeName.length === 0) throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(storeName)) throw `Error: ${storeName} is not a valid value for ${varName} as it only contains digits`;
    return storeName;
};

function stringValidation(strVal, varName) {
    
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0) throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal)) throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  };
  function nameValid(name, varName) {
    let checkName = /^[a-zA-Z]/; // Regular expression to match valid firstName
    if (name.length < 2 || name.length > 25)
        throw `${varName} name should be in length between 2 to 25.`;
    if(!checkName.test(name)){
        throw `Invalid ${varName} name.`
    }
    return name;
};

function  emailValidation(email) {
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailCheck.test(email)) {
      throw `Must have format as example@example.com`;
    }
    const toLower = email.toLowerCase();
    return toLower;
  };

  function  passwordValidation(password) {
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
    };

 function  confirmPaswordValidation(password,confirmPassword){
    if(password!==confirmPassword){
      throw 'Password and confirm Password must be same.'
    }
    return confirmPassword;
  };

  function   phoneNumberValidation(phoneNumber) {
      
        phoneNumber = phoneNumber.replace(/\s+/g, '').replace(/\D/g, '');
      
        if (phoneNumber.length !== 10) {
          throw ('Phone number should be 10 digits long');
        }
        
        return phoneNumber;
      };

      function ageValidation(age) {
        // Parse the input string to a Date object
        if (!age) throw `Error: You must supply a age!`;
        
        if (age < 13) {
          throw new Error('You must be at least 13 years old to use this service');
        }
      
        
        return age;
      };

      function heightValidation(height) {
        // Check if height is a positive number
        if (isNaN(height) || height <= 0) {
          throw new Error('Please enter a valid height in centimeters');
        }
      
        // Height is valid
        return height;
      };

      function weightValidation(weight) {
        // Check if weight is a positive number
        if (isNaN(weight) || weight <= 0) {
          throw new Error('Please enter a valid weight in kilograms');
        }
      
        // Weight is valid
        return weight;
      };

      function  fitnessLevelValidation(fitnessLevel){
        if(fitnessLevel === '')
          throw ('Please select a fitness level.');
        
        return fitnessLevel
        
      };

      function  zipCodeValidation(zip) {
        // Remove any whitespace characters from the ZIP code
        zip = zip.replace(/\s+/g, '');
      
        // Check if ZIP code is a 5-digit number or a 9-digit number with a hyphen
        if (!/^\d{5}(?:-\d{4})?$/.test(zip)) {
          throw new Error('Please enter a valid ZIP code');
        }
      
        // ZIP code is valid
        return zip;
      };
      function  addressValidation(storeAddress) {
        if (typeof storeAddress !== "string") {
            throw new Error("Address must be a string.");
        }
        storeAddress = storeAddress.trim();
        if (storeAddress.length === 0) {
            throw new Error("Address cannot be empty.");
        }
        if (/^\d+$/.test(storeAddress)) {
            throw new Error("Address cannot contain only numbers.");
          }
        // Convert the address to title case
        const formattedAddress = storeAddress.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

        // Split the address into words
        const words = formattedAddress.split(" ");

        // Find the index of the first word that contains a digit
        const houseNumberIndex = words.findIndex(word => /\d/.test(word));

        // If no digit was found, the address is invalid
        if (houseNumberIndex === -1) {
            throw new Error("Address must contain a house number.");
        }

        // Join the words back together and return the formatted address
        return words.join(" ");
    };

    function menuValidation(menus) {
        if (menus && (!Array.isArray(menus) || menus.length === 0))
            throw new Error('Menus must be a non-empty array');
        if (
            menus &&
            !menus.every(
                (menu) =>
                    typeof menu.name === 'string' &&
                    typeof menu.price === 'number' &&
                    typeof menu.description === 'string' &&
                    menu.name.trim().length > 0 &&
                    !isNaN(menu.price) &&
                    menu.description.trim().length > 0
                    
            )
        )
            throw new Error(
                'Each menu must have a non-empty name, valid price and a description'
            );
        return menus;
    };
//Register
let registerForm = document.getElementById('registration-form');

let logn_st_frm=document.getElementById('login-form');


if(registerForm){
    
    let firstName = document.getElementById('firstNameInput');
    let lastName = document.getElementById('lastNameInput');
    let email = document.getElementById('emailInput');
    let phoneNumber = document.getElementById('phoneNumberInput');
    let password = document.getElementById('passwordInput');

    let errorContainer = document.getElementById('error-container');
    let age = document.getElementById('ageInput');
    let addressLine1Input = document.getElementById('addressLine1Input');
    let zipCodeInput = document.getElementById('zipCodeInput');
    let weightInput = document.getElementById('weightInput');
    let heightInput = document.getElementById('heightInput');
    let errorTextElement =errorContainer.getElementsByClassName('text-goes-here')[0];

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        try {
          // hide containers by default
          errorContainer.classList.add('hidden');
          
        //   Values come from inputs as strings, no matter what :(
            let firstNamev = firstName.value;
            
            let emailValue = email.value;
            let passwordValue = password.value;
            let phoneNumberv = phoneNumber.value;
            let agev = age.value;
            let addressLine1 = addressLine1Input.value;
            let zipCode = zipCodeInput.value;
            let weight = weightInput.value;
            let height = heightInput.value;
            

          
            firstNamev = stringValidation(firstNamev, "First Name");
            firstName=nameValid(firstName,'First Name');
            lastName = stringValidation(lastName, "Last Name");
            lastName=nameValid(lastName,'Last Name');
            emailAddress = stringValidation(emailAddress, "Email Address");
            emailAddress=emailValidation(emailAddress);
            emailAddress = emailAddress.toLowerCase();
            phoneNumberv=phoneNumberValidation(phoneNumberv);
            password = stringValidation(password, "Password");
            password=passwordValidation(password);
            confirmPassword=confirmPaswordValidation(password,confirmPassword)
            agev=ageValidation(agev);
            addressLine1=stringValidation(addressLine1,'Address line 1');
            zipCode=zipCodeValidation(zipCode);
            weight=weightValidation(weight);
            height=heightValidation(height);
            fitnessLevel=fitnessLevelValidation(fitnessLevel);

        } catch (e) {
        
          const message = typeof e === 'string' ? e : e.message;
          errorTextElement.textContent = e;
          errorContainer.classList.remove('hidden');
        }
      });
    


}

//Login
if(logn_st_frm){
console.log('login')
    let email = document.getElementById('emailInput');
    let password = document.getElementById('passwordInput');
    let errorContainer = document.getElementById('error-container');
    let errorTextElement =
      errorContainer.getElementsByClassName('text-goes-here')[0];

      logn_st_frm.addEventListener('submit', (event) => {
        event.preventDefault();
  
        try {
          // hide containers by default
          errorContainer.classList.add('hidden');


          
          // Values come from inputs as strings, no matter what :(
            let emailValue = email.value;
            let passwordValue = password.value;
             emailValue = stringValidation(emailValue,'email');
             emailValue = emailValidation(emailValue);
            passwordValue = stringValid(passwordValue,'password');
            
            passwordValue = passwordValidation(passwordValue);
            logn_st_frm.submit()
        } catch (e) {
          const message = typeof e === 'string' ? e : e.message;
          errorTextElement.textContent = e;
          errorContainer.classList.remove('hidden');
        }
      });
    


}