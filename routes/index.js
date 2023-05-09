//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.
import route from "./Fitcen_routes.js";

const constructorMethod = (app) => {
  app.use("/", route);
  app.use("*", (req, res) => {
    res.status(404).json("404 : Not found");
  });
};


export default constructorMethod;