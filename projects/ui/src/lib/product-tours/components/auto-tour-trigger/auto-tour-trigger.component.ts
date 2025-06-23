import { Component, Inject, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TourOptions } from '../../models/tour.model';
import { ShorterLoopTourService } from '../../services/tour.service';

@Component({
  selector: 'sl-auto-tour-trigger',
  template: '', // No template needed - this is a logic-only component
  styleUrls: []
})
export class AutoTourTriggerComponent implements OnInit, OnDestroy {
  @Input() tourId!: string;
  @Input() delay?: number; // Delay in milliseconds before auto-triggering

  private subscriptions = new Subscription();
  private timeoutId?: number;
  private readonly defaultDelay: number;

  private currentTourSubject = new BehaviorSubject<any>(null); // You can strongly type this if needed

  constructor(
    private tourService: ShorterLoopTourService,
    @Optional() @Inject('TOUR_OPTIONS') private options: TourOptions
  ) {
    this.defaultDelay = this.options?.autoTriggerDelay || 1500;
  }

  ngOnInit(): void {
    const triggerDelay = this.delay ?? this.defaultDelay;

    // Subscribe to currentTour$ and push into local BehaviorSubject
    this.subscriptions.add(
      this.tourService.currentTour$.subscribe(tour => {
        this.currentTourSubject.next(tour);
      })
    );

    // Subscribe to local BehaviorSubject and control auto-triggering
    this.subscriptions.add(
      this.currentTourSubject.subscribe(currentTour => {
        console.log('[AutoTourTriggerComponent] currentTour emitted:', currentTour);
        if (currentTour) return; // Tour already active

        this.timeoutId = window.setTimeout(async () => {
          const wasTriggered = await this.tourService.autoTriggerTour(this.tourId);
          if (wasTriggered) {
            console.log(`[AutoTourTriggerComponent] Auto-triggered tour: ${this.tourId}`);
          }
        }, triggerDelay);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
