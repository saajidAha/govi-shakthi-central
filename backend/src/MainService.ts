import {LLMService} from "./LLMService";

export class MainService{
    readonly llmService: LLMService;

    constructor(llmService: LLMService) {
        this.llmService = llmService;
    }

    async getPricePrediction( fruitName: string): Promise<string>{
        return await this.llmService.computeResponse("Generate a price prediction for " + fruitName + ". You can use a fake dataset or assume some fake data. The country is USA. make a prediction. structure your response in json format with just the importannt info regarding the dataset and prices. keep it simple. do not generate long descriptions.");
    }

    async getAlternativeProductSuggestion( fruitName: string ): Promise<string> {
        return await this.llmService.computeResponse("Generate a List of creative alternative product suggestions for this given product: " + fruitName +". The goal is to help farmers to create a value addition to their fruits and sell them at a profit. Keep the response short and simple");
    }

    getMarketPlaceRecommendation( product: string): string[]{
        return [product];
    }

    getRawMaterialMarketPlace( product: string ): string[]{
        return [product];
    }

    registerUser( username: string, password: string): boolean{
        return false;
    }
}