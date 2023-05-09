import { Router } from "express";
import FitcenData from "../data/Fitcen.js";
import validation from "../helpers.js";
import middlewarefun from '../middleware.js';
import { Fitcens } from "../config/mongoCollections.js";
const router = Router();


router.route('/').get(middlewarefun.authRedirect,async (req, res) => {
  
    return res.json({ error: "YOU SHOULD NOT BE HERE!" });
  
});

router
  .route('/loginFitcen')
  .get(async (req, res) => {
    //code here for GET
    res.render("loginFitcen", { title: "Login", header: "Login" });
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
      return res.status(400).render("loginFitcen", {
        title: "Login",
        header: "Login",
        emailInput:emailAddress,
        passwordInput:password,
        error: e,
      });
    }

    try {
      let Fitcen = await FitcenData.checkFitcen(req.body.emailInput,req.body.passwordInput);
      if (Fitcen._id) {
         req.session.Fitcen = {
          Name: Fitcen.Name,
          emailAddress: Fitcen.emailAddress,
          address_line1:Fitcen.address_line1,
          zipcode:Fitcen.zipcode,
          phoneNumber:Fitcen.phoneNumber,
          rating:Fitcen.rating,
          activities:Fitcen.activities,

        };

        // console.log(req.session.Fitcen,'Fro login')
        res.redirect("/profileFitcen");
      } else {
        throw `Either email address or password is invalid`;
      }
    } catch (e) {
      return res.status(400).render("loginFitcen", {
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
  .route('/registerFitcen')
  .get(async (req, res) => {
    
    res.render("registerFitcen", { title: "Registration", header: "Registration" });
  })
  .post(async (req, res) => {
    //code here for POST

    
    let Name = req.body.NameInput;
    let emailAddress = req.body.emailInput;
    let password = req.body.passwordInput;
    let confirmPassword = req.body.confirmPasswordInput
    let address_line1=req.body.addressLine1Input;
    let zipcode=req.body.zipCodeInput;
    let phoneNumber=req.body.phoneNumberInput;
    let rating= req.body.ratingInput;
    let activities=req.body.activitiesInput;
    console.log(Name,emailAddress,password,confirmPassword,address_line1,zipcode,phoneNumber,rating,activities);
    try {



        Name = validation.stringValidation(Name, "Name");
        Name = validation.nameValid(Name, "Name");

        emailAddress = validation.stringValidation(emailAddress, "Email Address");
        emailAddress=validation.emailValidation(emailAddress);
        emailAddress = emailAddress.toLowerCase();

        phoneNumber=validation.phoneNumberValidation(phoneNumber);

        password = validation.stringValidation(password, "Password");
        password=validation.passwordValidation(password);
        //confirm pass string check
        confirmPassword=validation.confirmPaswordValidation(password,confirmPassword);
        
        rating=validation.ratingValidation(rating,"rating")
        address_line1=validation.stringValidation(address_line1,'Address line 1');
        zipcode=validation.zipCodeValidation(zipcode);
        //activities=validation.stringValidation(activities,"activities")
        
       

    } catch (e) {
        
      return res.status(400).render("registerFitcen", {
        title: "Registration",
        header: "Registration",
        NameInput:Name,
        
        emailInput:emailAddress,
        passwordInput:password,
        confirmPasswordInput:confirmPassword,
        addressLine1Input:address_line1,
        
        zipCodeInput:zipcode,
        phoneNumberInput:phoneNumber,
        ratingInput:rating,
      
        activitiesInput:activities,
        error: e,

      });
    }
    console.log(Name,emailAddress,password,confirmPassword,address_line1,zipcode,phoneNumber,rating,activities);
    
    try {
      let newFitcen = await FitcenData.createFitcen(Name,emailAddress,password,confirmPassword,address_line1,
        zipcode,phoneNumber,rating,activities)
        
      if (newFitcen.insertedFitcen == true) {
        
        res.redirect("/loginFitcen");
      }
    } catch (e) {
      return res.status(400).render("registerFitcen", {
        title: "Registraion",
        header: "Registration",
        NameInput:Name,
    
        emailInput:emailAddress,
        passwordInput:password,
        addressLine1Input:address_line1,
        confirmPasswordInput:confirmPassword,
        
        zipCodeInput:zipcode,
        phoneNumberInput:phoneNumber,

        ratingInput:rating,
        activitiesInput:activities,
        error: e,
      });
    }

    res.status(500).render("error", {
      title: "Error 500",
      header: "Error 500",
      error: "Internal Server Error",
    });
  });



  router.route('/profileFitcen').get(async(req,res)=>{

    
    let Name = req.session.Fitcen.Name;
    let emailAddress = req.session.Fitcen.emailAddress;
    let address_line1=req.session.Fitcen.address_line1;
    let zipcode=req.session.Fitcen.zipcode;
    let phoneNumber=req.session.Fitcen.phoneNumber;
    let rating=req.session.Fitcen.rating;
    let activities=req.session.Fitcen.activities;
    
    
    res.render("profileFitcen",{
        title:'Profile Page',
        Name: Name,
        
        emailAddress:emailAddress,
        phoneNumber:phoneNumber,
        
        addressLine1:address_line1,
        zipCode:zipcode,
        rating:rating,
        activities:activities,
        editing:true

    })
  });
  router.route('/editprofileFitcen').get(async(req,res)=>{

    
    let Name = req.session.Fitcen.Name;
    
    let emailAddress = req.session.Fitcen.emailAddress;
    let address_line1=req.session.Fitcen.address_line1;
    let zipcode=req.session.Fitcen.zipcode;
    
    let phoneNumber=req.session.Fitcen.phoneNumber;
    let activities=req.session.Fitcen.activities;
    
    
     return res.render("editprofileFitcen",{
        title:'Edit Page',
        Name:Name,
        
        emailAddress:emailAddress,
        phoneNumber:phoneNumber,
    
        addressLine1:address_line1,
        zipCode:zipcode,
       
        activities:activities,
        editing:true

    })
  })
  .post(async(req,res)=>{
    let Name = req.session.Fitcen.Name;
    
    let emailAddress = req.session.Fitcen.emailAddress;
    let address_line1=req.body.addressLine1Input;
    let zipcode=req.body.zipCodeInput;
    
    let phoneNumber=req.session.Fitcen.phoneNumber;

    //let rating= req.session.Fitcen.rating

    let activities=req.body.activities;

    
    try {

    
      
      address_line1=validation.stringValidation(address_line1,'Address line 1');
      zipcode=validation.zipCodeValidation(zipcode);
      
    
      activities=validation.stringValidation(activities,'activities');

      
      const FitcenCollection = await Fitcens();
      const email = await FitcenCollection.findOne({ emailAddress: emailAddress });
      

      const updateFitcen= await FitcenData.updateFitcen(email._id,address_line1,zipcode,activities)

      console.log(updateFitcen,'Update');

      if (updateFitcen._id) {
        req.session.Fitcen = {
          Name: updateFitcen.Name,
          emailAddress: updateFitcen.emailAddress,
          address_line1:updateFitcen.address_line1,
          zipcode:updateFitcen.zipcode,
          phoneNumber:updateFitcen.phoneNumber,
          activities:updateFitcen.activities,

        };

      res.render("profileFitcen",{
        title:'Edit Page',
        Name:Name,
        
        emailAddress:emailAddress,
        phoneNumber:phoneNumber,
        
        addressLine1:address_line1,
        zipCode:zipcode,
        
        activities:activities,
        editing:false
        

    })
  }

    // if (req.body.roleInput !== "admin" || req.body.roleInput !== "Fitcen") {
    //   throw `Invalid role. Only "admin" or "Fitcen" allowed.`;
    // }
  } catch (e) {
      
    return res.status(400).render("profileFitcen", {
      title:'Profile Page',
      Name:Name,
      
      emailAddress:emailAddress,
      phoneNumber:phoneNumber,
      
      addressLine1:address_line1,
      zipCode:zipcode,
   
      activities:activities,
      error: e,

    });
  }
  
  

  res.status(500).render("error", {
    title: "Error 500",
    header: "Error 500",
    error: "Internal Server Error",
  });
  })
  .delete(async(req,res)=>{
    let Name = req.session.Fitcen.Name;
    
    let emailAddress = req.session.Fitcen.emailAddress;
    let address_line1=req.session.Fitcen.address_line1;
    let zipcode=req.session.Fitcen.zipcode;
    
    let phoneNumber=req.session.Fitcen.phoneNumber;


    let activities=req.session.Fitcen.activities;
    try{

      let FitcenCollection = await Fitcens();
      let Fitcen= await FitcenCollection.findOne({emailAddress:emailAddress});

      let deletFitcen= await FitcenData.removeFitcen(Fitcen._id);
      res.render('deleteFitcen',{title:"Delete Succesfully"})
    }
    catch (e) {
      
      return res.status(400).render("profileFitcen", {
        title:'Profile Page',
        Name:Name,
        
        emailAddress:emailAddress,
        phoneNumber:phoneNumber,
        
        addressLine1:address_line1,
        zipCode:zipcode,
        
        activities:activities,
        error: e,
  
      });
    }
  })
;
export default router;