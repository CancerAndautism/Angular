import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-close-dialog',
  templateUrl: './close-dialog.component.html',
  styleUrls: ['./close-dialog.component.css']
})
export class CloseDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CloseDialogComponent>,
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
