import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { MusicGenreClassifier } from "./components/MusicGenreClassifier";
import { PredictionHistory } from "./components/PredictionHistory";
import { Analytics } from "./components/Analytics";
import { Toaster } from "sonner";

export default function App() {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#1DB954] selection:text-black">
      <header className="sticky top-0 z-10 bg-black/95 backdrop-blur-md border-b border-[#282828]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-[#1DB954] rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.972 7.972 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.983 5.983 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Music Genre AI</h1>
          </div>
          {loggedInUser && <SignOutButton />}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Content />
      </main>

      <Toaster position="bottom-center" toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
          border: '1px solid #444'
        }
      }} />
    </div>
  );
}

function Content() {
  const [activeTab, setActiveTab] = useState<'classifier' | 'history' | 'analytics'>('classifier');
  const loggedInUser = useQuery(api.auth.loggedInUser);

  // Still loading auth state
  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1DB954]"></div>
      </div>
    );
  }

  // Handle restricted tabs for guest users
  const renderTabContent = () => {
    if (!loggedInUser && (activeTab === 'history' || activeTab === 'analytics')) {
      return (
        <div className="flex flex-col items-center justify-center py-12 bg-[#181818] rounded-lg border border-white/5">
          <div className="w-full max-w-md space-y-8 p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                Login Required
              </h2>
              <p className="text-[#b3b3b3] mb-8">
                Sign in to access your listening history and analytics stats.
              </p>
              <SignInForm />
            </div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'classifier': return <MusicGenreClassifier />;
      case 'history': return <PredictionHistory />;
      case 'analytics': return <Analytics />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}
            {!loggedInUser && <span className="text-[#b3b3b3]"> (Guest)</span>}
          </h2>
          <p className="text-[#b3b3b3]">
            Identify songs and explore your listening history.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="border-b border-[#282828]">
          <nav className="flex space-x-6">
            <button
              onClick={() => setActiveTab('classifier')}
              className={`pb-4 text-sm font-bold transition-colors border-b-2 ${activeTab === 'classifier'
                ? 'border-[#1DB954] text-white'
                : 'border-transparent text-[#b3b3b3] hover:text-white'
                }`}
            >
              Classifier
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`pb-4 text-sm font-bold transition-colors border-b-2 ${activeTab === 'history'
                ? 'border-[#1DB954] text-white'
                : 'border-transparent text-[#b3b3b3] hover:text-white'
                }`}
            >
              History
              {!loggedInUser && <span className="ml-2 text-[10px] uppercase tracking-wider text-[#b3b3b3] border border-[#b3b3b3] px-1 rounded">Login</span>}
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`pb-4 text-sm font-bold transition-colors border-b-2 ${activeTab === 'analytics'
                ? 'border-[#1DB954] text-white'
                : 'border-transparent text-[#b3b3b3] hover:text-white'
                }`}
            >
              Analytics
              {!loggedInUser && <span className="ml-2 text-[10px] uppercase tracking-wider text-[#b3b3b3] border border-[#b3b3b3] px-1 rounded">Login</span>}
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="w-full">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
