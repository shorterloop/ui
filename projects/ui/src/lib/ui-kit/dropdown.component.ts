import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

export interface SlDropdownItem {
  label: string;
  value: string;
  hint?: string;
  danger?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'shorterloop-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="sl-dropdown">
      <span class="sl-dropdown__trigger" (click)="toggle()">
        <ng-content></ng-content>
      </span>
      <span class="sl-dropdown__panel" *ngIf="open" [class.align-right]="align === 'right'" role="menu">
        <button
          type="button"
          role="menuitem"
          class="sl-dropdown__item"
          *ngFor="let item of items"
          [class.danger]="item.danger"
          [disabled]="item.disabled"
          (click)="select(item)"
        >
          <span class="sl-dropdown__label">{{ item.label }}</span>
          <span class="sl-dropdown__hint" *ngIf="item.hint">{{ item.hint }}</span>
        </button>
      </span>
    </span>
  `,
  styleUrls: ['./ui-kit-composite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
  @Input() items: SlDropdownItem[] = [];
  @Input() align: 'left' | 'right' = 'left';
  @Output() itemSelected = new EventEmitter<SlDropdownItem>();

  open = false;

  constructor(
    private readonly host: ElementRef<HTMLElement>,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  toggle(): void {
    this.open = !this.open;
  }

  select(item: SlDropdownItem): void {
    if (item.disabled) {
      return;
    }

    this.open = false;
    this.itemSelected.emit(item);
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent): void {
    if (this.open && !this.host.nativeElement.contains(event.target as Node)) {
      this.open = false;
      this.cdr.markForCheck();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) {
      this.open = false;
      this.cdr.markForCheck();
    }
  }
}
