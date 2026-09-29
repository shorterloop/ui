import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export interface LineageCell {
  label: string;
  key?: string;
  title: string;
  current?: boolean;
  ref?: unknown;
}

@Component({
  selector: 'shorterloop-lineage-strip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sl-lineage-strip">
      <ng-container *ngFor="let cell of cells; let last = last">
        <div class="sl-lineage-strip__cell" [class.current]="cell.current" (click)="pick(cell)">
          <div class="sl-lineage-strip__overline">{{ cell.label }}</div>
          <div class="sl-lineage-strip__line">
            <span class="sl-lineage-strip__key" *ngIf="cell.key">{{ cell.key }}</span>
            <span class="sl-lineage-strip__title">{{ cell.title }}</span>
          </div>
        </div>
        <div class="sl-lineage-strip__arrow" *ngIf="!last">&rarr;</div>
      </ng-container>
    </div>
  `,
  styleUrls: ['./ui-kit-composite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineageStripComponent {
  @Input() cells: LineageCell[] = [];
  @Output() cellClicked = new EventEmitter<LineageCell>();

  pick(cell: LineageCell): void {
    if (!cell.current) {
      this.cellClicked.emit(cell);
    }
  }
}
