import { GoogleGenerativeAI } from "@google/generative-ai"
export class LLMService {
    // DO NOT MISUSE OR SHARE THIS API_KEY.
    private static API_KEY: string = "AIzaSyDe-S97dRNGO0BbZkvf8Vov14metv1xjzo";

    async computeResponse(prompt: string){
        const genAI = new GoogleGenerativeAI(LLMService.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        try{
            const result = await model.generateContent(prompt);
            let response: string = result.response.text();
            console.log(response);
            return response;
        }catch (error){
            console.log("Error while communication with the LLM")
            return "error";
        }
    }
}
