import { dbConnection, closeConnection } from './config/mongoConnection.js';
// import e from 'express';
import restaurants from "./data/restaurants.js";

const db = await dbConnection();
await db.dropDatabase();

let restaurant1 = {
    storeName: "Healthy Bites",
    storeAddress: "1234 Main Street",
    storeZip: "12345",
    storeDescription: "Fast Food",
    storeMenu: [
        {
            name: "Grilled Chicken Salad",
            price: 9.99,
            description: "Grilled chicken breast served over a bed of mixed greens with tomatoes, cucumbers, and balsamic vinaigrette."
        },
        {
            name: "Veggie Wrap",
            price: 8.99,
            description: "A whole wheat wrap filled with mixed greens, roasted red peppers, avocado, hummus, and feta cheese."
        },
        {
            name: "Salmon Quinoa Bowl",
            price: 12.99,
            description: "Pan-seared salmon served over a bed of quinoa, mixed greens, roasted sweet potatoes, and a side of lemon-tahini dressing."
        }
    ],
    storeEmail: "test@example.com",
    storePassword: "Password123$",
    storeConfirmPassword: "Password123$"
};

let restaurant2 = {
    storeName: "Juice Spot",
    storeAddress: "123 Gatling Dr",
    storeZip: "23666",
    storeDescription: "Fresh juices,Oraganic!,Healthy!",
    storeMenu: [
        {
            name: "Orange Juice",
            price: 9.99,
            description: "Grilled chicken breast served over a bed of mixed greens with tomatoes, cucumbers, and balsamic vinaigrette."
        },
        {
            name: "Pineapple Shake",
            price: 8.99,
            description: "A whole wheat wrap filled with mixed greens, roasted red peppers, avocado, hummus, and feta cheese."
        },
    ],
    storeEmail: "best@example.com",
    storePassword: "Password1100$",
    storeConfirmPassword: "Password1100$"
}
let res1Id = null;
let res1Email = null;
let res1Hashpwd = null;
try{
    const res1 = await restaurants.createRestaurant(restaurant1);
    console.log("Creating the restautant");
    console.log(res1);
    res1Id = res1._id;
    res1Email = res1.storeEmail;
    res1Hashpwd = res1.storePassword;
}catch(e){
    console.log(e);
};


try{
    const res1 = await restaurants.createRestaurant(restaurant2);
    console.log("Creating second restautant");
    console.log(res1);
}catch(e){
    console.log(e);
};

try{
    const updatedRestaurant = await restaurants.updateRestaurant(res1Id,"UnHealthu Bites","1234 Main Street","12345","Fast Food",[
        {
            name: "Grilled Chicken Salad",
            price: 9.99,
            description: "Grilled chicken breast served over a bed of mixed greens with tomatoes, cucumbers, and balsamic vinaigrette."
        },
        {
            name: "Veggie Wrap",
            price: 8.99,
            description: "A whole wheat wrap filled with mixed greens, roasted red peppers, avocado, hummus, and feta cheese."
        },
        {
            name: "Salmon Quinoa Bowl",
            price: 12.99,
            description: "Pan-seared salmon served over a bed of quinoa, mixed greens, roasted sweet potatoes, and a side of lemon-tahini dressing."
        }
    ],);
    console.log("Updating the restaurant");
    console.log(updatedRestaurant);
} catch (error) {
    console.log(error);
}

// try{
//     const deletedRestaurant = await restaurants.deleteRestaurantById(res1Id);
//     console.log("Deleting the restaurant");
//     console.log(deletedRestaurant);
// } catch(error) {
//     console.log(error);
// }

try {
    console.log("Email",res1Email);
    console.log("Hashed PWD",res1Hashpwd);
    const userCheck = await restaurants.checkRestaurant(res1Email,"Password123$");
    console.log("Getting the restaurant through CheckRestaurant");
    console.log(userCheck);
} catch(error) {
    console.log(error);
}

try{
    const restaurantsList = await restaurants.getAllRestaurants();
    console.log("printing all the restaurants");
    console.log(restaurantsList);
} catch(error) {
    console.log(error);
}

await closeConnection();

