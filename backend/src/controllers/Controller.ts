import express from 'express';
import { Repository } from '../repositories/Repository';
import { LLMService } from '../services/LLMService';
import {Authenticator} from "../services/Authenticator";

/**
 * RESTful Controller Class Responsible for the Listening of HTTP requests
 */
export class Controller{
    private port: number = 7000;
    private repository: Repository;
    private llmService: LLMService;
    private static instance: Controller;

    /**
     * Singleton Constructor to initialize Controller
     * @param mainRepository Object for handling database operations
     * @param llmService Object to handle LLM operations
     */
    private constructor(mainRepository: Repository, llmService: LLMService) {
        this.repository = mainRepository;
        this.llmService = llmService;
    }

    public static getInstance(mainRepository: Repository, llmService: LLMService){
        Controller.instance = Controller.instance ?? new Controller(mainRepository, llmService);
        return Controller.instance;
    }

    /**
     * Initializes the API endpoints
     */
    public start(): void{
        let app = express();

        // setup middleware
        app.use(express.urlencoded( { extended: true }));
        app.use(express.json());

        // Default page
        app.get("/", (req, res) => {
            res.status(200).json({message: "Connection established to the Node.JS backend Successfully"});
        })

        // Get predicted prices
        app.get("/api/prices", async(req, res) => {
            try{
                let prediction = await this.llmService.fetchPricePrediction(this.repository);
                res.status(200).json(prediction);
            }catch (e) {
                res.status(500).json({message: "Error occurred in the server"});
            }
        });

        // Get demand prediction
        app.get("/api/demandprediction", async (req,  res) => {
            try{
                let prediction = await this.llmService.fetchDemandPrediction(this.repository);
                res.status(200).json(prediction);
            }catch (e) {
                res.status(500).json({message: "Error occurred in the server"});
            }
        })

        // Get yield prediction
        app.get("/api/yieldprediction", async (req,  res) => {
            try{
                let prediction = await this.llmService.fetchYieldPrediction(this.repository);
                res.status(200).json(prediction);
            }catch (e) {
                res.status(500).json({message: "Error occurred in the server"});
            }
        })

        // Get alternative product suggestions
        app.get("/api/alternatives", async(req, res) => {
            try{
                console.log(String(req.query.fruit_type))
                let product = await this.repository.findAlternatives({fruit_type: String(req.query.fruit_type)});
                product.length!==0? res.status(200).json(product) : res.status(422).json({message:"could not find alternative for specified fruit. Please ensure that the fruit is spelled correctly." });
            }catch (error) {
                console.log("Error occurred. Could not get result. : " + error)
                res.status(500).json({message: "Error occurred in the server"});
            }
        })

        //  Get marketplace recommendations for the alternative product
        app.get("/api/alternatives/market", async(req, res) => {
            try{
                let marketPlaces = await this.repository.findMarket({alternative_product: String(req.query.alternative_product)}, "fruit_raw_material_marketplace_data");
                marketPlaces.length!==0? res.status(200).json(marketPlaces) : res.status(422).json({message:"could not find market places for specified fruit. Please ensure that the fruit is spelled correctly." });
            }catch (error) {
                console.log("Error occurred. Could not get result. : " + error)
                res.status(500).json({message: "Error occurred in the server"});
            }
        })

        //  Get raw material marketplace recommendations for the alternative product
        app.get("/api/alternatives/rawMaterialMarket", async(req, res) => {
            try{
                let marketPlaces = await this.repository.findMarket({alternative_product: String(req.query.alternative_product)}, "fruit_marketplace_data" );
                marketPlaces.length!==0? res.status(200).json(marketPlaces) : res.status(422).json({message:"could not find raw material market places for specified fruit. Please ensure that the fruit is spelled correctly." });
            }catch (error) {
                console.log("Error occurred. Could not get result. : " + error)
                res.status(500).json({message: "Error occurred in the server"});
            }
        })

        // register user
        app.post("/api/register", async(req, res) => {
            let {username, password, name, location, email, phone} = req.body;
            try{
                let hashedPassword = await Authenticator.hashPassword(password);
                await this.repository.registerUser({username, hashedPassword, name, location, email,  phone});
                console.log("User credentials saved successfully.");
                res.status(201).json({message: "user registered successfully."});
            }catch (error) {
                console.log("Error occurred in the server");
                res.status(500).json({message: "Error occurred in the server"});
            }
        } )

        // check login status
        app.post("/api/login", async (req, res) => {
            const username = String(req.body.username);
            const password = String(req.body.password);
            try{
                let response = await this.repository.checkCredentials({username});
                if (response === null ) {
                    res.status(401).json({message: "Access denied. User not registered in the system."})
                }
                else{
                    let hashResponse = await Authenticator.compareHashes(password, response.hashedPassword);
                    hashResponse? res.status(200).json({message: "Access granted. User exists within the system", username:response.username, name: response.name, location: response.location, email:response.email, phone:response.phone}) : res.status(401).json({message: "Access denied. User not registered in the system."});
                }
            }catch (e){
                console.log("Error while checking login credentials" + e)
                res.status(500).json({message: "Error occurred in the server"});
            }
        })

        // listen at specified port
        app.listen(this.port, ()=> {
            console.log(`Server listening on port ${this.port}`);
        })

    }
    
    // Return the repo object
    public getRepository(): Repository{
        return this.repository;
    }
}