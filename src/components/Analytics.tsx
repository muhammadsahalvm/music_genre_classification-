import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export function Analytics() {
  const stats = useQuery(api.predictions.getUserPredictionStats);

  if (stats === undefined) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1DB954]"></div>
      </div>
    );
  }

  const sortedGenres = Object.entries(stats.genreCounts)
    .sort(([, a], [, b]) => b - a);

  const maxCount = Math.max(...Object.values(stats.genreCounts), 1);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-white mb-2">Your Analytics</h3>
        <div className="inline-flex items-center px-4 py-2 bg-[#1DB954]/20 rounded-full border border-[#1DB954]/40">
          <span className="text-xl font-bold text-[#1DB954]">
            {stats.totalPredictions} Total Predictions
          </span>
        </div>
      </div>

      {stats.totalPredictions > 0 && (
        <div className="bg-[#282828] rounded-lg border border-[#333]">
          <div className="px-4 py-3 border-b border-[#333]">
            <h4 className="font-medium text-white">Predictions by Genre</h4>
          </div>
          <div className="p-4 space-y-3">
            {sortedGenres.map(([genre, count]) => (
              <div key={genre} className="flex items-center justify-between">
                <span className="font-medium text-gray-200 capitalize w-20">{genre}</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-[#404040] rounded-full h-3">
                    <div
                      className="bg-[#1DB954] h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(count / maxCount) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-medium text-[#b3b3b3] w-8 text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
