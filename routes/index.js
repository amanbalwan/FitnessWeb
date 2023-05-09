import route from "./user_routes.js";
import homerouter from "./homepage.js"
import restaurantsrouter from "./restaurant.js";
import fitnessrouter from "./fitness.js";
import dietitianrouter from "./dietitian.js";



const constructorMethod = (app) => {
  app.use("/", route);
  app.use("/landingpage", homerouter);
  app.use("/restaurant", restaurantsrouter);
  app.use("/fitness", fitnessrouter);
  app.use("/dietitian", dietitianrouter);
  app.use("*", (req, res) => {
    res.status(404).json("404 : Not found");
  });
};


export default constructorMethod;