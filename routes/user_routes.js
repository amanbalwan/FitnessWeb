//import express, express router as shown in lecture code
import { Router } from "express";
import userData from "../data/user.js";
import validation from "../helpers.js";
import middlewarefun from '../middleware.js';
const router = Router();


router.route('/').get(middlewarefun.authRedirect,async (req, res) => {
  
    return res.json({ error: "YOU SHOULD NOT BE HERE!" });
  
});


//   .route('/register')
//   .get(middlewarefun.registerRedirect,async (req, res) => {
    
//     res.render("register", { title: "Registration", header: "Registration" });
//   })
//   .post(async (req, res) => {
//     //code here for POST
//     console.log(req.body,'req post')
//     try {
//       req.body.firstNameInput = validation.string(req.body.firstNameInput,"First Name");
//       req.body.lastNameInput = validation.string(req.body.lastNameInput,"Last Name");
//       req.body.emailInput = validation.string(req.body.emailInput,"Email Address");
      
//       console.log(req.body.emailInput,'req.body.emailAddressInput')
//       req.body.passwordInput = validation.string(req.body.passwordInput,"Password");
//       req.body.roleInput = validation.string(req.body.roleInput, "Role");
//       req.body.roleInput = req.body.roleInput.toLowerCase();

//       if (req.body.firstNameInput.length < 2 || req.body.firstNameInput.length > 25)
//         throw `First name should be in length between 2 to 25.`;
//       if ( req.body.lastNameInput.length < 2 || req.body.lastNameInput.length > 25)
//         throw `Last name should be in length between 2 to 25.`;

//       if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.emailInput)) {
//         throw `Invalid Email Address`;
//       }
//       if (req.body.passwordInput.length < 8) {
//         throw `Password must be at least 8 characters long`;
//       }
//       if (!/[A-Z]/.test(req.body.passwordInput)) {
//         throw `Password must contain at least one uppercase character`;
//       }
//       if (!/\d/.test(req.body.passwordInput)) {
//         throw `Password must contain at least one number`;
//       }
//       if (!/\W/.test(req.body.passwordInput)) {
//         throw `Password must contain at least one special character`;
//       }

//       if (req.body.confirmPasswordInput !== req.body.passwordInput) {
//         throw `Confirm Password does not match Password`;
//       }

//       // if (req.body.roleInput !== "admin" || req.body.roleInput !== "user") {
//       //   throw `Invalid role. Only "admin" or "user" allowed.`;
//       // }
//     } catch (e) {
//       return res.status(400).render("register", {
//         title: "Registration",
//         header: "Registration",
//         firstNameInput:req.body.firstNameInput,
//         lastNameInput:req.body.lastNameInput,
//         emailInput:req.body.emailInput,
//         passwordInput:req.body.passwordInput,
//         error: e,

//       });
//     }
    
//     try {
//       let newUser = await userData.createUser(
//         req.body.firstNameInput,
//         req.body.lastNameInput,
//         req.body.emailInput,
//         req.body.passwordInput,
//         req.body.roleInput
//       );
//       if (newUser.insertedUser == true) {
//         res.redirect("/login");
//       }
//     } catch (e) {
//       return res.status(400).render("register", {
//         title: "Registraion",
//         header: "Registration",
//         firstNameInput:req.body.firstNameInput,
//         lastNameInput:req.body.lastNameInput,
//         emailInput:req.body.emailInput,
//         passwordInput:req.body.passwordInput,
//         error: e,
//       });
//     }

//     res.status(500).render("error", {
//       title: "Error 500",
//       header: "Error 500",
//       error: "Internal Server Error",
//     });
//   });

router
  .route('/loginuser')
  .get(async (req, res) => {
    //code here for GET
    res.render("loginuser", { title: "Login", header: "Login" });
  })
  .post(async (req, res) => {
    //code here for POST
    let emailAddress=req.body.emailInput;
    let password=req.body.passwordInput;
    try {
      emailAddress= validation.stringValidation(emailAddress,"Email Address");
      emailAddress = req.body.emailInput.toLowerCase();
      emailAddress=validation.emailValidation(emailAddress);
      password=validation.passwordValidation(password)
      
    } catch (e) {
      return res.status(400).render("loginuser", {
        title: "Login",
        header: "Login",
        emailInput:emailAddress,
        passwordInput:password,
        error: e,
      });
    }

    try {
      let user = await userData.checkUser(req.body.emailInput,req.body.passwordInput);
      if (user._id) {
        req.session.user = {
          firstName: user.firstName,
          lastName: user.lastName,
          emailAddress: user.emailAddress,
          address_line1:user.address_line1,
          zipcode:user.zipcode,
          phoneNumber:user.phoneNumber,
          age:user.age,
          height:user.height,
          weight:user.weight,
          fitnessLevel:user.fitnessLevel,

        };

        // console.log(req.session.user,'Fro login')
        res.redirect("/profileuser");
      } else {
        throw `Either email address or password is invalid`;
      }
    } catch (e) {
      return res.status(400).render("loginuser", {
        title: "Login",
        header: "Login",
        emailInput:req.body.emailInput,
        passwordInput:req.body.passwordInput,
        error: e,
      });
    }

    res.status(500).render("error", {
      title: "Error 500",
      header: "Error 500",
      error: "Internal Server Error",
    });
  });

  router
  .route('/registeruser')
  .get(async (req, res) => {
    
    res.render("registeruser", { title: "Registration", header: "Registration" });
  })
  .post(async (req, res) => {
    //code here for POST

    
    let firstName = req.body.firstNameInput;
    let lastName = req.body.lastNameInput;
    let emailAddress = req.body.emailInput;
    let password = req.body.passwordInput;
    let confirmPassword = req.body.confirmPasswordInput
    let address_line1=req.body.addressLine1Input;
    let zipcode=req.body.zipCodeInput;
    let age=req.body.ageInput;
    let height=req.body.heightInput;
    let weight=req.body.weightInput;
    let phoneNumber=req.body.phoneNumberInput;
    let fitnessLevel=req.body.fitnessLevelInput;
    
    try {



        firstName = validation.stringValidation(firstName, "First Name");
        firstName=validation.nameValid(firstName,'First Name');
        lastName = validation.stringValidation(lastName, "Last Name");
        lastName=validation.nameValid(lastName,'Last Name');
        emailAddress = validation.stringValidation(emailAddress, "Email Address");
        emailAddress=validation.emailValidation(emailAddress);
        emailAddress = emailAddress.toLowerCase();
        phoneNumber=validation.phoneNumberValidation(phoneNumber);
        password = validation.stringValidation(password, "Password");
        password=validation.passwordValidation(password);
        confirmPassword=validation.confirmPaswordValidation(password,confirmPassword)
        age=validation.ageValidation(age);
        address_line1=validation.stringValidation(address_line1,'Address line 1');
        zipcode=validation.zipCodeValidation(zipcode);
        weight=validation.weightValidation(weight);
        height=validation.heightValidation(height);
        fitnessLevel=validation.fitnessLevelValidation(fitnessLevel);

      // if (req.body.roleInput !== "admin" || req.body.roleInput !== "user") {
      //   throw `Invalid role. Only "admin" or "user" allowed.`;
      // }
    } catch (e) {
        
      return res.status(400).render("registeruser", {
        title: "Registration",
        header: "Registration",
        firstNameInput:firstName,
        lastNameInput:lastName,
        emailInput:emailAddress,
        passwordInput:password,
        confirmPasswordInput:confirmPassword,
        addressLine1Input:address_line1,
        ageInput:age,
        weightInput:weight,
        heightInput:height,
        zipCodeInput:zipcode,
        phoneNumberInput:phoneNumber,
        fitnessLevelInput:fitnessLevel,
        error: e,

      });
    }
    
    try {
      let newUser = await userData.createUser(firstName,lastName,emailAddress,password,confirmPassword,address_line1,
        zipcode,age,height,weight,phoneNumber,fitnessLevel)
      if (newUser.insertedUser == true) {
        
        res.redirect("/loginuser");
      }
    } catch (e) {
      return res.status(400).render("registeruser", {
        title: "Registraion",
        header: "Registration",
        firstNameInput:firstName,
        lastNameInput:lastName,
        emailInput:emailAddress,
        passwordInput:password,
        addressLine1Input:address_line1,
        confirmPasswordInput:confirmPassword,
        ageInput:age,
        weightInput:weight,
        heightInput:height,
        zipCodeInput:zipcode,
        phoneNumberInput:phoneNumber,
        fitnessLevelInput:fitnessLevel,
        error: e,
      });
    }

    res.status(500).render("error", {
      title: "Error 500",
      header: "Error 500",
      error: "Internal Server Error",
    });
  });


  router.route('/profileuser').get(async(req,res)=>{

    console.log(req.session.user,'req from profile')
    let firstName = req.session.user.firstName;
    let lastName = req.session.user.lastName;
    let emailAddress = req.session.user.emailAddress;
    let address_line1=req.session.user.address_line1;
    let zipcode=req.session.user.zipcode;
    let age=req.session.user.age;
    let height=req.session.user.height;
    let weight=req.session.user.weight;
    let phoneNumber=req.session.user.phoneNumber;
    let fitnessLevel=req.session.user.fitnessLevel;

    console.log('from session ',firstName,lastName,emailAddress,address_line1,zipcode,age,height)
    res.render("profileuser",{
        title:'Profile Page',
        firstName:firstName,
        lastName:lastName,
        emailAddress:emailAddress,
        phoneNumber:phoneNumber,
        age:age,
        addressLine1:address_line1,
        zipCode:zipcode,
        weight:weight,
        height:height,
        fitnessLevel:fitnessLevel,

    })
  })

// router.route('/protected').get(middlewarefun.protectedRoute, async (req, res) => {
//   console.log(req.session.user,'frompro')
//   // res.json({route: '/protected', method: req.method});
  

//   res.render('protected', {
//     title: "Protected",
//     firstName: req.session.user.firstName,
//     currentTime: new Date(),
//     role: req.session.user.role,
//     showAdminLink: req.session.user.role === 'admin'
//   });
// });

// router.route('/admin').get(middlewarefun.adminRoute,async (req, res) => {
//   //code here for GET
//   res.render('admin', {
//     title: "Admin",
//     firstName: req.session.user.firstName,
//     currentTime: new Date(),
//     role: req.session.user.role,
    
//   });
// });

// router.route('/error').get(async (req, res) => {
//   //code here for GET
//   res.status(500);
// 	// render the error.ejs view with the error message
// 	res.render('error', { errorMessage: 'An error has occurred.' });
// });

// router.route('/logout').get(middlewarefun.logoutRoute,async (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         res.clearCookie('AuthCookie');
//         res.render('logout',{title: "Logout",});
//     }
// });
  
// });


export default router;