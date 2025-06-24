import { Component, Input } from '@angular/core';
import { ShorterLoopTourService } from '../../services/tour.service';

@Component({
  selector: 'sl-tour-trigger',
  template: `
    <button
      [class]="'sl-btn sl-btn-' + variant + (customClass ? ' ' + customClass : '')"
      (click)="startTour()"
      [disabled]="disabled">
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./tour-trigger.component.scss']
})
export class TourTriggerComponent {
  @Input() tourId!: string;
  @Input() variant: 'primary' | 'outline' | 'ghost' = 'outline';
  @Input() customClass = '';
  @Input() disabled = false;

  constructor(private tourService: ShorterLoopTourService) { }

  startTour(): void {
    debugger
    if (!this.disabled) {
      this.tourService.startTour(this.tourId);
    }
  }
}
