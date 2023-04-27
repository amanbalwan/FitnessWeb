import route from "./user_routes.js";

const constructorMethod = (app) => {
  app.use("/", route);
  app.use("*", (req, res) => {
    res.status(404).json("404 : Not found");
  });
};


export default constructorMethod;