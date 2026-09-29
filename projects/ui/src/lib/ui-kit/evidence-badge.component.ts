import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type EvidenceStrength = 'strong' | 'thin' | 'none';

@Component({
  selector: 'shorterloop-evidence-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="sl-evidence-badge"
      [ngClass]="'strength-' + strength"
      title="Claim-level evidence - click for receipts via Sage"
    >
      <span class="sl-evidence-badge__dot"></span>{{ label }}
    </span>
  `,
  styleUrls: ['./ui-kit-interactive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvidenceBadgeComponent {
  @Input() strength: EvidenceStrength = 'none';
  @Input() claims = 0;

  get label(): string {
    switch (this.strength) {
      case 'strong':
        return `${this.claims} claims`;
      case 'thin':
        return `${this.claims} claims \u00b7 thin`;
      default:
        return 'no evidence';
    }
  }
}
