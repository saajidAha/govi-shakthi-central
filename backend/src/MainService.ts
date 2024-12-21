export class MainService{

    getPricePrediction( fruitName: string): string {
        return fruitName;
    }

    getAlternativeProductSuggestion( fruitName: string ): string {
        return fruitName;
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