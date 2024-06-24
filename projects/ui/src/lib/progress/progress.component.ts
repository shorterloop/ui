import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'prodeasy-progress-bar',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressBarComponent implements OnInit {
  @Input() percentage = 0;
  percentageMarker = 0;

  constructor() { }

  ngOnInit(): void {
    this.percentageMarker = Math.floor( ( this.percentage / 100) * 50 );
  }

  ngOnChanges(change: SimpleChanges) {
    const currentValue: any = change;

    if (
      currentValue &&
      currentValue.percentage &&
      !currentValue.percentage.firstChange &&
      currentValue.percentage.currentValue
    ) {
      this.percentage = currentValue.percentage.currentValue;
      this.percentageMarker = Math.floor( ( this.percentage / 100) * 50 );
    }
  }

}
