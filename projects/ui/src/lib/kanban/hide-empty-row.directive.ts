import { Directive, Input, TemplateRef, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appRemoveEmptyRow]'
})
export class RemoveEmptyRowDirective implements OnChanges {
  @Input('appRemoveEmptyRow') opportunity: any;
  @Input('appRemoveEmptyRowIsEmpty') isEmpty: any;

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['opportunity'] || changes['isEmpty']) {
      this.updateView();
    }
  }

  private updateView(): void {
    this.viewContainer.clear();
    if (!this.isEmpty) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
