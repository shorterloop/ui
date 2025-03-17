import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PricingTableService } from '../pricing-table.service';

@Component({
  selector: 'shorterloop-enterprise-popup',
  templateUrl: './enterprise-popup.component.html',
  styleUrls: ['./enterprise-popup.component.scss'],
})
export class EnterprisePopupComponent {
  enterpriseForm: FormGroup;
  isSubmittedSuccessfully = false;

  constructor(private pricing: PricingTableService,private fb: FormBuilder, private http: HttpClient, private dialogRef: MatDialogRef<EnterprisePopupComponent>) {
    this.enterpriseForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
    this.pricing.getUsersDetails().subscribe((result) => {
      this.enterpriseForm.patchValue({
        name: result?.data?.displayName || result?.data?.firstName,
        email: result?.data?.email
      });
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submitForm() {
    if (this.enterpriseForm.valid) {
      const formData = this.enterpriseForm.value;
  
      this.pricing.requestEnterpriseAccess(formData).subscribe((result) => {
        if (result) {
          this.isSubmittedSuccessfully = true;
        }
      });
    }
  }
  
}
