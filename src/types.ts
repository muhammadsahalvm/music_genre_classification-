export type Genre = "blues" | "classical" | "country" | "disco" | "hiphop" | "jazz" | "metal" | "pop" | "reggae" | "rock";

export type GenreProbabilities = {
  blues: number;
  classical: number;
  country: number;
  disco: number;
  hiphop: number;
  jazz: number;
  metal: number;
  pop: number;
  reggae: number;
  rock: number;
};

export interface PredictionResponse {
  genre: Genre;
  probabilities: GenreProbabilities;
}

export interface PredictionHistoryItem {
  _id: string;
  fileName: string;
  predictedGenre: Genre;
  probabilities: GenreProbabilities;
  createdAt: number;
}

export const GENRES: Genre[] = [
  "blues", "classical", "country", "disco", "hiphop", 
  "jazz", "metal", "pop", "reggae", "rock"
];
