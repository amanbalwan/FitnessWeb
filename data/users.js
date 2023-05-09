import { users } from "../config/mongoCollections.js";
import bcrypt from 'bcrypt';

const usernameRegex = new RegExp('^[A-Za-z0-9]*$');
const passwordRegex = new RegExp('^[A-Za-z0-9_@./#&+-]*$');

function validate(username, password) {
    if (!username || typeof username != 'string') throw { status: 400, message: 'Please provide Username' };
    if (!password || typeof password != 'string') throw { status: 400, message: 'Please provide Password' };
    if (!usernameRegex.test(username)) throw { status: 400, message: 'Please give a valid Username with Alpha numeric characters' };
    if (username.length < 4) throw { status: 400, message: 'Please give min of 4 characters for Username' };
    if (!passwordRegex.test(password)) throw { status: 400, message: 'Please give a valid Password with Alpha numeric and special characters' };
    if (password.length < 6) throw { status: 400, message: 'Please give min of 6 characters for Password' };
};

const exportMethods = {
    async createUser(username, password) {
        const usersCollection = await users();
        validate(username, password);
        const user = await usersCollection.findOne({ username: new RegExp(`^${username}$`, 'i') });
        if (user) throw { status: 400, message: `User already exists with the username ${username}` };

        const hashedPassword = await bcrypt.hash(password, 10);

        const newInsertInformation = await usersCollection.insertOne({ username: username, password: hashedPassword });
        if (!newInsertInformation.insertedId) throw { status: 500, message: 'Insertion failed!' };
        return { insertedUser: true };
    },

    async checkUser(username, password) {
        const usersCollection = await users();
        validate(username, password);
        const user = await usersCollection.findOne({ username: new RegExp(`^${username}$`, 'i') });
        if (!user) throw { status: 400, message: `User does not exists with username ${username}` };

        if (!await bcrypt.compare(password, user.password)) throw { status: 400, message: 'Either the username or password is invalid' };

        return { authenticated: true };
    }
}
export default exportMethods;
