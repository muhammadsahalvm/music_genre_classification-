import React from 'react';
import { PredictionResponse } from '../types';

interface PredictionResultProps {
  result: PredictionResponse;
}

export function PredictionResult({ result }: PredictionResultProps) {
  const sortedProbabilities = Object.entries(result.probabilities)
    .sort(([, a], [, b]) => b - a);

  const SPOTIFY_PLAYLISTS: Record<string, string> = {
    blues: "https://open.spotify.com/playlist/37i9dQZF1DXd9rSDyQguIk",
    classical: "https://open.spotify.com/playlist/37i9dQZF1DWWEJlAGA9gs0",
    country: "https://open.spotify.com/playlist/37i9dQZF1DX1lVhptIYRda",
    disco: "https://open.spotify.com/playlist/37i9dQZF1DX1MUPbVKMgJJ",
    hiphop: "https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd",
    jazz: "https://open.spotify.com/playlist/37i9dQZF1DXbITWG1ZJKYt",
    metal: "https://open.spotify.com/playlist/37i9dQZF1DX9qNs32fujYe",
    pop: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
    reggae: "https://open.spotify.com/playlist/37i9dQZF1DXbSbnqxMTGx9",
    rock: "https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U"
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-white mb-2">Prediction Result</h3>
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center px-4 py-2 bg-[#1DB954]/20 rounded-full border border-[#1DB954]/40">
            <span className="text-2xl font-bold text-[#1DB954] capitalize">
              {result.genre}
            </span>
          </div>

          <a
            href={SPOTIFY_PLAYLISTS[result.genre] || "https://open.spotify.com/"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold rounded-full transition-all transform hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            Listen on Spotify
          </a>
        </div>
      </div>

      <div className="bg-[#282828] rounded-lg border border-[#333]">
        <div className="px-4 py-3 border-b border-[#333]">
          <h4 className="font-medium text-white">Genre Probabilities</h4>
        </div>
        <div className="divide-y divide-[#333]">
          {sortedProbabilities.map(([genre, probability]) => (
            <div key={genre} className="px-4 py-3 flex items-center justify-between">
              <span className="font-medium text-gray-200 capitalize">{genre}</span>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-[#404040] rounded-full h-2">
                  <div
                    className="bg-[#1DB954] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${probability * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-[#b3b3b3] w-12 text-right">
                  {(probability * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
