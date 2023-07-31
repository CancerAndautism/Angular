import { Component, Inject } from '@angular/core';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HTTPService } from '../httpservice';
import { CloseDialogComponent } from '../close-dialog/close-dialog.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

  submit(event:any){

    this.httpService.postdata(this.data, "delete").subscribe((response: any) => {

    });
    console.log(this.data)
    const dialogRef = this.dialog.open(CloseDialogComponent, {width: '500px', height: '100px'})
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
    
  }

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>, private httpService: HTTPService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  
    ngAfterViewInit() {
      
    }

}
