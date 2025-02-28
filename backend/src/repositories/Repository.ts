import { Db, MongoClient} from 'mongodb'
/**
 * Class for handling all database operations
 */
export class Repository {
    private db: any;
    private MONGODB_URI: string;
    private static instance: Repository;

    // Enforces Singleton pattern
    private constructor(mongodbUri: string){
        this.MONGODB_URI = mongodbUri;
    };

    // Able to create only a single instance for a class
    public static getInstance(mongodbUri: string): Repository{
        Repository.instance = Repository.instance ?? new Repository(mongodbUri);
        return Repository.instance;
    }

    /**
     * Initialize connection with the database
     */
    public async init(){
            const client = new MongoClient(this.MONGODB_URI);
            await client.connect();
            this.db = client.db("govishakthi_central_db");
    }

    /**
     * add user info to database
     * @param credentials credentials of the user
     */
    public async registerUser(credentials: { username: string, hashedPassword: string }){
        await this.db.collection("user_credentials").insertOne(credentials);
    }

    /**
     * finds specific user
     * @param credentials credentials of the user
     */
    public async checkCredentials(credentials: {username: string}){
        return await this.db.collection("user_credentials").findOne({username: credentials.username},{ projection: { hashedPassword: 1} });
    }

    /**
     * Fetches fruit data
     */
    public async getFruitData(){
        return await this.db.collection("sri_lanka_fruit_data").find({}).toArray();
    }
    /**
     * Fetches market demand data
     */
    public async getDemandData(){
        return await this.db.collection("market_demand_data").find({}).toArray();
    }

    /**
     * Fetches crop yield data
     */
    public async getYieldData(){
        return await this.db.collection("yield_prediction_data").find({}).toArray();
    }

    /**
     * finds specific alternative product info from a collection
     * @param criteria criteria in {}
     */
    public async findAlternatives(criteria:{fruit_type: string}){
        return await this.db.collection("sri_lanka_fruit_data").find(criteria, { projection: { "fruit_type": 1, "location" : 1, "alternative_product": 1 } }).toArray();
    }

    /**
     * finds market based on alternative product
     * @param product alternative product
     * @param collectionName name of the collection
     */
    public async findMarket(product: {alternative_product: string}, collectionName: string){
        return await this.db.collection(collectionName).find(product).toArray();
    }

}

