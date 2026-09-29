import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'shorterloop-fact-row',
  standalone: true,
  template: `
    <div class="sl-fact-row">
      <div class="sl-fact-row__label">{{ label }}</div>
      <div class="sl-fact-row__value">{{ value }}</div>
    </div>
  `,
  styleUrls: ['./ui-kit-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FactRowComponent {
  @Input() label = '';
  @Input() value: string | number | null = '';
}
