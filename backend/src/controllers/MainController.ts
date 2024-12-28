import express from 'express';
import {MainService} from "../services/MainService";

/**
 * RESTful Controller Class Responsible for the Listening of HTTP requests
 */
export class MainController{
    readonly port: number;
    readonly mainService: MainService;

    /**
     * Constructor to initialize Controller
     * @param port Port that the server should run on
     * @param mainService Service class that would perform/ delegate the business logic
     */
    constructor(port: number, mainService: MainService) {
        this.port = port;
        this.mainService = mainService;
    }

    /**
     * Initializes the endpoints
     */
    start(): void{
        let app = express();
        app.use(express.json());
        app.use( express.urlencoded( { extended: true } ));

        // Default page
        app.get("/", (req, res) => {
            res.send("Connection established to the Node.JS backend Successfully");
        })

        // Get predicted prices
        app.post("/api/prices", async(req, res) => {
            let prediction: string = await this.mainService.getAllPricePrediction();
            res.send(prediction);
        });

        // Get alternative product suggestions
        app.post("/api/alternatives", async(req, res) => {
            try{
                let product = await this.mainService.getAlternativeProductSuggestion({fruit_type: req.body.fruit_type})
                res.json(product)
            }catch (error) {
                console.log("Error occured. Could not get result. : " + error)
                res.sendStatus(500);
            }
        })

        //  Get marketplace recommendations for the alternative product
        app.post("/api/alternatives/market", async(req, res) => {
            try{
                let marketPlaces = await this.mainService.getMarketPlaceRecommendation({alternative_product: req.body.alternative_product});
                res.json(marketPlaces);
            }catch (error) {
                console.log("Error occured. Could not get result. : " + error)
                res.sendStatus(500);
            }
        })

        //  Get raw material marketplace recommendations for the alternative product
        app.post("/api/alternatives/rawMaterialMarket", async(req, res) => {
            try{
                let marketPlaces = await this.mainService.getRawMaterialMarketPlace({alternative_product: req.body.alternative_product});
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
                await this.mainService.registerUser({username, password});
                console.log("User credentials saved sucessfully.");
                res.sendStatus(200);
            }catch (error) {
                console.log("Could not register user");
                res.sendStatus(404);
            }
        } )

        app.post("/api/login", async (req, res) => {
            try{
                const {username, password} = req.body;
                let response = await this.mainService.checkCredentials({username, password});
                response? res.sendStatus(200) : res.sendStatus(500);
            }catch (e){
                console.log("Error while checking login credentials")
            }
        })

        // listen at specified port
        app.listen(this.port, ()=> {
            console.log(`Server listening on port ${this.port}`);
        })

    }
}