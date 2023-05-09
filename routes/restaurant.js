import { Router } from "express";
import { restaurants } from "..//config/mongoCollections.js";
import restaurantsData from "../data/restaurants.js";
import validation from "../helpers.js";
const restaurantsrouter = Router();

// get all restaurants
restaurantsrouter
  .route("/restaurantsLogin")
  .get(async (req, res) => {
    res.render("restaurantsLogin", { title: "Login as Restaurant", header: "Login as Restaurant" });
  })
  .post(async (req, res) => {
    let storeEmail = req.body.storeEmailInput;
    let storePassword = req.body.storePasswordInput;
    try {
      // storeEmail = validation.stringValidation(storeEmail, "Email Address");
      // storeEmail = req.body.storeEmailInput.toLowerCase();
      storeEmail = validation.emailValidation(storeEmail);
      storePassword = validation.passwordValidation(storePassword);
    } catch (e) {
      res.status(400).render("restaurantsLogin", {
        title: "Login as Restaurant",
        header: "Login as Restaurant",
        storeEmailInput: storeEmail,
        storePasswordInput: storePassword,
        error: e,
      });
    }
    try {
      let restaurant_owner = await restaurantsData.checkRestaurant(
        storeEmail,
        storePassword
      );
      // console.log(restaurant_owner);
      restaurant_owner._id = restaurant_owner._id.toString();
      // console.log(restaurant_owner);
      if (restaurant_owner._id) {
        req.session.restaurant_owner2 = {
          storeName: restaurant_owner.storeName,
          storeAddress: restaurant_owner.storeAddress,
          storeZip: restaurant_owner.storeZip,
          storeDescription: restaurant_owner.storeDescription,
          storeMenu: restaurant_owner.storeMenu,
          storeEmail: restaurant_owner.storeEmail,
        };
        res.redirect("/restaurant/restaurantProfile");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (e) {
      return res.status(400).render("restaurantsLogin", {
        title: "Login as Restaurant",
        header: "Login as Restaurant",
        storeEmailInput: req.body.storeEmailInput,
        storePasswordInput: req.body.storePasswordInput,
        error: e,
      });
    }
    // res.status(500).render("error", {
    //     title: "Error 500",
    //     header: "Error 500",
    //     error: "Internal Server Error",
    // });
  });
  restaurantsrouter
  .route("/restaurantsSignup")
  .get(async (req, res) => {
    res.render("restaurantsSignup", { title: "Registration as Restaurant", header: "Registration as Restaurant" });
  })
  .post(async (req, res) => {
    let storeName = req.body.storeNameInput;
    let storeAddress = req.body.storeAddressInput;
    let storeZip = req.body.storeZipInput;
    let storeDescription = req.body.storeDescriptionInput;
    // let storeMenu = req.body.storeMenuInput;
    let storeEmail = req.body.storeEmailInput;
    let storePassword = req.body.storePasswordInput;
    let storeConfirmPassword = req.body.storeConfirmPasswordInput;
    let storeMenu = [];


    for(let i=0;i<req.body.menuItems.name.length;i++) {
      const itemName = req.body.menuItems.name[i];
      const itemPrice = parseFloat(req.body.menuItems.price[i]);
      const itemDescription = req.body.menuItems.description[i];
      let item = {
        name: itemName,
        price: itemPrice,
        description: itemDescription,
    }
    storeMenu.push(item);
  }
    try {
      storeName = validation.nameValid(storeName, "Restaurant Name");
      storeAddress = validation.addressValidation(storeAddress);
      storeZip = validation.zipCodeValidation(storeZip);
      storeDescription = validation.stringValidation(storeDescription, "Restaurant Description");
      storeMenu = validation.menuValidation(storeMenu);
      storeEmail = validation.stringValidation(storeEmail, "Email Address");
      storeEmail = validation.emailValidation(storeEmail);
      storePassword = validation.stringValidation(storePassword);
      storePassword = validation.passwordValidation(storePassword);
      storeConfirmPassword = validation.stringValidation(storeConfirmPassword);
      storeConfirmPassword = validation.confirmPaswordValidation(
        storePassword,
        storeConfirmPassword
      );
    } catch (e) {
      res.status(400).render("restaurantsSignup", {
        title: "Registration as Restaurant",
        header: "Registration as Restaurant",
        storeNameInput: storeName,
        storeAddressInput: storeAddress,
        storeZipInput: storeZip,
        storeDescriptionInput: storeDescription,
        storeMenuInput: storeMenu,
        storeEmailInput: storeEmail,
        storePasswordInput: storePassword,
        storeConfirmPasswordInput: storeConfirmPassword,
        error: e,
      });
    }
    let restaurant_creation = {
      storeName: storeName,
      storeAddress: storeAddress,
      storeZip: storeZip,
      storeDescription: storeDescription,
      storeMenu: storeMenu,
      storeEmail: storeEmail,
      storePassword: storePassword,
      storeConfirmPassword: storeConfirmPassword,
    };
    try {
      let restaurant_owner = await restaurantsData.createRestaurant(restaurant_creation);
      if (restaurant_owner._id) {
        res.redirect("/restaurant/restaurantsLogin");
      }
    } catch (e) {
      return res.status(400).render("restaurantsSignup", {
        title: "Registration as Restaurant",
        header: "Registration as Restaurant",
        storeNameInput: storeName,
        storeAddressInput: storeAddress,
        storeZipInput: storeZip,
        storeDescriptionInput: storeDescription,
        storeMenuInput: storeMenu,
        storeEmailInput: storeEmail,
        storePasswordInput: storePassword,
        error: e,
      });
    }

    // res.status(500).render("error", {
    //   title: "Error 500",
    //   header: "Error 500",
    //   error: "Internal Server Error",
    // });
  });

  restaurantsrouter
  .route("/restaurantProfile")
  .get(async (req, res) => {
    let storeName = req.session.restaurant_owner2.storeName;
    let storeAddress = req.session.restaurant_owner2.storeAddress;
    let storeZip = req.session.restaurant_owner2.storeZip;
    let storeDescription = req.session.restaurant_owner2.storeDescription;
    let storeMenu = req.session.restaurant_owner2.storeMenu;
    let storeEmail = req.session.restaurant_owner2.storeEmail;
    // console.log(req.query.editing);

    if (req.query && req.query.editing) {
      console.log("Editing query is set to", req.query.editing);
    }
    if (req.query && req.query.editing) {
      return res.render("restaurantProfile", {
        title: "Profile",
        header: "Profile",
        storeName: storeName,
        storeAddress: storeAddress,
        storeZip: storeZip,
        storeDescription: storeDescription,
        storeMenu: storeMenu,
        storeEmail: storeEmail,
        editing: true,
      });
    } else {
      return res.render("restaurantProfile", {
        title: "Profile",
        header: "Profile",
        storeName: storeName,
        storeAddress: storeAddress,
        storeZip: storeZip,
        storeDescription: storeDescription,
        storeMenu: storeMenu,
        storeEmail: storeEmail,
        editing: false,
      });
    }
  })
  .post(async (req, res) => {
    let storeName = req.session.restaurant_owner2.storeName;
    let storeAddress = req.session.restaurant_owner2.storeAddress;
    let storeZip = req.session.restaurant_owner2.storeZip;
    let storeDescription = req.session.restaurant_owner2.storeDescription;
    // let storeMenu = req.session.restaurant_owner2.storeMenu;
    let storeEmail = req.session.restaurant_owner2.storeEmail;
    let storeMenu = [];
    console.log("Before Updating", req.session.restaurant_owner2.storeMenu);

    for (let i = 0; i < req.body.storeMenu.length; i += 3) {
      const name = req.body.storeMenu[i];
      const price = parseFloat(req.body.storeMenu[i + 1]);
      const description = req.body.storeMenu[i + 2];
      storeMenu.push({ name, price, description });
    }

    console.log("After Updating", storeMenu);

    try {
      storeName = validation.nameValid(storeName, "Restaurant Name");
      storeAddress = validation.addressValidation(storeAddress);
      storeZip = validation.zipCodeValidation(storeZip);
      storeDescription = validation.stringValidation(
        storeDescription,
        "Restaurant Description"
      );
      storeMenu = validation.menuValidation(storeMenu);

      const restaurants101 = await restaurants();
      const foundRestaurant = await restaurants101.findOne({
        storeEmail: storeEmail,
      });

      const updateDetails = await restaurantsData.updateRestaurant(
        foundRestaurant._id.toString(),
        req.body.storeName,
        req.body.storeAddress,
        req.body.storeZip,
        req.body.storeDescription,
        storeMenu
      );
      // console.log("Updated Restaurant", updateDetails);

      if (updateDetails._id) {
        req.session.restaurant_owner2 = {
          storeName: updateDetails.storeName,
          storeAddress: updateDetails.storeAddress,
          storeZip: updateDetails.storeZip,
          storeDescription: updateDetails.storeDescription,
          storeMenu: updateDetails.storeMenu,
          storeEmail: updateDetails.storeEmail,
        };
        // console.log("Trying to find the error in req.session",req.session.restaurant_owner2);
        return res.render("restaurantProfile", {
          title: "Profile",
          header: "Profile",
          storeName: updateDetails.storeName,
          storeAddress: updateDetails.storeAddress,
          storeZip: updateDetails.storeZip,
          storeDescription: updateDetails.storeDescription,
          storeMenu: updateDetails.storeMenu,
          editing: false,
        });
      }
    } catch (e) {
      res.status(400).render("restaurantProfile", {
        title: "Profile",
        header: "Profile",
        storeName: req.session.restaurant_owner2.storeName,
        storeAddress: req.session.restaurant_owner2.storeAddress,
        storeZip: req.session.restaurant_owner2.storeZip,
        storeDescription: req.session.restaurant_owner2.storeDescription,
        storeMenu: req.session.restaurant_owner2.storeMenu,
        storeEmail: req.session.restaurant_owner2.storeEmail,
        error: e,
      });
    }
    // res.status(500).render("error", {
    //     title: "Error 500",
    //     header: "Error 500",
    //     error: "Internal Server Error",
    // });
  });

  restaurantsrouter.post("/delRestaurant", async (req, res) => {
  let storeName = req.session.restaurant_owner2.storeName;
  let storeAddress = req.session.restaurant_owner2.storeAddress;
  let storeZip = req.session.restaurant_owner2.storeZip;
  let storeDescription = req.session.restaurant_owner2.storeDescription;
  let storeMenu = req.session.restaurant_owner2.storeMenu;
  let storeEmail = req.session.restaurant_owner2.storeEmail;
  try {
    let restaurant = await restaurants();
    let restaurantOwner = await restaurant.findOne({
      storeEmail: storeEmail,
    });

    let deleteRestaurant = await restaurantsData.deleteRestaurantById(
      restaurantOwner._id.toString()
    );
    console.log(deleteRestaurant);
    res.render("deleteRestaurant", {
      title: "Delete Restaurant",
      header: "Delete Restaurant",
      storeName: storeName,
    });
  } catch (e) {
    res.status(400).render("restaurantProfile", {
      title: "Profile",
      header: "Profile",
      storeName: storeName,
      storeAddress: storeAddress,
      storeZip: storeZip,
      storeDescription: storeDescription,
      storeMenu: storeMenu,
      storeEmail: storeEmail,
      error: e,
    });
  }
});
// get all restaurants
restaurantsrouter.get("/restaurants", async (req, res) => {
  try {
    const restaurantList = await restaurantsData.getAllRestaurants();
    return res.render("restaurants", { restaurantList: restaurantList });
  } catch (e) {
    res.status(500).send();
  }
});
// get restaurant by id
restaurantsrouter.get("/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await restaurantsData.getRestaurantById(req.params.id);
    res.render("restaurant", { restaurant: restaurant });
  } catch (e) {
    res.status(404).json({ error: "Restaurant not found" });
  }
});

restaurantsrouter.post("/logout", async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/restaurant/restaurantsLogin");
  } catch (error) {
    console.log(error);
  }
});

restaurantsrouter.route('/logout').get(async(req,res)=>{
  const fitnessdata = await fitness();
  let fitneslist = await fitnessdata.find({}).toArray();
  const dietitiansdata = await dietitians();
  let dietitianslist = await dietitiansdata.find({}).toArray();
  const restaurantdata= await restaurants();
  let restaurantlist = await restaurantdata.find({}).toArray();
  console.log(req.session,'ss');
  req.session.destroy((err) => {
    if (err) {
        console.log(err);
    } else {
        res.clearCookie('AuthCookie');

        console.log(restaurantlist,'s')
        res.render('landingpage',{title:'HomePage',header:'homepage',resdatalist:restaurantlist,dietitianslist:dietitianslist,fitnessatalist:fitneslist})
    }
});
});

export default restaurantsrouter;
