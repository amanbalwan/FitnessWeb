import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
const saltRounds = 15;
import { dietitians } from "../config/mongoCollections.js";
import validation from "../helpers.js";

const exportedMethods = {
  createDietitian: async ({
    firstName,
    lastName,
    emailAddress,
    password,
    confirmPassword,
    address,
    zipcode,
    phoneNumber,
    city,
    state,
    fees,
    description,
  }) => {
    if (
      !firstName ||
      !lastName ||
      !emailAddress ||
      !password ||
      !confirmPassword ||
      !address ||
      !zipcode ||
      !phoneNumber ||
      !city ||
      !state ||
      !description ||
      !fees
    )
      throw "All Fields need to have valid values";

    firstName = validation.stringValidation(firstName, "First Name");
    firstName = validation.nameValid(firstName, "First Name");
    lastName = validation.stringValidation(lastName, "Last Name");
    lastName = validation.nameValid(lastName, "Last Name");
    emailAddress = validation.stringValidation(emailAddress, "Email Address");
    emailAddress = validation.emailValidation(emailAddress);
    emailAddress = emailAddress.toLowerCase();
    password = validation.stringValidation(password, "Password");
    password = validation.passwordValidation(password);
    confirmPassword = validation.stringValidation(confirmPassword);
    confirmPassword = validation.confirmPaswordValidation(
      password,
      confirmPassword
    );
    address = validation.stringValidation(address, "Address");
    zipcode = validation.zipCodeValidation(zipcode);
    phoneNumber = validation.phoneNumberValidation(phoneNumber);
    description = validation.stringValidation(description, "Description");
    state = validation.stringValidation(state, "State");
    city = validation.stringValidation(city, "City");
    fees = validation.checkNumber(fees, "Fees");

    const newDietitian = {
      firstName,
      lastName,
      emailAddress,
      password:await bcrypt.hash(password, saltRounds),
      address,
      zipcode,
      phoneNumber,
      city,
      state,
      fees,
      description,
      role: "Dietitian",
      rating: 0,
      verified: false,
    };

    const dietitianCollection = await dietitians();
    const email = await dietitianCollection.findOne({
      emailAddress: emailAddress,
    });
    if (email) throw `This Email Address Alredy Exists !`;
    const phone = await dietitianCollection.findOne({
      phoneNumber: phoneNumber,
    });
    if (phone) throw `This phone number is Alredy Exists!!`;
    const insertInfo = await dietitianCollection.insertOne(newDietitian);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw "Could not add Dietitian";

    return true;
  },

  updateDietitian: async ({
    id,
    address,
    zipcode,
    phoneNumber,
    city,
    state,
    fees,
    description,
  }) => {
    if (
      !id ||
      !address ||
      !zipcode ||
      !phoneNumber ||
      !city ||
      !state ||
      !description ||
      !fees
    )
      throw "All Fields need to have valid values";

    id = validation.idValidation(id, "Id");
    address = validation.stringValidation(address, "Address");
    zipcode = validation.zipCodeValidation(zipcode);
    phoneNumber = validation.phoneNumberValidation(phoneNumber);
    state = validation.stringValidation(state, "State");
    city = validation.stringValidation(city, "City");
    fees = validation.checkNumber(fees, "Fees");

    const updateDietitian = {
      address,
      zipcode,
      phoneNumber,
      city,
      state,
      fees,
      description,
    };

    const dietitianCollection = await dietitians();
    const phone = await dietitianCollection.findOne({
      phoneNumber: phoneNumber,
    });
    if (phone && phone._id.toString() !== id) throw `This phone number is Alredy Exists!!`;
    const updatedInfo = await dietitianCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateDietitian },
      { returnDocument: "after" }
    );


    if (updatedInfo.lastErrorObject.n === 0) {
      throw "could not update dietitian successfully";
    }

    return updatedInfo.value;
  },

  checkDietitian: async (emailAddress, password) => {
    emailAddress = validation.stringValidation(emailAddress, "Email Address");
    emailAddress = emailAddress.toLowerCase();
    emailAddress = validation.emailValidation(emailAddress);
    password = validation.stringValidation(password, "Password");
    password = validation.passwordValidation(password);

    const dietitianCollection = await dietitians();
    const dietitian = await dietitianCollection.findOne({
      emailAddress: emailAddress,
    });
    if (dietitian === null) {
      throw `Either the email address or password is invalid`;
    }

    const hashedPassword = await dietitianCollection.findOne(
      { emailAddress: emailAddress },
      { projection: { _id: 0, password: 1 } }
    );

    try {
      if (await bcrypt.compare(password, hashedPassword.password)) {
        return dietitian;
      } else {
        throw `Either the email address or password is invalid`;
      }
    } catch (e) {
      return e;
    }
  },

  removeDietitian: async (id) => {
    id = validation.idValidation(id, "ID");
    const dietitianCollection = await dietitians();
    const deletionInfo = await dietitianCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });

    if (deletionInfo.lastErrorObject.n === 0) {
      throw `Could not delete dietitian with id of ${id}`;
    }
    return  true;
  },

  getAllDietitians: async () => {
    const dietitianCollection = await dietitians();
    const dietitianList = await dietitianCollection.find({}).toArray();

    if (!dietitianList) throw "Could not get all Dietitians";
    const allDietitians = dietitianList.map((dietitian) => ({
      ...dietitian,
      _id: dietitian._id.toString(),
    }));
    return allDietitians;
  },

  getDietitianById: async (id) => {
    id = validation.idValidation(id, "Id");

    const dietitianCollection = await dietitians();
    const dietitian = await dietitianCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!dietitian) throw `No dietitian found with id ${id}`;

    dietitian._id = dietitian._id.toString();

    return dietitian;
  },
};

export default exportedMethods;
