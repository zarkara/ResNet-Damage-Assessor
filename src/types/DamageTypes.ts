export enum DamageSeverity {
  MINOR = 'MINOR',
  MODERATE = 'MODERATE',
  SEVERE = 'SEVERE',
  CATASTROPHIC = 'CATASTROPHIC'
}

export interface DamageObject {
  type: string;
  severity: DamageSeverity;
  confidence: number;
  bbox: [number, number, number, number]; // [x, y, width, height]
}

export interface AnalysisResult {
  objects: DamageObject[];
  timestamp: number;
  frameId: number;
}