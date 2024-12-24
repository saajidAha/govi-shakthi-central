import express from 'express';
import {MainService} from "./MainService";

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
            let prediction: string = await this.mainService.getAllPricePrediction(req.body.fruitName);
            res.send(prediction);
        });

        // Get alternative product suggestions
        app.post("/api/alternatives", (req, res) => {
            let product = this.mainService.getAlternativeProductSuggestion(req.body.fruitName)
            res.json(product)
        })

        //  Get marketplace recommendations for the alternative product
        app.post("/api/alternatives/market", (req, res) => {
            let marketPlaces = this.mainService.getMarketPlaceRecommendation(req.body.alternativeProduct);
            res.json(marketPlaces);
        })

        //  Get raw material marketplace recommendations for the alternative product
        app.post("/api/alternatives/rawMaterialMarket", (req, res) => {
            let marketPlaces = this.mainService.getRawMaterialMarketPlace(req.body.alternativeProduct);
            res.json(marketPlaces);
        })

        // register user
        app.post("/api/register", (req, res) => {
            let {username, password} = req.body;
            let registered: boolean = this.mainService.registerUser(username, password);
            registered? res.sendStatus(200) : res.sendStatus(404);
        } )

        // listen at specified port
        app.listen(this.port, ()=> {
            console.log(`Server listening on port ${this.port}`);
        })

    }
}