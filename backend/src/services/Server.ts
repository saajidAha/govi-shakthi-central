import {Controller} from "../controllers/Controller";
import dotenv from 'dotenv';

/**
 * Class to handle logic to instantiate Server
 */
export class Server{
    private static instance: Server;
    private controller: Controller;
    public static API_KEY: any;
    public static MONGODB_URI: any;

    // load the .env file keys
    static{
        Server.loadKeys();
    }

    /**
     * @param controller Controller object 
     */
    private constructor(controller: Controller){
        this.controller = controller
    }

    public static getInstance(controller: Controller): Server{
        Server.instance = Server.instance ?? new Server(controller);
        return Server.instance;
    }
    
    /**
     * Establish connection with the Database and if successful, starts the server.
     */
    private async initDBAndLaunchServer(){
        try{
            await this.controller.getRepository().init();
            console.log("Connection established with the database server successfully.");
            this.controller.start();
        }catch(error){
            console.log("Unable to connect to the database.\nServer will not start as a result.\n Ensure the .env is present and contains the correct environment variables.")
        }
    }
    
    /**
     * Validates keys & starts the Server
     */
    public start(): void{
        // initialize the DB & server if keys are valid
        this.checkKeysExist() ? this.initDBAndLaunchServer() : console.log("API Key or DB connection string is null.\nPlease check if the .env file containing the db connection string and LLM is available or contact the author of this code.");
    }

    /**
     * Checks the null status of the keys 
     */
    private checkKeysExist(): boolean{
        return !(Server.API_KEY=== null || Server.MONGODB_URI=== null) ;
    }

    /**
    * Loads the keys from .env files;
    */
    private static loadKeys(): void{
        dotenv.config();
        Server.API_KEY = String(process.env.API_KEY);
        Server.MONGODB_URI = String(process.env.MONGODB_URI);
    }
}