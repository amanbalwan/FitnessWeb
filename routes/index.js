import route from "./user_routes.js";
import homerouter from "./homepage.js"
import restaurantrouter from "./restaurant.js";
import dietitianRouter from './dietitians.js';
import fitnessrouter from "./fitness.js";



const constructorMethod = (app) => {
  app.use("/", route);
  app.use("/landingpage", homerouter);
  app.use("/restaurant", restaurantrouter);
  app.use("/dietitian", dietitianRouter);
  app.use("/fitness", fitnessrouter);
  app.use("*", (req, res) => {
    res.status(404).json("404 : Not found");
  });
};


export default constructorMethod;