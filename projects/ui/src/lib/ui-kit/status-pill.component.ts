import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type StatusPillTone = 'neutral' | 'ember' | 'info' | 'warning' | 'success' | 'danger';

const TONE_BY_STATUS: Record<string, StatusPillTone> = {
  planned: 'neutral',
  todo: 'neutral',
  backlog: 'neutral',
  open: 'neutral',
  inprogress: 'ember',
  released: 'info',
  review: 'info',
  inreview: 'info',
  inassessment: 'warning',
  parked: 'warning',
  onhold: 'warning',
  done: 'success',
  validated: 'success',
  completed: 'success',
  closed: 'success',
  invalidated: 'danger',
  blocked: 'danger',
};

@Component({
  selector: 'shorterloop-status-pill',
  standalone: true,
  template: `
    <span class="sl-status-pill" [class]="'sl-status-pill tone-' + tone">
      <span class="sl-status-pill__dot"></span>{{ displayLabel }}
    </span>
  `,
  styleUrls: ['./ui-kit-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusPillComponent {
  @Input() set status(value: string | null | undefined) {
    this.rawStatus = value ?? '';
    const key = this.rawStatus.toLowerCase().replace(/[\s_-]+/g, '');
    this.tone = TONE_BY_STATUS[key] ?? 'neutral';
  }

  @Input() label?: string;

  tone: StatusPillTone = 'neutral';
  private rawStatus = '';

  get displayLabel(): string {
    if (this.label) return this.label;
    return this.rawStatus.replace(/[_-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
}
