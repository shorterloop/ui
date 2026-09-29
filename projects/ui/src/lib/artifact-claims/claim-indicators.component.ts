import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

function isPositive(value: boolean | number | null | undefined): boolean {
  return value === true || (typeof value === 'number' && value > 0);
}

@Component({
  selector: 'shorterloop-assumed-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="sl_claim_flag"
      *ngIf="isFlagged"
      [attr.title]="flaggedTitle"
      aria-label="Evidence disagrees"
    ></span>
    <span class="sl_claim_assumed" *ngIf="!isFlagged && isAssumed" [attr.title]="assumedTitle">
      {{ label }}
    </span>
  `,
  styleUrls: ['./claim-indicators.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssumedBadgeComponent {
  @Input() assumed: boolean | number | null | undefined = false;
  @Input() flagged: boolean | number | null | undefined = false;
  @Input() label = 'Assumed';
  @Input() assumedTitle = 'None of what this rests on is backed by evidence yet';
  @Input() flaggedTitle = 'Evidence disagrees with something this rests on';

  get isAssumed(): boolean {
    return isPositive(this.assumed);
  }

  get isFlagged(): boolean {
    return isPositive(this.flagged);
  }
}

@Component({
  selector: 'shorterloop-claims-backed-count',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="sl_claim_count" *ngIf="total > 0">
      {{ backed }} of {{ total }} backed
    </span>
  `,
  styleUrls: ['./claim-indicators.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimsBackedCountComponent {
  @Input() backed = 0;
  @Input() total = 0;
}

@Component({
  selector: 'shorterloop-claim-card-dot',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="sl_claim_dot"
      [class.sl_claim_dot_flag]="isFlagged"
      [class.sl_claim_dot_backed]="showBacked"
      [attr.title]="title"
      [attr.aria-label]="title"
    >
      <ng-container *ngIf="showBacked">&#10003;</ng-container>
    </span>
  `,
  styleUrls: ['./claim-indicators.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimCardDotComponent {
  @Input() backed: boolean | number | null | undefined = false;
  @Input() flagged: boolean | number | null | undefined = false;
  @Input() review = false;

  get isFlagged(): boolean {
    return isPositive(this.flagged);
  }

  get isBacked(): boolean {
    return isPositive(this.backed);
  }

  get showBacked(): boolean {
    return this.review && !this.isFlagged && this.isBacked;
  }

  get title(): string {
    if (this.isFlagged) return 'Evidence disagrees with this card';
    return this.isBacked ? 'Backed by evidence' : 'Untested';
  }
}
