import mongoose from "mongoose";
import { HOST_DB, PASSWORD_DB, USER_DB } from './constants.js';

export const databaseConnection = async ()=>{

    try {
        await mongoose.connect(`mongodb+srv://${USER_DB}:${PASSWORD_DB}@${HOST_DB}/?retryWrites=true&w=majority`);
        console.log("me conecté correctamente a la bd");
    } catch (error) {
        console.log(error);
    }
    
}



