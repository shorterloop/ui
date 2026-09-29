import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shorterloop-overline',
  standalone: true,
  template: `<span class="sl-overline"><ng-content></ng-content></span>`,
  styleUrls: ['./ui-kit-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlineComponent {}
