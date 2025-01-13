import React from 'react';
import { VideoAnalyzer } from './components/VideoAnalyzer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Disaster Zone Damage Assessment</h1>
        <p className="text-gray-600">Real-time damage detection and classification</p>
      </header>
      
      <main className="container mx-auto">
        <VideoAnalyzer />
      </main>
    </div>
  );
}

export default App;