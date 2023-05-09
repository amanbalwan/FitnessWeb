//import express, express router as shown in lecture code
import { Router } from "express";
import userData from "../data/user.js";
import validation from "../helpers.js";
import middlewarefun from '../middleware.js';
import { users,fitness,dietitians,restaurants } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
const homerouter = Router();




homerouter.route('/').get(async (rqq,res)=>
{
    const fitnessdata = await fitness();
    let fitneslist = await fitnessdata.find({}).toArray();
    const dietitiansdata = await dietitians();
    let dietitianslist = await dietitiansdata.find({}).toArray();
    const restaurantdata= await restaurants();
    let restaurantlist = await restaurantdata.find({}).toArray();
    console.log(restaurantlist,'s')
  res.render('landingpage',{title:'HomePage',header:'homepage',resdatalist:restaurantlist,dietitianslist:dietitianslist,fitnessatalist:fitneslist})
});

homerouter.route('/homepage/:id').get(async(req,res)=>{

    let userCollection=await users();
    
    const userdata=await userCollection.findOne({_id:new ObjectId(req.session.user.id)});
    console.log(userdata.weight,userdata.height)
    let BMI = ((userdata.weight/2.205) / ((userdata.height/100 ) * (userdata.height/100 ))) ;
    BMI=BMI.toFixed(2)
    let bmiVal='';
    if (BMI < 18.5) {
        bmiVal= "You are underweight.";
      } else if (BMI < 25) {
        bmiVal= "You are within the normal weight range.";
      } else if (BMI < 30) {
        bmiVal= "You are overweight.";
      } else {
        bmiVal= "You are obese.";
      }
      const fitnessdata = await fitness();
    let fitneslist = await fitnessdata.find({}).toArray();
    const dietitiansdata = await dietitians();
    let dietitianslist = await dietitiansdata.find({}).toArray();
    const restaurantdata= await restaurants();
    let restaurantlist = await restaurantdata.find({}).toArray();
    res.render('homepage',{title:'HomePage',header:'homepage',resdatalist:restaurantlist,dietitianslist:dietitianslist,fitnessatalist:fitneslist,userData:userdata,bmi:BMI,bmiVal:bmiVal})
});




export default homerouter;