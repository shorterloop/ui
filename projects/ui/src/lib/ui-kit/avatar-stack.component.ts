import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface SlAvatarUser {
  name: string;
  avatarUrl?: string;
}

@Component({
  selector: 'shorterloop-avatar-stack',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="sl-avatar-stack" [style.--sl-avatar-size.px]="size">
      <span class="sl-avatar-stack__avatar" *ngFor="let user of visible" [title]="user.name">
        <img *ngIf="user.avatarUrl" [src]="user.avatarUrl" [alt]="user.name" />
        <ng-container *ngIf="!user.avatarUrl">{{ initials(user) }}</ng-container>
      </span>
      <span class="sl-avatar-stack__avatar sl-avatar-stack__overflow" *ngIf="overflow > 0">+{{ overflow }}</span>
    </span>
  `,
  styleUrls: ['./ui-kit-interactive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarStackComponent {
  @Input() users: SlAvatarUser[] = [];
  @Input() max = 4;
  @Input() size = 24;

  get visible(): SlAvatarUser[] {
    return this.users.slice(0, this.max);
  }

  get overflow(): number {
    return Math.max(0, this.users.length - this.max);
  }

  initials(user: SlAvatarUser): string {
    return user.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join('');
  }
}
