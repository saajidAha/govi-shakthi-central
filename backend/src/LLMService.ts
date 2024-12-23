import {GenerativeModel, GoogleGenerativeAI} from "@google/generative-ai"

/**
 * Class responsible for communication with the Google Gemini API
 */
export class LLMService {
    // DO NOT MISUSE OR SHARE THIS API_KEY.
    private static API_KEY: string = "AIzaSyDe-S97dRNGO0BbZkvf8Vov14metv1xjzo";
    private static model: GenerativeModel = LLMService.initModel();

    /**
     * Initializes LLM model with API key
     * @return GenerativeModel object
     */
    static initModel(): GenerativeModel{
        const genAI = new GoogleGenerativeAI(LLMService.API_KEY);
        return genAI.getGenerativeModel({model: "gemini-1.5-flash"});
    }

    /**
     * Contacts the Gemini API and retruns a Promise based on the prompt
     * @param prompt The prompt message to send to the LLM
     */
    async computeResponse(prompt: string): Promise<string>{
        try{
            const result = await LLMService.model.generateContent(prompt);
            let response: string = result.response.text();
            console.log(response);
            return response;
        }catch (error){
            console.log("Error while communication with the LLM")
            return "error";
        }
    }
}