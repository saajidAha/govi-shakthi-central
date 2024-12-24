import {LLMService} from "./LLMService";
import fruit_dataset from "./../datasets/sri_lanka_fruit_data.json";
import market_dataset from "./../datasets/fruit_marketplace_data.json";
import raw_material_market_dataset from "./../datasets/fruit_raw_material_marketplace_data.json";

/**
 * Main Service class that handles the delegation and execution of all services and business logic
 */
export class MainService{
    private llmService: LLMService;

    /**
     * Constructor to initalize service class
     * @param llmService service object to be used to contact the LLM
     */
    constructor(llmService: LLMService) {
        this.llmService = llmService;
    }

    /**
     * Predicts prices based on the existing dataset and provides insights
     * @param fruit name of the fruit
     */
    async getAllPricePrediction(fruit: string): Promise<string>{
        return await this.llmService.computeResponse(`Analyse the contents of the json and give me a price prediction for every single fruit type in the json. include the fruit type, retail price (in LKR), whole sale price (in LKR), predicted prices, predicted time range, prediction factors considered and other insights about prediction in json format as an array of objects. do not give me any other unnecessary info: \n${JSON.stringify(fruit_dataset)}\n.`);
    }

    /**
     * Suggests alternative products based on the specified fruit
     * @param fruit name of the fruit
     * @return json object
     */
    getAlternativeProductSuggestion( fruit: string ){
        return fruit_dataset.filter(item => item.fruit_type === fruit);
    }

    /**
     * Recommends marketplaces to sell the alternative products based on the specified product
     * @param product alternative product based on the dataset
     * @return json object
     */
    getMarketPlaceRecommendation( product: string ){
        return market_dataset.filter(item => item.alternative_product === product);
    }

    /**
     * Recommend ingredients, raw material marketplaces to purchase ingredient to produce the desired alternative product
     * @param product alternative product based on the dataset
     * @return json object
     */
    getRawMaterialMarketPlace( product: string ){
        return raw_material_market_dataset.filter(item => item.alternative_product === product);
    }

    /**
     * FEATURE STILL IN DEVELOPMENT
     * Registers a user
     * @param username username
     * @param password password
     */
    registerUser( username: string, password: string): boolean{
        return false;
    }
}