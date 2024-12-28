import mongoose from "mongoose";
import {MONGODB_URI} from "../services/EnvLoaderService";
import CredentialModel from "../models/CredentialModel";

export class MainRepository {
    /**
     * Initialize connection with the database
     */
    static async init(){
        try{
            await mongoose.connect(MONGODB_URI);
            console.log("Connection established with the database successfully.")
        }catch (e) {
            console.log("Error connecting to database: " + e);
        }
    }

    /**
     * add user info to database
     * @param credentials credentials of the user
     */
    async add(credentials: { username: string, password: string }){
        const user = new CredentialModel(credentials);
        await user.save();
    }

    /**
     * finds specific user
     * @param credentials credentials of the user
     */
    async findOne(credentials: {username: string, password: string}){
        return await CredentialModel.findOne({username: credentials.username, password: credentials.password})
    }
}