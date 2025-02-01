import express from 'express';
import { Repository } from '../repositories/Repository';
import { LLMService } from '../services/LLMService';

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
        app.use( express.urlencoded( { extended: true } ));
        app.use(express.json());

        // Default page
        app.get("/", (req, res) => {
            res.json({message: "Connection established to the Node.JS backend Successfully"});
        })

        // Get predicted prices
        app.get("/api/prices", async(req, res) => {
            let prediction = await this.llmService.fetchPricePrediction(this.repository);
            res.json(prediction);
        });

        // Get demand prediction
        app.get("/api/demandprediction", async (req,  res) => {
            let prediction = await this.llmService.fetchDemandPrediction(this.repository);
            res.json(prediction);
        })

        // Get yield prediction
        app.get("/api/yieldprediction", async (req,  res) => {
            let prediction = await this.llmService.fetchYieldPrediction(this.repository);
            res.json(prediction);
        })

        // Get alternative product suggestions
        app.get("/api/alternatives", async(req, res) => {
            try{
                console.log(String(req.query.fruit_type))
                let product = await this.repository.findAlternatives({fruit_type: String(req.query.fruit_type)})
                res.json(product)
            }catch (error) {
                console.log("Error occured. Could not get result. : " + error)
                res.sendStatus(500);
            }
        })

        //  Get marketplace recommendations for the alternative product
        app.get("/api/alternatives/market", async(req, res) => {
            try{
                let marketPlaces = await this.repository.findMarket({alternative_product: String(req.query.alternative_product)}, "fruit_raw_material_marketplace_data");
                res.json(marketPlaces);
            }catch (error) {
                console.log("Error occured. Could not get result. : " + error)
                res.sendStatus(500);
            }
        })

        //  Get raw material marketplace recommendations for the alternative product
        app.get("/api/alternatives/rawMaterialMarket", async(req, res) => {
            try{
                let marketPlaces = await this.repository.findMarket({alternative_product: String(req.query.alternative_product)}, "fruit_marketplace_data" );
                res.json(marketPlaces);
            }catch (error) {
                console.log("Error occured. Could not get result. : " + error)
                res.sendStatus(500);
            }
        })

        // register user
        app.post("/api/register", async(req, res) => {
            let {username, password} = req.body;
            try{
                await this.repository.registerUser({username, password});
                console.log("User credentials saved sucessfully.");
                res.json({username: username, password: password});
            }catch (error) {
                console.log("Could not register user");
                res.sendStatus(404);
            }
        } )

        app.get("/api/login", async (req, res) => {
            const username = String(req.query.username);
            const password = String(req.query.password);
            try{
                let response = await this.repository.checkCredentials({username, password});
                response? res.sendStatus(200) : res.sendStatus(404);
            }catch (e){
                console.log("Error while checking login credentials")
                res.sendStatus(404);
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