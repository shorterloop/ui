import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'shorterloop-enterprise-popup',
  templateUrl: './enterprise-popup.component.html',
  styleUrls: ['./enterprise-popup.component.scss'],
})
export class EnterprisePopupComponent {
  enterpriseForm: FormGroup;
  isSubmittedSuccessfully = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private dialogRef: MatDialogRef<EnterprisePopupComponent>) {
    this.enterpriseForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
    });
  }
  closeDialog() {
    this.dialogRef.close(); // Closes the popup
  }

  submitForm() {
    if (this.enterpriseForm.valid) {
      const formData = this.enterpriseForm.value;

      // Replace with your actual API endpoint
      const url = '';

      this.http.post(url, formData).subscribe(result => {
        if (result) {
          this.isSubmittedSuccessfully = true; // Show success message
        }
      });

    }
  }
}
