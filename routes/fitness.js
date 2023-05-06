//import express, express router as shown in lecture code
import { Router } from "express";
import fitnessData from "../data/fitnessdata.js";
import validation from "../helpers.js";
import middlewarefun from '../middleware.js';
import { fitness,users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
const fitnessrouter = Router();


fitnessrouter
.route('/')
  .get(async (req, res) => {
    //code here for GET

    res.render("fitnesslogin", { title: "Fitness Login", header: "Login" });
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
      return res.status(400).render("fitnesslogin", {
        title: "Fitness Login",
        header: "Login",
        emailInput:emailAddress,
        passwordInput:password,
        error: e,
      });
    }

    try {
        
      let fitnesscenter = await fitnessData.checkFitness(req.body.emailInput,req.body.passwordInput);
      console.log(fitnesscenter,'fit called when login')
      if (fitnesscenter._id) {
        req.session.user = {
          id:fitnesscenter._id,
          fitnesCenterName: fitnesscenter.name,
          emailAddress: fitnesscenter.emailAddress,
          address:fitnesscenter.address,
          zipcode:fitnesscenter.zipcode,
          phoneNumber:fitnesscenter.phoneNumber,
          role:fitnesscenter.role,
          activites:fitnesscenter.activites
        };

        // console.log(req.session.user,'Fro login')
        // res.redirect(`/homepage/${user._id}`);
        
        res.redirect('/');
      } else {
        throw `Either email address or password is invalid`;
      }
    } catch (e) {
      return res.status(400).render("fitnesslogin", {
        title: "Fitness Login",
        header: "Fitness Login",
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

  fitnessrouter
  .route('/fitnessRegister')
  .get(async (req, res) => {
    
    res.render("fitnessregister", { title: "Fitness Registration", header: "Fitness Registration" });
  })
  .post(async (req, res) => {
    //code here for POST


    
    let fitnesCenterName = req.body.fitnesCenterName;
    let emailAddress = req.body.emailAddress;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword
    let address=req.body.address;
    let zipcode=req.body.zipcode;
    let phoneNumber=req.body.phoneNumber;
    let activites=req.body.activites;
    
    try {

        fitnesCenterName = validation.stringValidation(fitnesCenterName, " Name");
        fitnesCenterName=validation.nameValid(fitnesCenterName,'Name');
        emailAddress = validation.stringValidation(emailAddress, "Email Address");
        emailAddress=validation.emailValidation(emailAddress);
        emailAddress = emailAddress.toLowerCase();
        password = validation.stringValidation(password, "Password");
        password=validation.passwordValidation(password);
        confirmPassword=validation.confirmPaswordValidation(password,confirmPassword)
        phoneNumber=validation.phoneNumberValidation(phoneNumber);
        address=validation.stringValidation(address,'Address');
        zipcode=validation.zipCodeValidation(zipcode);
        activites=validation.stringValidation(activites,'activites');

      // if (req.body.roleInput !== "admin" || req.body.roleInput !== "user") {
      //   throw `Invalid role. Only "admin" or "user" allowed.`;
      // }
    } catch (e) {
        
      return res.status(400).render("fitnessregister", {
        title: "Fitness Registration",
        header: "Fitness Registration",
        fitnesCenterName:fitnesCenterName,
        emailAddress:emailAddress,
        password:password,
        confirmPassword:confirmPassword,
        address:address,
        zipcode:zipcode,
        phoneNumber:phoneNumber,
        activites:activites,
        error: e,
      });
    }
    
    try {
        
      let newUser = await fitnessData.createFitness(fitnesCenterName,emailAddress,password,confirmPassword,address,zipcode,phoneNumber,activites)
      if (newUser.insertedUser == true) {
        
        res.redirect("/");
      }
    } catch (e) {
        return res.status(400).render("fitnessregister", {
            title: "Fitness Registration",
            header: "Fitness Registration",
            fitnesCenterName:fitnesCenterName,
            emailAddress:emailAddress,
            password:password,
            confirmPassword:confirmPassword,
            address:address,
            zipcode:zipcode,
            phoneNumber:phoneNumber,
            activites:activites,
            error: e,
          });
    }

    res.status(500).render("error", {
      title: "Error 500",
      header: "Error 500",
      error: "Internal Server Error",
    });
  });

  fitnessrouter.route('/fitnessprofile').get(async (req,res)=>{

    let fitnesCenterName=req.session.user.fitnesCenterName;
    let emailAddress=req.session.user.emailAddress;
    let address=req.session.user.address;
    let zipcode=req.session.user.zipcode;
    let phoneNumber=req.session.user.phoneNumber;
    let activites=req.session.user.activites;

    
    res.render('fitnessprofile',{
        title:'Fitness Profile ',
        fitnesCenterName:fitnesCenterName,
        emailAddress:emailAddress,
        address:address,
        phoneNumber:phoneNumber,
        zipcode:zipcode,
        activites:activites
    })
  });

  

  fitnessrouter.route('/fitnesseditprofile').get(async(req,res)=>{
    let fitnesCenterName=req.session.user.fitnesCenterName;
    let emailAddress=req.session.user.emailAddress;
    let address=req.session.user.address;
    let zipcode=req.session.user.zipcode;
    let phoneNumber=req.session.user.phoneNumber;
    let activites=req.session.user.activites;

    console.log(fitnesCenterName,emailAddress,activites,'get')
    res.render('fitnesseditprofile',{
        title:'Fitness Profile ',
        fitnesCenterName:fitnesCenterName,
        emailAddress:emailAddress,
        address:address,
        phoneNumber:phoneNumber,
        zipcode:zipcode,
        activites:activites
    })
  })
  .post(async(req,res)=>{
    let fitnesCenterName=req.session.user.fitnesCenterName;
    let emailAddress=req.session.user.emailAddress;
    let address=req.body.address;
    let zipcode=req.body.zipcode;
    let phoneNumber=req.session.user.phoneNumber;
    let activites=req.body.activites;
    console.log(fitnesCenterName,emailAddress,activites,'post')
    try {

        
        address=validation.stringValidation(address,'Address');
        zipcode=validation.zipCodeValidation(zipcode);
        activites=validation.stringValidation(activites,'activites');

      // if (req.body.roleInput !== "admin" || req.body.roleInput !== "user") {
      //   throw `Invalid role. Only "admin" or "user" allowed.`;
      // }
    } catch (e) {
        
      return res.status(400).render("fitnesseditprofile", {
        title: "Fitness Profile",
        header: "Fitness Registration",
        fitnesCenterName:fitnesCenterName,
        emailAddress:emailAddress,
        
        address:address,
        zipcode:zipcode,
        phoneNumber:phoneNumber,
        activites:activites,
        error: e,
      });
    }
    try {
        console.log('edit')
        const fitnessCollection = await fitness();
        const email = await fitnessCollection.findOne({ emailAddress: emailAddress });
        console.log(email,'edit')
        let updatefitnessUser = await fitnessData.updateFitness(email._id,fitnesCenterName,address,zipcode,activites)
        console.log('Pranav ',updatefitnessUser);
          

          if(updatefitnessUser._id){
            req.session.user = {
                id:updatefitnessUser._id,
                fitnesCenterName: updatefitnessUser.name,
                emailAddress: updatefitnessUser.emailAddress,
                address:updatefitnessUser.address,
                zipcode:updatefitnessUser.zipcode,
                phoneNumber:updatefitnessUser.phoneNumber,
                role:updatefitnessUser.role,
                activites:updatefitnessUser.activites
              };
          }
          console.log('aas')
          res.render('fitnessprofile',{
            title:'Fitness Profile ',
            fitnesCenterName:fitnesCenterName,
            emailAddress:emailAddress,
            address:address,
            phoneNumber:phoneNumber,
            zipcode:zipcode,
            activites:activites
        });
      } catch (e) {
          return res.status(400).render("fitnesseditprofile", {
              title: "Fitness Edit Profile",
              header: "Fitness Edit Profile",
              fitnesCenterName:fitnesCenterName,
              emailAddress:emailAddress,
              
              address:address,
              zipcode:zipcode,
              phoneNumber:phoneNumber,
              activites:activites,
              error: e,
            });
      }
  });

  

export default fitnessrouter;