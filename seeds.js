import { dbConnection, closeConnection } from './config/mongoConnection.js';
// import e from 'express';
import restaurants from "./data/restaurants.js";
import fitnessData from "./data/fitnessdata.js";
import dietitianData from "./data/dietitians.js";


const db = await dbConnection();
// await db.dropDatabase();

let restaurant1 = {
    storeName: "Fit Kitchen",
    storeAddress: "5678 Elm Street",
    storeZip: "67890",
    storeDescription: "Healthy Fast Food",
    storeMenu: [
        {
            name: "Grilled Chicken Sandwich",
            price: 8.99,
            description: "Grilled chicken breast served on a whole wheat bun with lettuce, tomato, and avocado mayo."
        },
        {
            name: "Sweet Potato Fries",
            price: 3.99,
            description: "Crispy sweet potato fries seasoned with sea salt and served with a side of spicy ketchup."
        },
        {
            name: "Turkey and Avocado Wrap",
            price: 9.99,
            description: "Sliced turkey breast, avocado, lettuce, and tomato wrapped in a whole wheat tortilla with a side of honey mustard."
        }
    ],
    storeEmail: "fitkitchen@example.com",
    storePassword: "Password123$",
    storeConfirmPassword: "Password123$"
};

let restaurant2 = {
    storeName: "Green Leaf Cafe",
    storeAddress: "1111 Oak Street",
    storeZip: "54321",
    storeDescription: "Vegetarian and Vegan",
    storeMenu: [
        {
            name: "Quinoa Salad",
            price: 10.99,
            description: "A mix of quinoa, roasted veggies, avocado, and a cilantro-lime dressing."
        },
        {
            name: "Tofu Stir Fry",
            price: 12.99,
            description: "Pan-fried tofu, mixed veggies, and brown rice with a ginger-soy sauce."
        },
        {
            name: "Vegan BLT Sandwich",
            price: 9.99,
            description: "Tempeh bacon, lettuce, tomato, and avocado mayo served on whole wheat bread."
        }
    ],
    storeEmail: "greenleaf@example.com",
    storePassword: "Password123$",
    storeConfirmPassword: "Password123$"
};

let restaurant3 = {
    storeName: "Fresh Bites",
    storeAddress: "2222 Maple Street",
    storeZip: "87654",
    storeDescription: "Farm-to-Table Cuisine",
    storeMenu: [
    {
    name: "Beet and Goat Cheese Salad",
    price: 11.99,
    description: "Mixed greens, roasted beets, goat cheese, and candied pecans with a balsamic vinaigrette."
    },
    {
    name: "Roasted Chicken with Brussels Sprouts",
    price: 14.99,
    description: "Roasted chicken breast with crispy Brussels sprouts, sweet potato mash, and a side of cranberry sauce."
    },
    {
    name: "Grilled Veggie Panini",
    price: 10.99,
    description: "Grilled eggplant, zucchini, red peppers, and mozzarella cheese on a ciabatta roll with a side of tomato soup."
    }
    ],
    storeEmail: "freshbites@example.com",
    storePassword: "Password123$",
    storeConfirmPassword: "Password123$"
    };

// create helthy restaurant data
let res1Id = null;
let res1Email = null;
let res1Hashpwd = null;
try {
    const res1 = await restaurants.createRestaurant(restaurant1);
} catch (e) {
    console.log(e);
};


try {
    const res1 = await restaurants.createRestaurant(restaurant2);
    console.log(res1);
} catch (e) {
    console.log(e);
};

try {
    const res1 = await restaurants.createRestaurant(restaurant3);
    
} catch (e) {
    console.log(e);
};

try{
    const fit1=await fitnessData.createFitness('Fit Cneter','zxc@gmail.com','Pass123@','Pass123@','20 Becan Av','07306','9999988888','Running');

}catch (e){
    console.log(e)
}
try{
    const fit2=await fitnessData.createFitness('New York Cneter','zzzxc@gmail.com','Pass123@','Pass123@','99 Becan Av','07302','8887776665','Jumping');

}catch (e){
    console.log(e)
}
try{
    const fit3=await fitnessData.createFitness('Jersey FitCneter','xxxxc@gmail.com','Pass123@','Pass123@','121 pal Av','07306','1112223334','Running');

}catch (e){
    console.log(e)
}

try{
    let firstName = 'Abc';
    let lastName = "Xyz";
    let emailAddress = "abccc@gmail.com";
    let password = "Pass123@";
    let confirmPassword = 'Pass123@';
    let address = "321 Oak St";
    let zipcode = "67890";
    let city = "Suburbia";
    let state = "NJ";
    let description = "Experienced fitness in HIIT training";
    let phoneNumber = "5554443322";
    let fees = "200";

    let newDietitian = await dietitianData.createDietitian({
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword,
        address,
        zipcode,
        city,
        state,
        description,
        phoneNumber,
        fees,
      });
}catch (e){
    console.log(e)
}
try{
    let firstName = 'Abc';
    let lastName = "Xyz";
    let emailAddress = "pqqqqq@gmail.com";
    let password = "Pass123@";
    let confirmPassword = 'Pass123@';
    let address = "22 Court St";
    let zipcode = "12345";
    let city = "Suburbia";
    let state = "PA";
    let description = "Experienced fitness in HIIT training";
    let phoneNumber = "1212121212";
    let fees = "200";

    let newDietitian = await dietitianData.createDietitian({
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword,
        address,
        zipcode,
        city,
        state,
        description,
        phoneNumber,
        fees,
      });
}catch (e){
    console.log(e)
} 
try{
    let firstName = 'Pqr';
    let lastName = "dfad";
    let emailAddress = "zzbccc@gmail.com";
    let password = "Pass123@";
    let confirmPassword = 'Pass123@';
    let address = "21 Oak St";
    let zipcode = "07306";
    let city = "Jersey";
    let state = "NY";
    let description = "Experienced fitness in MIT training";
    let phoneNumber = "5545443322";
    let fees = "123";

    let newDietitian = await dietitianData.createDietitian({
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword,
        address,
        zipcode,
        city,
        state,
        description,
        phoneNumber,
        fees,
      });
}catch (e){
    console.log(e)
}


await closeConnection();

