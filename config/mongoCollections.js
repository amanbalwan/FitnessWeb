import {dbConnection} from './mongoConnection.js';

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

export const users = getCollectionFn('users');
export const dietitians = getCollectionFn('dietitians');
export const appointments = getCollectionFn('appointments');
/* Now, you can list your collections here: 
NOTE: YOU WILL NEED TO CHANGE THE CODE BELOW AND UNCOMMENT IT TO HAVE THE COLLECTION(S) REQUIRED BY THE ASSIGNMENT */


