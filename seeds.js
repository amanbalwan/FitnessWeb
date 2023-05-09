import { dbConnection, closeConnection } from './config/mongoConnection.js';
// import e from 'express';
import restaurants from "./data/restaurants.js";

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
    console.log("Creating the restautant");
    console.log(res1);
    res1Id = res1._id;
    res1Email = res1.storeEmail;
    res1Hashpwd = res1.storePassword;
} catch (e) {
    console.log(e);
};


try {
    const res1 = await restaurants.createRestaurant(restaurant2);
    console.log("Creating second restautant");
    console.log(res1);
} catch (e) {
    console.log(e);
};

try {
    const res1 = await restaurants.createRestaurant(restaurant3);
    console.log("Creating third restautant");
    console.log(res1);
} catch (e) {
    console.log(e);
};



// try {
//     const updatedRestaurant = await restaurants.updateRestaurant(res1Id, "Healthy Bites", "1234 Main Street", "12345", "Fast Food", [
//         {
//             name: "Grilled Chicken Salad",
//             price: 9.99,
//             description: "Grilled chicken breast served over a bed of mixed greens with tomatoes, cucumbers, and balsamic vinaigrette."
//         },
//         {
//             name: "Veggie Wrap",
//             price: 8.99,
//             description: "A whole wheat wrap filled with mixed greens, roasted red peppers, avocado, hummus, and feta cheese."
//         },
//         {
//             name: "Salmon Quinoa Bowl",
//             price: 12.99,
//             description: "Pan-seared salmon served over a bed of quinoa, mixed greens, roasted sweet potatoes, and a side of lemon-tahini dressing."
//         }
//     ],);
//     console.log("Updating the restaurant");
//     console.log(updatedRestaurant);
// } catch (error) {
//     console.log(error);
// }

// try{
//     const deletedRestaurant = await restaurants.deleteRestaurantById(res1Id);
//     console.log("Deleting the restaurant");
//     console.log(deletedRestaurant);
// } catch(error) {
//     console.log(error);
// }

try {
    console.log("Email", res1Email);
    console.log("Hashed PWD", res1Hashpwd);
    const userCheck = await restaurants.checkRestaurant(res1Email, "Password123$");
    console.log("Getting the restaurant through CheckRestaurant");
    console.log(userCheck);
} catch (error) {
    console.log(error);
}

try {
    const restaurantsList = await restaurants.getAllRestaurants();
    console.log("printing all the restaurants");
    console.log(restaurantsList);
} catch (error) {
    console.log(error);
}

await closeConnection();

