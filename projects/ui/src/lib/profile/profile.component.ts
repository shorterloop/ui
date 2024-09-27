import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shorterloop-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  imgUrl = '';
  errorMessage = '';
  showErrorMessage = false;
  constructor() { }

  ngOnInit(): void {
  }

  showError(message: any) {
    this.errorMessage = message;
    this.showErrorMessage = true;
  }

}
