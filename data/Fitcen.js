import bcrypt from "bcrypt";
const saltRounds = 15;
import { Fitcens } from "../config/mongoCollections.js";
import validation from "../helpers.js";

const exportedMethods = {
    async createFitcen(Name, emailAddress, password, confirmPassword, address_line1, zipcode, phoneNumber, rating, activities) {
        Name = validation.stringValidation(Name, "Name");
        Name = validation.nameValid(Name, "Name");
        emailAddress = validation.stringValidation(emailAddress, "Email Address");
        emailAddress = validation.emailValidation(emailAddress);
        emailAddress = emailAddress.toLowerCase();
        password = validation.stringValidation(password, "Password");
        password = validation.passwordValidation(password);
        confirmPassword = validation.stringValidation(confirmPassword);
        confirmPassword = validation.confirmPaswordValidation(password, confirmPassword);
        address_line1 = validation.stringValidation(address_line1, 'Address line 1');
        zipcode = validation.zipCodeValidation(zipcode);
        phoneNumber = validation.phoneNumberValidation(phoneNumber);
        rating = validation.ratingValidation(rating);
        activities = validation.stringValidation(activities, "activities");
    

    const FitcenCollection = await Fitcens();
    const email = await FitcenCollection.findOne({ emailAddress: emailAddress });

    if(email !== null) {
        throw `This Email Address Alredy Exists !`;
    }

const phone = await FitcenCollection.findOne({ phoneNumber: phoneNumber });
if (phone !== null) {
    throw `This phone number is Alredy Exists!!`
}

let newFitcen = {
    Name: Name,
    emailAddress: emailAddress,
    address_line1: address_line1,
    zipcode: zipcode,
    phoneNumber: phoneNumber,
    password: await bcrypt.hash(password, saltRounds),
    rating: rating,
    activities: activities,
};

const insertInfo = await FitcenCollection.insertOne(newFitcen);
if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Could not add the Fitcen";
}
return { insertedFitcen: true };
  },
    

async updateFitcen(id, address_line1, zipcode, activities){

    address_line1 = validation.stringValidation(address_line1, 'Address line 1');
    zipcode = validation.zipCodeValidation(zipcode);
    activities = validation.stringValidation(activities, "activities");


    const updatedMember = {


        address_line1: address_line1,
        zipcode: zipcode,
        activities: activities,
    };


    const FitcenCollection = await Fitcens();


    const updatedInfo = await FitcenCollection.findOneAndUpdate(
        { _id: id },
        { $set: updatedMember },
        { returnDocument: 'after' }
    );
    if (updatedInfo.lastErrorObject.n === 0) {
        throw 'could not update member successfully';
    }
    updatedInfo.value._id = updatedInfo.value._id.toString();

    console.log(updatedInfo.value, 'Va');
    return updatedInfo.value;
},





async checkFitcen(emailAddress, password) {
    emailAddress = validation.stringValidation(emailAddress, "Email Address");
    emailAddress = emailAddress.toLowerCase();
    emailAddress = validation.emailValidation(emailAddress)
    password = validation.stringValidation(password, "Password");
    password = validation.passwordValidation(password)



    const FitcenCollection = await Fitcens();

    const Fitcen = await FitcenCollection.findOne({ emailAddress: emailAddress });
    if (Fitcen === null) {
      throw `Either the email address or password is invalid`;
    }

    const hashedPassword = await FitcenCollection.findOne(
        { emailAddress: emailAddress },
        { projection: { _id: 0, password: 1 } }
    );

    try {
        if (await bcrypt.compare(password, hashedPassword.password)) {
            return Fitcen;
        } else {
            throw `Either the email address or password is invalid`;
        }
    } catch (e) {
        return e;
    }
},

  async removeFitcen(id){
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0)
        throw 'id cannot be an empty string or just spaces';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    const FitcenCollection = await Fitcens();

    const deletionInfo = await FitcenCollection.findOneAndDelete({
        _id: new ObjectId(id)
    });

    if (deletionInfo.lastErrorObject.n === 0) {
        throw `Could not delete dog with id of ${id}`;
    }
    return `${deletionInfo.value.name} has been successfully deleted!`;
}
};
export default exportedMethods;