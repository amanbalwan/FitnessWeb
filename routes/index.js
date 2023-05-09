import apiRoute from './restaurantRoutes.js'
const constructorMethod = (app) => {
  app.use("/", apiRoute);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

export default constructorMethod;