import React, { useState } from 'react';
import { useAction, useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { FileUpload } from './FileUpload';
import { PredictionResult } from './PredictionResult';
import { PredictionResponse } from '../types';

export function MusicGenreClassifier() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResponse | null>(null);

  const loggedInUser = useQuery(api.auth.loggedInUser);
  const storePrediction = useMutation(api.predictions.storePrediction);

  const handlePredict = async () => {
    if (!selectedFile) {
      setError('Please select an audio file first');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // 1. Prepare FormData for direct fetch to local backend
      const formData = new FormData();
      formData.append('audio', selectedFile);

      // 2. Call the Python backend directly (Browser -> Localhost)
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const prediction: PredictionResponse = await response.json();

      // 3. Store the result in Convex only if logged in
      if (loggedInUser) {
        await storePrediction({
          fileName: selectedFile.name,
          predictedGenre: prediction.genre,
          probabilities: prediction.probabilities,
        });
      }

      setResult(prediction);
    } catch (err: any) {
      console.error('Prediction error:', err);
      setError(err.message || 'Prediction failed. Ensure the Python backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Music Genre Classifier
        </h2>
        <p className="text-[#b3b3b3]">
          Upload a music clip (.wav, .mp3, .mp4) and get the predicted genre using my deep learning model.
        </p>
      </div>

      <FileUpload
        onFileSelect={setSelectedFile}
        selectedFile={selectedFile}
        isLoading={isLoading}
      />

      <button
        onClick={handlePredict}
        disabled={!selectedFile || isLoading}
        className="auth-button"
      >
        {isLoading ? 'Analyzing audio...' : 'Predict Genre'}
      </button>

      {error && (
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {result && <PredictionResult result={result} />}
    </div>
  );
}
