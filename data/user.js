//import mongo collections, bcrypt and implement the following data functions
import bcrypt from "bcrypt";
const saltRounds = 15;
import { users } from "../config/mongoCollections.js";
import validation from "../helpers.js";

const exportedMethods = {
  async createUser(firstName, lastName, emailAddress, password, confirmPassword,address_line1, zipcode,age, height, weight,phoneNumber,fitnessLevel) {

    
    firstName = validation.stringValidation(firstName, "First Name");
    firstName=validation.nameValid(firstName,'First Name');
    lastName = validation.stringValidation(lastName, "Last Name");
    lastName=validation.nameValid(lastName,'Last Name');
    emailAddress = validation.stringValidation(emailAddress, "Email Address");
    emailAddress=validation.emailValidation(emailAddress);
    emailAddress = emailAddress.toLowerCase();
    password = validation.stringValidation(password, "Password");
    password=validation.passwordValidation(password);
    confirmPassword=validation.stringValidation(confirmPassword)
    confirmPassword=validation.confirmPaswordValidation(password,confirmPassword)
    address_line1=validation.stringValidation(address_line1,'Address line 1');
    zipcode=validation.zipCodeValidation(zipcode);
    age=validation.ageValidation(age);
    height=validation.heightValidation(height);
    weight=validation.weightValidation(weight);
    phoneNumber=validation.phoneNumberValidation(phoneNumber);
    fitnessLevel=validation.fitnessLevelValidation(fitnessLevel);
    
    
    
    

    const userCollection = await users();
    const email = await userCollection.findOne({ emailAddress: emailAddress });
    
    if (email !== null) {
      throw `This Email Address Alredy Exists !`;
    }
    const phone=await userCollection.findOne({phoneNumber:phoneNumber});
    if(phone!==null){
        throw `This phone number is Alredy Exists!!`
    }

    
    let newUser = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      address_line1:address_line1,
      zipcode:zipcode,
      phoneNumber:phoneNumber,
      age:age,
      height:height,
      weight:weight,
      password: await bcrypt.hash(password, saltRounds),
      fitnessLevel:fitnessLevel,
    };

    const insertInfo = await userCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
      throw "Could not add the User";
    }
    return { insertedUser: true };
  },

  async updateUser(id,address_line1, zipcode,age, height, weight,fitnessLevel){
    
    address_line1=validation.stringValidation(address_line1,'Address line 1');
    zipcode=validation.zipCodeValidation(zipcode);
    age=validation.ageValidation(age);
    height=validation.heightValidation(height);
    weight=validation.weightValidation(weight);
    fitnessLevel=validation.fitnessLevelValidation(fitnessLevel);


    const updatedMember = {


      address_line1:address_line1,
      zipcode:zipcode,
      age:age,
      height:height,
      weight:weight,
      fitnessLevel:fitnessLevel,
    };

    
    const userCollection = await users();

    
    const updatedInfo = await userCollection.findOneAndUpdate(
      { _id: id },
      { $set: updatedMember },
      { returnDocument: 'after' }
    );
    if (updatedInfo.lastErrorObject.n === 0) {
      throw 'could not update member successfully';
    }
    updatedInfo.value._id = updatedInfo.value._id.toString();

    console.log(updatedInfo.value,'Va');
    return updatedInfo.value;
  },

  async checkUser(emailAddress, password) {
    emailAddress = validation.stringValidation(emailAddress, "Email Address");
    emailAddress = emailAddress.toLowerCase();
    emailAddress = validation.emailValidation(emailAddress)
    password = validation.stringValidation(password, "Password");
    password = validation.passwordValidation(password)

    

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

  async removeUser(id){
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0)
      throw 'id cannot be an empty string or just spaces';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    const userCollection = await users();
    const deletionInfo = await userCollection.findOneAndDelete({
      _id: new ObjectId(id)
    });

    if (deletionInfo.lastErrorObject.n === 0) {
      throw `Could not delete dog with id of ${id}`;
    }
    return `${deletionInfo.value.name} has been successfully deleted!`;
  }
};
export default exportedMethods;
