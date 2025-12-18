import React, { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { GENRES, Genre } from '../types';

export function PredictionHistory() {
  const [genreFilter, setGenreFilter] = useState<string>('all');
  const predictions = useQuery(api.predictions.getUserPredictions, {
    genreFilter: genreFilter === 'all' ? undefined : genreFilter
  });

  if (predictions === undefined) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1DB954]"></div>
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Prediction History</h3>
        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="px-3 py-1 bg-[#242424] border border-[#333] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
        >
          <option value="all">All Genres</option>
          {GENRES.map(genre => (
            <option key={genre} value={genre} className="capitalize">
              {genre}
            </option>
          ))}
        </select>
      </div>

      {predictions.length === 0 ? (
        <div className="text-center py-8 text-[#b3b3b3]">
          <p>No predictions yet. Upload an audio file to get started!</p>
        </div>
      ) : (
        <div className="bg-[#181818] rounded-lg border border-[#333] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#333]">
              <thead className="bg-[#242424]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#b3b3b3] uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#b3b3b3] uppercase tracking-wider">
                    Predicted Genre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#b3b3b3] uppercase tracking-wider">
                    Date & Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#181818] divide-y divide-[#333]">
                {predictions.map((prediction) => (
                  <tr key={prediction._id} className="hover:bg-[#282828] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {prediction.fileName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-[#1DB954]/20 text-[#1DB954] capitalize border border-[#1DB954]/30">
                        {prediction.predictedGenre}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#b3b3b3]">
                      {formatDate(prediction.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
