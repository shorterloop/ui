import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export interface ScoreDimension {
  key: string;
  name: string;
  level: number;
  desc?: string;
  invert?: boolean;
}

export interface ScoreVerdict {
  label: string;
  tone: 'success' | 'warning' | 'neutral';
}

@Component({
  selector: 'shorterloop-score-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sl-score-panel">
      <div class="sl-score-panel__head">
        <div class="sl-score-panel__title">{{ title }}</div>
        <div class="sl-score-panel__big-score">
          <ng-container *ngIf="score !== null; else emptyScore">{{ score }}</ng-container>
          <ng-template #emptyScore>&mdash;</ng-template>
        </div>
      </div>
      <div class="sl-score-panel__verdict" *ngIf="verdict" [ngClass]="'tone-' + verdict.tone">
        <span class="sl-score-panel__dot"></span>{{ verdict.label }}
      </div>
      <div class="sl-score-panel__bar">
        <div class="sl-score-panel__fill" [style.width.%]="scorePct"></div>
      </div>
      <div class="sl-score-panel__dim" *ngFor="let dim of dimensions">
        <div class="sl-score-panel__dim-row">
          <div class="sl-score-panel__dim-name">{{ dim.name }}</div>
          <div class="sl-score-panel__cells">
            <div
              class="sl-score-panel__cell"
              *ngFor="let level of levels"
              [class.filled]="level <= dim.level"
              [class.inverted]="dim.invert"
              (click)="pick(dim, level)"
            ></div>
          </div>
        </div>
        <div class="sl-score-panel__dim-desc" *ngIf="dim.desc">{{ dim.desc }}</div>
      </div>
      <div class="sl-score-panel__footer">{{ footer }}</div>
    </div>
  `,
  styleUrls: ['./ui-kit-composite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScorePanelComponent {
  @Input() title = 'Score';
  @Input() score: string | number | null = null;
  @Input() scorePct = 0;
  @Input() verdict?: ScoreVerdict;
  @Input() dimensions: ScoreDimension[] = [];
  @Input() footer = 'Click a cell to rescore';
  @Output() rescore = new EventEmitter<{ key: string; level: number }>();

  readonly levels = [1, 2, 3, 4, 5];

  pick(dim: ScoreDimension, level: number): void {
    this.rescore.emit({ key: dim.key, level: level === dim.level ? 0 : level });
  }
}
