import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ShorterloopThemeMode = 'light' | 'dark' | 'system';

@Component({
  selector: 'shorterloop-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
})
export class ThemeToggleComponent {
  @Input() mode: ShorterloopThemeMode = 'system';
  @Input() fixed = true;
  @Output() modeChange = new EventEmitter<ShorterloopThemeMode>();

  get isSystem(): boolean {
    return this.mode === 'system';
  }

  get isDark(): boolean {
    return (
      this.mode === 'dark' ||
      (this.mode === 'system' &&
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  }

  get nextMode(): ShorterloopThemeMode {
    if (this.mode === 'light') return 'dark';
    if (this.mode === 'dark') return 'system';
    return 'light';
  }

  get label(): string {
    if (this.mode === 'light') return 'Switch to dark theme';
    if (this.mode === 'dark') return 'Switch to system theme';
    return 'Switch to light theme';
  }

  toggle(): void {
    this.modeChange.emit(this.nextMode);
  }
}
