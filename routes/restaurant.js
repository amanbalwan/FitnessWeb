//import express, express router as shown in lecture code
import { Router } from "express";
import userData from "../data/user.js";
import validation from "../helpers.js";
import middlewarefun from '../middleware.js';
import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
const restaurantrouter = Router();


restaurantrouter
.route('/')
  .get(async (req, res) => {
    //code here for GET
    res.render("restaurantlogin", { title: "Restaurant Login", header: "Login" });
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
      return res.status(400).render("restaurantlogin", {
        title: "Login",
        header: "Login",
        emailInput:emailAddress,
        passwordInput:password,
        error: e,
      });
    }

    try {
      // let user = await userData.checkUser(req.body.emailInput,req.body.passwordInput);
      // if (user._id) {
      //   req.session.user = {
      //     id:user._id,
      //     firstName: user.firstName,
      //     lastName: user.lastName,
      //     emailAddress: user.emailAddress,
      //     address_line1:user.address_line1,
      //     zipcode:user.zipcode,
      //     phoneNumber:user.phoneNumber,
      //     age:user.age,
      //     height:user.height,
      //     weight:user.weight,
      //     fitnessLevel:user.fitnessLevel,
      //     role:user.role,
      //   };

      //   // console.log(req.session.user,'Fro login')
      //   // res.redirect(`/homepage/${user._id}`);
      //   res.redirect('/');
      // } else {
      //   throw `Either email address or password is invalid`;
      // }
    } catch (e) {
      return res.status(400).render("restaurantlogin", {
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

  restaurantrouter
  .route('/registerRestaurant')
  .get(async (req, res) => {
    
    res.render("restaurantregister", { title: "Restaurant Registration", header: "Restaurant Registration" });
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
        
      return res.status(400).render("restaurantregister", {
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
      return res.status(400).render("restaurantregister", {
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

export default restaurantrouter;