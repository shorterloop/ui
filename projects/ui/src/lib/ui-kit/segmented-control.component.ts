import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

export interface SlSegmentOption {
  label: string;
  value: string;
}

@Component({
  selector: 'shorterloop-segmented-control',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="sl-segmented-control" role="tablist">
      <button
        type="button"
        role="tab"
        class="sl-segmented-control__segment"
        *ngFor="let option of options"
        [class.active]="option.value === value"
        [attr.aria-selected]="option.value === value"
        (click)="pick(option)"
      >
        {{ option.label }}
      </button>
    </span>
  `,
  styleUrls: ['./ui-kit-interactive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentedControlComponent {
  @Input() options: SlSegmentOption[] = [];
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  pick(option: SlSegmentOption): void {
    if (option.value !== this.value) {
      this.value = option.value;
      this.valueChange.emit(option.value);
    }
  }
}
