import { ObjectId } from 'mongodb';
import { restaurants } from '../config/mongoCollections.js';
import bcrypt from "bcrypt";
import validation from "../helpers.js";
const saltRounds = 10;

const exportMethods = {
    async createRestaurant(restaurantsDto) {
    let {storeName, storeAddress, storeZip, storeDescription, storeMenu, storeEmail, storePassword, storeConfirmPassword} = restaurantsDto;

        storeName = validation.storeNameValid(storeName, "Store Name");
        storeAddress = validation.addressValidation(storeAddress);
        storeZip = validation.zipCodeValidation(storeZip);
        storeDescription = validation.stringValidation(storeDescription, "Store Description");
        storeMenu = validation.menuValidation(storeMenu);
        storeEmail = validation.emailValidation(storeEmail);
        storePassword = validation.passwordValidation(storePassword);
        storePassword = validation.stringValidation(storePassword, "Store Password");
        storeConfirmPassword = validation.stringValidation(storeConfirmPassword, "Store Confirm Password");
        storeConfirmPassword = validation.confirmPaswordValidation(storePassword, storeConfirmPassword);

        const restaurantCollection = await restaurants();
        const Name = await restaurantCollection.findOne({ storeName: storeName });
        const Address = await restaurantCollection.findOne({ storeAddress: storeAddress });
        const email = await restaurantCollection.findOne({ storeEmail: storeEmail });

        if (Name) throw new Error('Restaurant name already exists');
        if (Address) throw new Error('A Restaurant already exists with this address');
        if (email) throw new Error('A Restaurant already exists with this email');

        let newRestaurant = {
            storeName: storeName,
            storeAddress: storeAddress,
            storeZip: storeZip,
            storeDescription: storeDescription,
            storeMenu: storeMenu,
            storeEmail: storeEmail,
            storePassword: await bcrypt.hash(storePassword, saltRounds),
        };



        const insertInfo = await restaurantCollection.insertOne(newRestaurant);

        if (!insertInfo.insertedId || !insertInfo.acknowledged)
            throw new Error('Could not add restaurant to database');

        // const restaurantId = insertInfo.insertedId.toString();
        // let returnRestaurant = await this.getRestaurantById(restaurantId);

        // returnRestaurant._id = returnRestaurant._id.toString();
        // let returnRestaurant = this.getRestaurantById();
        console.log(insertInfo);
        let restaurantID = insertInfo.insertedId.toString();
        console.log(restaurantID);
        let returnRestaurant = this.getRestaurantById(restaurantID);
        return returnRestaurant;
        // return { insertedRestaurant: true };
    },

    // get all restaurants

    async getAllRestaurants() {
        const restaurantCollection = await restaurants();
        const restaurantList = await restaurantCollection.find({}).toArray();
        restaurantList.map((r) => {
            r._id = r._id.toString();
        });
        if (!restaurantList) throw 'No restaurants in system!';
        return restaurantList;
    },

    async checkRestaurant(storeEmail, storePassword) {
        const restaurantCollection = await restaurants();
        // storeEmail = validation.stringValidation(storeEmail, "Email Address");
        storeEmail = validation.emailValidation(storeEmail);
        storePassword = validation.stringValidation(storePassword, "Password");
        // storePassword = validation.passwordValidation(storePassword);

        const restaurant = await restaurantCollection.findOne({ storeEmail: storeEmail });
        if (!restaurant) throw { message: 'Invalid Email Address' };
        const passwordMatch = await bcrypt.compare(storePassword, restaurant.storePassword);
        if (!passwordMatch) throw { message: 'Invalid Password' };
        return restaurant;
    },
    // get restaurant by id

    async getRestaurantById(id) {
        if (!id) throw new Error('Restaurant ID is required');
        if (typeof id !== 'string' || !ObjectId.isValid(id)) {
            throw new Error('Invalid restaurant ID');
        }
        const restaurantCollection = await restaurants();
        const restaurant = await restaurantCollection.findOne({ _id: new ObjectId(id) });

        if (!restaurant) throw new Error('Restaurant not found');
        restaurant._id = restaurant._id.toString();
        return restaurant;
    },

    // // find by Id and update

    // async findByIdAndUpdate(id, updatedRestaurant) {
    //     const restaurantCollection = await restaurants();
    //     const updatedRestaurantData = await restaurantCollection.findOneAndUpdate(
    //         { _id: ObjectId(id) },
    //         { $set: updatedRestaurant },
    //         { returnOriginal: false }
    //     );
    //     if (!updatedRestaurantData.ok) throw new Error('Could not update restaurant');
    //     return updatedRestaurantData.value;
    // },

    // async updateRestaurant(id, storeName, storeAddress, storeZip, storeDescription, storeMenu){

    //     storeName = validation.nameValid(storeName, "Store Name");
    //     storeAddress = validation.addressValidation(storeAddress, "Store Address");
    //     storeZip = validation.zipCodeValidation(storeZip, "Store Zip");
    //     storeDescription = validation.stringValidation(storeDescription, "Store Description");
    //     storeMenu = validation.menuValidation(storeMenu, "Store Menu");

    //     const restaurantCollection = await restaurants();
    //     const Name = await restaurantCollection.findOne({ storeName: UpdateRes.storeName });
    //     const Address = await restaurantCollection.findOne({ storeAddress: UpdateRes.storeAddress });

    //     try {
    //         const UpdateRes = await this.findByIdAndUpdate(id, {
    //             storeName: storeName,
    //             storeAddress: storeAddress,
    //             storeZip: storeZip,
    //             storeDescription: storeDescription,
    //             storeMenu: storeMenu
    //         }, { new: true });
    //         return this.getRestaurantById(id);
    //     } catch (e) {
    //         throw new Error(e);
    //     }
    // },

    //update a existing restaurant
    async updateRestaurant(id, storeName, storeAddress, storeZip, storeDescription, storeMenu) {

        storeName = validation.nameValid(storeName, "Store Name");
        storeAddress = validation.addressValidation(storeAddress, "Store Address");
        storeZip = validation.zipCodeValidation(storeZip, "Store Zip");
        storeDescription = validation.stringValidation(storeDescription, "Store Description");
        storeMenu = validation.menuValidation(storeMenu, "Store Menu");
      
        const restaurantCollection = await restaurants();
      
        const existingRestaurant = await restaurantCollection.findOne({ _id: new ObjectId(id) });
        if (!existingRestaurant) throw new Error('Restaurant not found');
      
        const updateObj = {
          storeName: storeName,
          storeAddress: storeAddress,
          storeZip: storeZip,
          storeDescription: storeDescription,
          storeMenu: storeMenu
        };
      
        const updatedRestaurantData = await restaurantCollection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: updateObj },
          { returnOriginal: false }
        );
      
        if (!updatedRestaurantData.ok) throw new Error('Could not update restaurant');
        // return updatedRestaurantData.value;

        // updatedRestaurantData.value._id = updatedRestaurantData.value._id.toString();
        const updatedRestaurant = this.getRestaurantById(id);

        console.log(updatedRestaurant);
        return updatedRestaurant;

      },     

    // delete restaurant by id

    async deleteRestaurantById(id) {
        try {
            const restaurantCollection = await restaurants();
            const deleteInfo = await restaurantCollection.deleteOne({ _id: new ObjectId(id) });
            console.log(deleteInfo);
            return "Restaurant Deleted";
        } catch (e) {
            throw new Error(e);
        }
    }

};
export default exportMethods;