import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export type UpsideBasis = 'Modeled' | 'Observed' | 'Gut feel';

@Component({
  selector: 'shorterloop-upside-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sl-upside-card">
      <div class="sl-upside-card__head">
        <div class="sl-upside-card__title">Financial upside</div>
        <div class="sl-upside-card__amount" contenteditable="true" [attr.data-ph]="'$0'" (blur)="onAmountBlur($event)">
          {{ amount }}
        </div>
      </div>
      <div class="sl-upside-card__note">{{ note }}</div>
      <div class="sl-upside-card__basis-row">
        <div
          class="sl-upside-card__basis"
          *ngFor="let option of bases"
          [class.active]="option === basis"
          (click)="basisChange.emit(option)"
        >
          {{ option }}
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./ui-kit-composite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpsideCardComponent {
  @Input() amount = '';
  @Input() basis: UpsideBasis | '' = '';
  @Input() note = 'Estimated ARR per year \u00b7 used directly in prioritization';
  @Output() amountChange = new EventEmitter<string>();
  @Output() basisChange = new EventEmitter<UpsideBasis>();

  readonly bases: UpsideBasis[] = ['Modeled', 'Observed', 'Gut feel'];

  onAmountBlur(event: FocusEvent): void {
    const text = (event.target as HTMLElement).textContent?.trim() ?? '';
    if (text !== this.amount) {
      this.amountChange.emit(text);
    }
  }
}
