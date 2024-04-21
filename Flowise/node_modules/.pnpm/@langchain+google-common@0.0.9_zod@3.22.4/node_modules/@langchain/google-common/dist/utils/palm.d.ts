export interface GoogleVertexAIBasePrediction {
    safetyAttributes?: any;
}
export interface GoogleVertexAILLMPredictions<PredictionType extends GoogleVertexAIBasePrediction> {
    predictions: PredictionType[];
}
