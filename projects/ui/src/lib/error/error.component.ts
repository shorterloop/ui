import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'prodeasy-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  @Input() message = '';
  constructor() { }

  ngOnInit(): void {
  }

}
