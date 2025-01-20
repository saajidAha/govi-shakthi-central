import {GenerativeModel, GoogleGenerativeAI} from "@google/generative-ai"
import { Repository } from "../repositories/Repository";
/**
 * Class responsible for communication with the Google Gemini API
 */
export class LLMService {
    private model: GenerativeModel;
    private API_KEY: string;
    private static instance: LLMService;

    // Enforces Singleton pattern
    private constructor(apiKey: string){
        this.API_KEY = apiKey;
        this.model = this.initModel();
    }

    // Able to create only a single instance for a class
    public static getInstance(apiKey: string){
        LLMService.instance = LLMService.instance ?? new LLMService(apiKey);
        return LLMService.instance;
    }
    /**
     * Initializes LLM model with API key
     * @return GenerativeModel object
     */
    public initModel(): GenerativeModel{
        const genAI = new GoogleGenerativeAI(this.API_KEY);
        return genAI.getGenerativeModel({model: "gemini-1.5-flash"});
    }

    /**
     * Contacts the Gemini API and retruns a Promise based on the prompt
     * @param prompt The prompt message to send to the LLM
     */
    public async fetchLLMResponse(prompt: string): Promise<string>{
        try{
            const result = await this.model.generateContent(prompt);
            console.log(result.response.text());
            return this.formatToJson( result.response.text() );
        }catch (error){
            console.log("Error while communication with the LLM", error)
            return "error";
        }
    }

    /**
     * Predicts prices based on the existing dataset and provides insights
     */
    public async fetchPricePrediction(repo: Repository): Promise<string>{
        let fruit_data = await repo.findAll();
        return await this.fetchLLMResponse(`Analyse the contents of the JSON and give me a price prediction for every single fruit type in the JSON.  Include: - fruitType - retailPrice (in LKR) - wholesalePrice (in LKR) - predictedPrices - predictedTimeRange - predictionFactors Format the response strictly as valid JSON, without any extra text or explanations. MAKE SURE THAT THE RESPONSE IS FORMATTED IN VALID JSON FORMAT. DO NOT ADD ANY SYMBOLS OR CHARACTERS OR COMMENTS THAT WOULD MAKE THE JSON INVALID.: \n${JSON.stringify(fruit_data)}\n.`);
    }

    /**
     * Removes unnecessary symbols from response returned from the llm & Formats and parses it to JSON
     * @param value string literal
     */
    public formatToJson(value: string){
        return JSON.parse( value.replace(/```/g, "").replace(/json/g, "").trim() );
    }
 }