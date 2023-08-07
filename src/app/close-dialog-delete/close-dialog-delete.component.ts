import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-close-dialog-delete',
  templateUrl: './close-dialog-delete.component.html',
  styleUrls: ['./close-dialog-delete.component.css']
})
export class CloseDialogDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<CloseDialogDeleteComponent>,
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
