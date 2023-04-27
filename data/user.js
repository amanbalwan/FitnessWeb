//import mongo collections, bcrypt and implement the following data functions
import bcrypt from "bcrypt";
const saltRounds = 15;
import { users } from "../config/mongoCollections.js";
import validation from "../helpers.js";

const exportedMethods = {
  async createUser(firstName, lastName, emailAddress, password, address_line1, address_line2, dob, hieght, weight,) {

    
    firstName = validation.stringValidation(firstName, "First Name");
    lastName = validation.stringValidation(lastName, "Last Name");
    emailAddress = validation.stringValidation(emailAddress, "Email Address");
    emailAddress = emailAddress.toLowerCase();
    password = validation.stringValidation(password, "Password");
    address_line1=validation.stringValidation(address_line1,'Address line 1');
    address_line2=validation.stringValidation(address_line2,'Address line 2');
    dob=validation.dobValidation(dob);
    firstName=validation.nameValid(firstName,'First Name');
    lastName=validation.nameValid(lastName,'Last Name');
    emailAddress=validation.emailValidation(emailAddress);
    password=validation.passwordValidation(password);

    const userCollection = await users();
    const email = await userCollection.findOne({ emailAddress: emailAddress });
    if (email !== null) {
      throw `This Email Address Alredy Exists !`;
    }

    
    let newUser = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      password: await bcrypt.hash(password, saltRounds),
      role: role,
    };

    const insertInfo = await userCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
      throw "Could not add the User";
    }
    return { insertedUser: true };
  },

  async checkUser(emailAddress, password) {
    emailAddress = validation.string(emailAddress, "Email Address");
    emailAddress = emailAddress.toLowerCase();
    password = validation.string(password, "Password");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      throw `Invalid Email Address`;
    }

    if (password.length < 8) {
      throw `Password must be at least 8 characters long`;
    }
    if (!/[A-Z]/.test(password)) {
      throw `Password must contain at least one uppercase character`;
    }
    if (!/\d/.test(password)) {
      throw `Password must contain at least one number`;
    }
    if (!/\W/.test(password)) {
      throw `Password must contain at least one special character`;
    }

    const userCollection = await users();
    const user = await userCollection.findOne({ emailAddress: emailAddress });
    if (user === null) {
      throw `Either the email address or password is invalid`;
    }

    const hashedPassword = await userCollection.findOne(
      { emailAddress: emailAddress },
      { projection: { _id: 0, password: 1 } }
    );

    try {
      if (await bcrypt.compare(password, hashedPassword.password)) {
        return user;
      } else {
        throw `Either the email address or password is invalid`;
      }
    } catch (e) {
      return e;
    }
  },
};
export default exportedMethods;
