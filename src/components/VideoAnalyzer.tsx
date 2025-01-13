import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { damageDetector } from '../services/damageDetector';
import { AnalysisResult } from '../types/DamageTypes';
import { DamageStats } from './DamageStats';

export const VideoAnalyzer: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[]>([]);

  useEffect(() => {
    damageDetector.initialize();
  }, []);

  const analyzeFrame = async () => {
    if (!webcamRef.current?.video) return;
    
    const result = await damageDetector.analyzeFrame(webcamRef.current.video);
    setResults(prev => [...prev, result]);
  };

  useEffect(() => {
    let interval: number;
    
    if (isAnalyzing) {
      interval = setInterval(analyzeFrame, 1000) as unknown as number;
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAnalyzing]);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative">
        <Webcam
          ref={webcamRef}
          className="rounded-lg shadow-lg"
          width={640}
          height={480}
        />
        {results[results.length - 1]?.objects.map((obj, i) => (
          <div
            key={i}
            className="absolute border-2 border-red-500"
            style={{
              left: obj.bbox[0],
              top: obj.bbox[1],
              width: obj.bbox[2],
              height: obj.bbox[3],
            }}
          />
        ))}
      </div>
      
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setIsAnalyzing(!isAnalyzing)}
      >
        {isAnalyzing ? 'Stop Analysis' : 'Start Analysis'}
      </button>

      <DamageStats results={results} />
    </div>
  );
};