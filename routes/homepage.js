//import express, express router as shown in lecture code
import { Router } from "express";
import userData from "../data/user.js";
import validation from "../helpers.js";
import middlewarefun from '../middleware.js';
import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
const homerouter = Router();



let restdata=[
    {
      "name": "Bistro 45",
      "description": "Bistro 45 is a cozy French bistro located in the heart of downtown. Our menu features classic French dishes with a modern twist, and our wine list is carefully curated to pair perfectly with each dish.",
      "image": "https://www.example.com/images/bistro45.jpg"
    },
    {
      "name": "Mama Mia's",
      "description": "Mama Mia's is a family-owned Italian restaurant that has been serving up delicious pasta dishes for over 20 years. Our portions are generous, and our sauces are made from scratch using only the freshest ingredients.",
      "image": "https://www.example.com/images/mamamias.jpg"
    },
    {
      "name": "The Redwood Room",
      "description": "The Redwood Room is a stylish cocktail lounge located in a historic hotel. Our menu features classic and creative cocktails, as well as a selection of small plates and snacks.",
      "image": "https://www.example.com/images/redwoodroom.jpg"
    },
    {
      "name": "Sushi Station",
      "description": "Sushi Station is a modern sushi bar that offers a wide variety of fresh sushi rolls and sashimi. Our chefs use only the highest-quality ingredients, and we offer vegan and vegetarian options as well.",
      "image": "https://www.example.com/images/sushistation.jpg"
    },
    {
      "name": "The Greenhouse",
      "description": "The Greenhouse is a plant-based restaurant that specializes in seasonal and locally-sourced ingredients. Our menu changes frequently to reflect the freshest produce available, and we also offer a selection of natural wines and craft beers.",
      "image": "https://www.example.com/images/greenhouse.jpg"
    },
    {
      "name": "The Grill Room",
      "description": "The Grill Room is a classic steakhouse that serves up perfectly cooked steaks, chops, and seafood. Our menu also features a selection of hearty sides and salads, and our extensive wine list includes many classic and rare vintages.",
      "image": "https://www.example.com/images/grillroom.jpg"
    },
    {
      "name": "La Taqueria",
      "description": "La Taqueria is a casual Mexican restaurant that offers a variety of tacos, burritos, and other traditional dishes. Our salsas and guacamole are made fresh daily, and we offer a selection of Mexican beers and tequilas.",
      "image": "https://www.example.com/images/lataqueria.jpg"
    },
    {
      "name": "Café Central",
      "description": "Café Central is a charming coffee shop that serves up artisanal coffee and homemade pastries. Our cozy atmosphere and friendly staff make it the perfect spot to relax and catch up with friends.",
      "image": "https://www.example.com/images/cafecentral.jpg"
    },
    {
      "name": "The Wharf",
      "description": "The Wharf is a waterfront seafood restaurant that offers stunning views of the harbor. Our menu features fresh seafood and classic New England dishes, and we also offer a selection of craft cocktails and beers.",
      "image": "https://www.example.com/images/thewharf.jpg"
    },]  


    let fitnessdata=[
        {
          "name": "FitNation",
          "description": "FitNation is a modern fitness center with state-of-the-art equipment and a wide variety of group classes. Our experienced trainers are here to help you reach your fitness goals, whether you're a beginner or an experienced athlete.",
          "image": "https://www.example.com/images/fitnation.jpg"
        },
        {
          "name": "Iron Works Gym",
          "description": "Iron Works Gym is a hardcore gym for serious lifters. Our gym is equipped with heavy-duty equipment and no frills, just results. Our trainers are experienced lifters who can help you reach your strength training goals.",
          "image": "https://www.example.com/images/ironworks.jpg"
        },
        {
          "name": "Yoga House",
          "description": "Yoga House is a serene yoga studio that offers a variety of yoga classes for all levels. Our experienced teachers will guide you through each pose, helping you find balance and harmony in your practice.",
          "image": "https://www.example.com/images/yogahouse.jpg"
        },
        {
          "name": "CrossFit Central",
          "description": "CrossFit Central is a high-intensity fitness center that focuses on functional movements and varied workouts. Our experienced trainers will push you to your limits and help you achieve your fitness goals.",
          "image": "https://www.example.com/images/crossfitcentral.jpg"
        },
        {
          "name": "Sweat Factory",
          "description": "Sweat Factory is a dynamic fitness center that offers a variety of workouts, from bootcamp to kickboxing to yoga. Our experienced trainers will help you find the perfect workout to meet your fitness goals.",
          "image": "https://www.example.com/images/sweatfactory.jpg"
        },
        {
          "name": "Pilates Place",
          "description": "Pilates Place is a boutique Pilates studio that offers personalized classes for all levels. Our experienced instructors will help you strengthen your core and improve your flexibility and balance.",
          "image": "https://www.example.com/images/pilatesplace.jpg"
        },
        {
          "name": "Cardio Kickboxing Club",
          "description": "Cardio Kickboxing Club is a high-energy fitness center that offers kickboxing and boxing classes for all levels. Our experienced trainers will help you improve your technique and build your endurance.",
          "image": "https://www.example.com/images/cardiokickboxingclub.jpg"
        },
        {
          "name": "Spin Zone",
          "description": "Spin Zone is a boutique spin studio that offers high-intensity cycling classes in a fun and supportive environment. Our experienced instructors will help you push your limits and reach your fitness goals.",
          "image": "https://www.example.com/images/spinzone.jpg"
        },
        {
          "name": "Barre Studio",
          "description": "Barre Studio is a boutique fitness center that offers barre classes for all levels. Our experienced instructors will help you tone and sculpt your muscles using a combination of Pilates, yoga, and ballet-inspired movements.",
          "image": "https://www.example.com/images/barrestudio.jpg"
        },]      

homerouter.route('/').get(async (rqq,res)=>
{
    
  res.render('landingpage',{title:'HomePage',header:'homepage',resdatalist:restdata,fitnessatalist:fitnessdata})
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
    res.render('homepage',{title:'HomePage',header:'homepage',resdatalist:restdata,fitnessatalist:fitnessdata,userData:userdata,bmi:BMI,bmiVal:bmiVal})
});




export default homerouter;