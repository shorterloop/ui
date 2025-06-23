export interface TourStep {
  title: string;
  text: string;
  target: string | null;
  image?: string;
}

export interface Tour {
  tourId: string;
  title: string;
  description: string;
  steps: TourStep[];
}

export interface ToursConfig {
  [key: string]: Tour;
}

export interface TourOptions {
  storageKey?: string;
  autoTriggerDelay?: number;
  enableLocalStorage?: boolean;
}
