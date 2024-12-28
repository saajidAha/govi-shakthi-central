import { Db, MongoClient} from 'mongodb'
import {MONGODB_URI} from "../services/EnvLoaderService";

export class MainRepository {
    static db: Db;
    /**
     * Initialize connection with the database
     */
    static async init(){
        try{
            // await mongoose.connect(MONGODB_URI);
            const client = new MongoClient(MONGODB_URI);
            await client.connect();
            console.log("Connection established with the database server successfully.");
            MainRepository.db = client.db("govishakthi_central_db");
        }catch (e) {
            console.log("Error connecting to database: " + e);
        }
    }

    /**
     * add user info to database
     * @param credentials credentials of the user
     */
    async registerUser(credentials: { username: string, password: string }){
        await MainRepository.db.collection("user_credentials").insertOne(credentials);
    }

    /**
     * finds specific user
     * @param credentials credentials of the user
     */
     async checkCredentials(credentials: {username: string, password: string}){
        return await MainRepository.db.collection("user_credentials").findOne({username: credentials.username, password: credentials.password})
    }

    /**
     * Returns all the documents from a collection
     * @param collectionName
     */
    async findAll(collectionName: string){
        return await MainRepository.db.collection(collectionName).find({}).toArray();
    }

    /**
     * finds specific info from a collection
     * @param criteria criteria in {}
     * @param collectionName the name of the collection in the db
     */
    async findAlternatives(criteria:{fruit_type: string}, collectionName: string){
        return await MainRepository.db.collection(collectionName).find(criteria).toArray();
    }

    /**
     * finds market based on alternative product
     * @param product alternative product
     * @param collectionName name of the collection
     */
    async findMarket(product: {alternative_product: string}, collectionName: string){
        return await MainRepository.db.collection(collectionName).find(product).toArray();
    }
}

