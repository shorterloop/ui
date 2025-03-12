import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'shorterloop-downgrade-popup',
  templateUrl: './downgrade-popup.component.html',
  styleUrls: ['./downgrade-popup.component.scss'],
})
export class DowngradePopupComponent {

  constructor(private dialogRef: MatDialogRef<DowngradePopupComponent>,@Inject(MAT_DIALOG_DATA) public data: { users: number; teams: number; products: number}) {
  }
  closeDialog() {
    this.dialogRef.close();
  }
  onDowngrade() {
    this.dialogRef.close(true);
  }
}
