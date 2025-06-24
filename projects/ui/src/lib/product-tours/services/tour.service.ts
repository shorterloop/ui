import { HttpClient } from '@angular/common/http';
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Inject, Injectable, Injector, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tour, TourOptions, ToursConfig } from '../models/tour.model';
import { TourModalComponent } from '../public-api';

@Injectable({
  providedIn: 'root'
})
export class ShorterLoopTourService {
  private tours = new Map<string, Tour>();
  private allToursConfig: ToursConfig | null = null;
  private currentTourSubject = new BehaviorSubject<Tour | null>(null);
  private currentStepSubject = new BehaviorSubject<number>(0);
  private autoTriggeredTours = new Set<string>();

  private readonly storageKey: string;
  private readonly enableLocalStorage: boolean;

  public currentTour$ = this.currentTourSubject.asObservable();
  public currentStep$ = this.currentStepSubject.asObservable();
  private modalRef: ComponentRef<TourModalComponent> | null = null;

  constructor(
    private http: HttpClient,
    @Optional() @Inject('TOUR_OPTIONS') private options: TourOptions,
    private injector: Injector,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.storageKey = this.options?.storageKey || 'shorterloop_auto_triggered_tours';
    this.enableLocalStorage = this.options?.enableLocalStorage !== false;

    // Load auto-triggered tours from localStorage (permanent storage)
    if (this.enableLocalStorage && typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        try {
          this.autoTriggeredTours = new Set(JSON.parse(stored));
        } catch (error) {
          console.warn('Failed to parse stored tour data:', error);
          this.autoTriggeredTours = new Set();
        }
      }
    }
  }

  // Check if tour was auto-triggered permanently
  wasAutoTriggered(tourId: string): boolean {
    return this.autoTriggeredTours.has(tourId);
  }

  // Mark tour as auto-triggered permanently
  markAsAutoTriggered(tourId: string): void {
    this.autoTriggeredTours.add(tourId);
    if (this.enableLocalStorage && typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify([...this.autoTriggeredTours]));
      } catch (error) {
        console.warn('Failed to save tour data to localStorage:', error);
      }
    }
  }

  // Auto-trigger tour if not shown before (permanent check)
  async autoTriggerTour(tourId: string): Promise<boolean> {
    if (this.wasAutoTriggered(tourId)) {
      console.log(`Tour ${tourId} was already auto-triggered before`);
      return false; // Already auto-triggered permanently
    }

    const tour = await this.getTour(tourId);
    debugger
    if (tour) {
      this.markAsAutoTriggered(tourId);
      this.ensureModalCreated();
      this.currentTourSubject.next(tour);
      this.currentStepSubject.next(0);
      console.log(`Auto-triggered tour: ${tourId} (will not auto-trigger again)`);
      return true;
    }
    return false;
  }

  // Load tours from external source
  async loadToursFromUrl(url: string): Promise<void> {
    try {
      //@ts-ignore
      this.allToursConfig = await this.http.get<ToursConfig>(url).toPromise();
      if (this.allToursConfig) {
        Object.values(this.allToursConfig).forEach((tour) => {
          this.tours.set(tour.tourId, tour);
        });
      }
    } catch (error) {
      console.error('Failed to load tours from URL:', url, error);
    }
  }

  // Load tours from configuration object
  loadToursFromConfig(config: ToursConfig): void {
    this.allToursConfig = config;
    Object.values(config).forEach((tour) => {
      this.tours.set(tour.tourId, tour);
    });
  }

  // Get tour by ID
  async getTour(tourId: string): Promise<Tour | null> {
    return this.tours.get(tourId) || null;
  }

  // Get all available tours
  getAllTours(): Tour[] {
    return Array.from(this.tours.values());
  }

  // Start a specific tour (manual trigger)
  async startTour(tourId: string): Promise<void> {
    const tour = await this.getTour(tourId);
    if (tour) {
      this.ensureModalCreated();
      this.currentTourSubject.next(tour);
      this.currentStepSubject.next(0);
    }
  }

  // Stop current tour
  stopTour(): void {
    this.currentTourSubject.next(null);
    this.currentStepSubject.next(0);

    if (this.modalRef) {
      this.appRef.detachView(this.modalRef.hostView);
      this.modalRef.destroy();
      this.modalRef = null;
    }
  }

  // Navigate to next step
  nextStep(): void {
    const currentTour = this.currentTourSubject.value;
    const currentStep = this.currentStepSubject.value;

    if (currentTour && currentStep < currentTour.steps.length - 1) {
      this.currentStepSubject.next(currentStep + 1);
    } else {
      this.stopTour();
    }
  }

  // Navigate to previous step
  prevStep(): void {
    const currentStep = this.currentStepSubject.value;
    if (currentStep > 0) {
      this.currentStepSubject.next(currentStep - 1);
    }
  }

  // Get current tour
  getCurrentTour(): Tour | null {
    return this.currentTourSubject.value;
  }

  // Get current step
  getCurrentStep(): number {
    return this.currentStepSubject.value;
  }

  // Check if tour is active
  isTourActive(): boolean {
    return this.currentTourSubject.value !== null;
  }

  // Reset auto-triggered tours (for testing or user preference)
  resetAutoTriggeredTours(): void {
    this.autoTriggeredTours.clear();
    if (this.enableLocalStorage && typeof window !== 'undefined') {
      localStorage.removeItem(this.storageKey);
    }
  }

  // Get list of auto-triggered tours
  getAutoTriggeredTours(): string[] {
    return [...this.autoTriggeredTours];
  }

  private ensureModalCreated(): void {
    if (this.modalRef) return;

    const factory = this.componentFactoryResolver.resolveComponentFactory(TourModalComponent);
    this.modalRef = factory.create(this.injector);

    this.appRef.attachView(this.modalRef.hostView);
    const domElem = (this.modalRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }


  // Manually mark tour as auto-triggered (useful for migration)
  setTourAsAutoTriggered(tourId: string): void {
    this.markAsAutoTriggered(tourId);
  }
}
