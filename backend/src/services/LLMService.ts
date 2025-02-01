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
    private initModel(): GenerativeModel{
        const genAI = new GoogleGenerativeAI(this.API_KEY);
        return genAI.getGenerativeModel({model: "gemini-1.5-flash"});
    }

    /**
     * Contacts the Gemini API and retruns a Promise based on the prompt
     * @param prompt The prompt message to send to the LLM
     */
    private async fetchLLMResponse(prompt: string): Promise<string>{
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
        let fruit_data = await repo.getFruitData();
        return await this.fetchLLMResponse(
            `\`\`\`json
{
  "instruction": "Analyze the following data and provide price predictions for every single fruit type separately. Use a simple machine learning algorithm. strictly format your response as JSON. Do not add any comments/disclaimers/notes. follow the json schema in your output that is provided under the "fields" below. The title of the object containing the array of all the fields below should be named as "predictions".,
  "data": ${JSON.stringify(fruit_data)},
  "fields": ["fruitType", "predictedPrice", "MachineLearningAlgorithmName"]
}
\`\`\``
        );
    }

    public async fetchYieldPrediction(repo: Repository){
        let market_data = await repo.getYieldData();
        return await this.fetchLLMResponse(
            `\`\`\`json
{
  "instruction": "Analyze the following data and provide yield predictions for every single fruit type separately. Use a simple machine learning algorithm. strictly format your response as JSON. Do not add any comments/disclaimers/notes. follow the json schema in your output that is provided under the "fields" below. The title of the object containing the array of the fields below should be named as "predictions".,
  "data": ${JSON.stringify(market_data)},
  "fields": ["fruitType", "yieldPredictionPerHectare_KG", "MachineLearningAlgorithmName"]
}
\`\`\``
        );
    }

    public async fetchDemandPrediction(repo: Repository){
        let demand_data = await repo.getDemandData();
        return await this.fetchLLMResponse(
            `\`\`\`json
{
  "instruction": "Analyze the following data and provide market demand predictions for every single fruit type separately. Use a simple machine learning algorithm. strictly format your response as JSON. Do not add any comments/disclaimers/notes. follow the json schema in your output that is provided under the "fields" below. The title of the object containing the array of the fields should be named as "predictions".,
  "data": ${JSON.stringify(demand_data)},
  "fields": ["fruitType", "MarketName", "demandPrediction (Units per day)", "MachineLearningAlgorithmName"]
}
\`\`\``
        );
    }

    /**
     * Sanitized unformatted output from llm
     * @param value response of the llm
     */
    private formatToJson(value: string){
        return JSON.parse(value.replace(/```/g, "").replace(/json/g, "").trim());
    }
 }

