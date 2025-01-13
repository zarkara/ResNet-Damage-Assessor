import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { DamageObject, DamageSeverity, AnalysisResult } from '../types/DamageTypes';

class DamageDetector {
  private model: cocoSsd.ObjectDetection | null = null;
  
  async initialize() {
    // Load COCO-SSD model as a basic object detector
    this.model = await cocoSsd.load();
    await tf.ready(); // Ensure TF.js is ready
  }

  private mapToDamageSeverity(confidence: number): DamageSeverity {
    if (confidence > 0.9) return DamageSeverity.CATASTROPHIC;
    if (confidence > 0.7) return DamageSeverity.SEVERE;
    if (confidence > 0.5) return DamageSeverity.MODERATE;
    return DamageSeverity.MINOR;
  }

  async analyzeFrame(imageElement: HTMLImageElement | HTMLVideoElement): Promise<AnalysisResult> {
    if (!this.model) {
      throw new Error('Model not initialized');
    }

    const predictions = await this.model.detect(imageElement);
    
    const objects: DamageObject[] = predictions.map(pred => ({
      type: pred.class,
      confidence: pred.score,
      severity: this.mapToDamageSeverity(pred.score),
      bbox: pred.bbox as [number, number, number, number]
    }));

    return {
      objects,
      timestamp: Date.now(),
      frameId: Math.random() // In production, this would be sequential
    };
  }
}

export const damageDetector = new DamageDetector();