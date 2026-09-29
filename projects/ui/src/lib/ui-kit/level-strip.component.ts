import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'shorterloop-level-strip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="sl-level-strip"
      [class.editable]="editable"
      role="slider"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="5"
      [attr.aria-valuenow]="value"
      [attr.aria-valuetext]="value ? wording(value) : 'Not set'"
    >
      <span
        *ngFor="let segment of segments"
        class="sl-level-strip__segment"
        [ngClass]="'seg-' + segment"
        [class.filled]="segment <= value"
        [title]="segmentTitle(segment)"
        (click)="pick(segment)"
      ></span>
    </span>
  `,
  styleUrls: ['./ui-kit-interactive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelStripComponent {
  @Input() value = 0;
  @Input() editable = false;
  @Output() valueChange = new EventEmitter<number>();

  readonly segments = [1, 2, 3, 4, 5];

  wording(level: number): string {
    if (level <= 2) {
      return 'Low';
    }
    return level === 3 ? 'Medium' : 'High';
  }

  segmentTitle(segment: number): string {
    return `${this.wording(segment)} (${segment}/5)`;
  }

  pick(segment: number): void {
    if (!this.editable) {
      return;
    }

    const next = segment === this.value ? 0 : segment;
    this.value = next;
    this.valueChange.emit(next);
  }
}
