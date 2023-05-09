//import mongo collections, bcrypt and implement the following data functions
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
const saltRounds = 15;
import { fitness } from "../config/mongoCollections.js";
import validation from "../helpers.js";


const exportedMethods = {
  async createFitness(name, emailAddress, password, confirmPassword,address, zipcode,phoneNumber,activites,description) {

    
    name = validation.stringValidation(name, "First Name");
    emailAddress = validation.stringValidation(emailAddress, "Email Address");
    emailAddress=validation.emailValidation(emailAddress);
    emailAddress = emailAddress.toLowerCase();
    password = validation.stringValidation(password, "Password");
    password=validation.passwordValidation(password);
    confirmPassword=validation.stringValidation(confirmPassword)
    confirmPassword=validation.confirmPaswordValidation(password,confirmPassword)
    address=validation.stringValidation(address,'Address line 1');
    zipcode=validation.zipCodeValidation(zipcode);
    phoneNumber=validation.phoneNumberValidation(phoneNumber);
    activites=validation.stringValidation(activites);
    // description=validation.stringValidation(description);
    
    
    
    

    const fitnessCollection = await fitness();
    const email = await fitnessCollection.findOne({ emailAddress: emailAddress });
    
    if (email !== null) {
      throw `This Email Address Alredy Exists for fitness center!`;
    }
    const phone=await fitnessCollection.findOne({phoneNumber:phoneNumber});
    if(phone!==null){
        throw `This phone number is Alredy Exists for fitness center!!`
    }

    const fname=await fitnessCollection.findOne({name:name});
    if(fname!==null){
        throw `This Name is Alredy Exists for fitness center!!`
    }

    
    let newUser = {
      name:name,
      emailAddress: emailAddress,
      address:address,
      zipcode:zipcode,
      phoneNumber:phoneNumber,
      role:'Fitness',
      password: await bcrypt.hash(password, saltRounds),
      activites:activites,
      description:description,
      ratings:0,
    };

    console.log(newUser,'From DB')
    const insertInfo = await fitnessCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
      throw "Could not add the User";
    }
    return { insertedUser: true };
  },

  async updateFitness(id,name,address, zipcode,activites,description){
    
    address=validation.stringValidation(address,'Address line 1');
    zipcode=validation.zipCodeValidation(zipcode);
    activites=validation.stringValidation(activites,"Activities")
    description=validation.stringValidation(description,"Activities")
    
    const updatedMember = {


      address:address,
      zipcode:zipcode,
      activites:activites,
      description:description
    };

    
    const fitnessCollection = await fitness();

    
    const updatedInfo = await fitnessCollection.findOneAndUpdate(
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

  async checkFitness(emailAddress, password) {
    emailAddress = validation.stringValidation(emailAddress, "Email Address");
    emailAddress = emailAddress.toLowerCase();
    emailAddress = validation.emailValidation(emailAddress)
    password = validation.stringValidation(password, "Password");
    password = validation.passwordValidation(password)

    

    const fitnessCollection = await fitness();
    const user = await fitnessCollection.findOne({ emailAddress: emailAddress });
    console.log(user,'from db')
    if (user === null) {
      throw `Either the email address or password is invalid`;
    }

    const hashedPassword = await fitnessCollection.findOne(
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

  async removeFitness(id){
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0)
      throw 'id cannot be an empty string or just spaces';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    const fitnessCollection = await fitness();
    const deletionInfo = await fitnessCollection.findOneAndDelete({
      _id: new ObjectId(id)
    });

    if (deletionInfo.lastErrorObject.n === 0) {
      throw `Could not delete dog with id of ${id}`;
    }
    return `${deletionInfo.value.name} has been successfully deleted!`;
  },

  async getFitnessById(id){
    id = validation.idValidation(id, "Id");
    
    const fitnessCollection = await fitness();
    const fitnesInfo = await fitnessCollection.findOne({
      _id: new ObjectId(id)
    });
    // console.log(fitnesInfo,)
    if (!fitnesInfo) throw `No dietitian found with id ${id}`;

    fitnesInfo._id = fitnesInfo._id.toString();
    // console.log(fitnesInfo,'from db')
    return fitnesInfo;
  },
  

  
};
export default exportedMethods;
