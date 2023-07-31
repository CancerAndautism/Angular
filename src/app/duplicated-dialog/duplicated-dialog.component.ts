import { Component, Inject } from '@angular/core';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HTTPService } from '../httpservice';
import { CloseDialogComponent } from '../close-dialog/close-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-duplicated-dialog',
  templateUrl: './duplicated-dialog.component.html',
  styleUrls: ['./duplicated-dialog.component.css']
})
export class DuplicatedDialogComponent {

  edit() {
    this.dialogRef.close("edit")
  }

  

  onNoClick() {
    this.dialogRef.close();
    
  }

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>, private httpService: HTTPService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  
    ngAfterViewInit() {
      
    }

}
