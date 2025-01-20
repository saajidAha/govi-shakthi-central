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
    public async registerUser(credentials: { username: string, password: string }){
        await this.db.collection("user_credentials").insertOne(credentials);
    }

    /**
     * finds specific user
     * @param credentials credentials of the user
     */
    public async checkCredentials(credentials: {username: string, password: string}){
        return await this.db.collection("user_credentials").findOne({username: credentials.username, password: credentials.password})
    }

    /**
     * Returns all the documents from a collection
     * @param collectionName
     */
    public async findAll(){
        return await this.db.collection("sri_lanka_fruit_data").find({}).toArray();
    }

    /**
     * finds specific info from a collection
     * @param criteria criteria in {}
     * @param collectionName the name of the collection in the db
     */
    public async findAlternatives(criteria:{fruit_type: string}){
        return await this.db.collection("sri_lanka_fruit_data").find(criteria).toArray();
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

