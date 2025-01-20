import {MainController} from "../controllers/MainController";
import {LLMService} from "./LLMService";
import {MainRepository} from "../repositories/MainRepository";
import dotenv from 'dotenv';

/**
 * Class to to handle logic to instantiate Server
 */
export class Server{
    private static instance: Server;
    private controller: MainController;
    public static API_KEY: any;
    public static MONGODB_URI: any;

    // load the .env file keys
    static{
        Server.loadKeys();
    }

    /**
     * @param controller Controller object 
     */
    private constructor(controller: MainController){
        this.controller = controller
    }

    public static getInstance(controller: MainController): Server{
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

// Inject controller with required dependencies
const mainController: MainController = MainController.getInstance(MainRepository.getInstance(Server.MONGODB_URI), LLMService.getInstance(Server.API_KEY));
// Start the server
Server.getInstance(mainController).start();
